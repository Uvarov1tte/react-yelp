const mongoose = require('mongoose');
// const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema;
const Review = require('./review.cjs');

// https://res.cloudinary.com/dutixedzl/image/upload/w_300/v1714561852/YelpCamp/luq51uo7w3dhyccxtm4r.jpg
// ref for modified image, width 300px
const ImageSchema = new Schema(
    {
        url: String,
        filename: String
    }
)

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
    //dont need to actually store on model but can be automatically made virtually
})

const opts = { toJSON: { virtuals: true } };
//option to also pass in json virtual


const CampgroundSchema = new Schema({
    title: String,
    image: [ImageSchema],
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    //from mongoose docs
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
            //id referencing from review model
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong><p>${this.location}</p>`;
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews //this doc has reviews and we will delete it if its in the reviews array of doc
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);
