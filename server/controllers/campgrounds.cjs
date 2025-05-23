const Campground = require('../models/campground.cjs');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
//forward geocode
const { cloudinary } = require("../cloudinary/index.cjs");

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    // res.render('campgrounds/index', { campgrounds })
    res.send({ campgrounds });
}

module.exports.renderNewForm = (req, res) => {
    res.redirect('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    // console.log(req.body)
    // console.log(req.files)
    const reqBody = JSON.stringify(req.body)
    const reqBodyObj = JSON.parse(reqBody)
    console.log(reqBodyObj)
    const geoData = await geocoder.forwardGeocode({
        query: reqBodyObj.location,
        limit: 1
    }).send()
    const campground = new Campground(reqBodyObj);
    campground.geometry = geoData.body.features[0].geometry;
    campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
    console.log(campground)
    await campground.save();
    // console.log(campground);
    res.send({ campground });
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    //populate camp author AND review AND the reviews author
    // console.log(campground)
    if (!campground) {
        // req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds')
    }
    // res.render('campgrounds/show', { campground })
    res.send({ campground })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campground')
    }
    res.render('campgrounds/edit', { campground });
    // find that campground
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    // console.log(req.body)
    //middleware
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.image.push(...imgs);
    await campground.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } });
        // pull out the images that got the file name in request body deleteImages
        // console.log(campground);
    }
    // spread operator?
    req.flash('success', 'Successfully updated campground!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!')
    res.redirect('/campgrounds')
}