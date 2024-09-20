//passport delete sessions after log in -> nothing to return to
const { campgroundSchema, reviewSchema } = require('./schemas.cjs')
const ExpressError = require('./utils/ExpressError.cjs');
const Campground = require('./models/campground.cjs');
const Review = require('./models/review.cjs');

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    //console.log("REQ.USER....", req.user)
    if (!req.isAuthenticated()) {
        //store the url they are requesting, then return to after logged in
        req.session.returnTo = req.originalUrl

        //from passport
        req.flash('error', 'You must be signed in!')
        return res.redirect('/login');
    }
    next();
}

// defining a middleware for server side validation -> reusable
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
    // https://joi.dev/api/?v=17.7.0
    // joi: server side validation
    // not mongoose schema, but is actually going to validate the data before even attemp saving into mongoose
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        // a single string message
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}