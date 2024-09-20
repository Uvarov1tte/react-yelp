const express = require('express');
const router = express.Router({ mergeParams: true });
//mergeParams allow access to the reviews in params from routers
const Campground = require('../models/campground.cjs');
const Review = require('../models/review.cjs');
const reviews = require('../controllers/reviews.cjs')
const { reviewSchema } = require('../schemas.cjs')

const catchAsync = require('../utils/catchAsync.cjs');
const ExpressError = require('../utils/ExpressError.cjs');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.cjs');



//middleware validate


//review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;