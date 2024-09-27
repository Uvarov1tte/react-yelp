const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.cjs');
const catchAsync = require('../utils/catchAsync.cjs');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.cjs');
const multer = require('multer');
const { storage } = require('../cloudinary/index.cjs');
const upload = multer({ storage });
//add multer config


//middleware validate&isauthor


// router.route(path) https://expressjs.com/en/5x/api.html#router

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    .post(upload.array('image'), catchAsync(campgrounds.createCampground))
// show a list of campgrounds

router.get('/new', isLoggedIn, campgrounds.renderNewForm)
// create new campground. Has to be before /id so that 'new' wont be treated as an id.

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    // show a single campground
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    // edit campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))




router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;

//move functionalities to controller files