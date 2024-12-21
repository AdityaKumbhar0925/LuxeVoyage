const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = await new Review(req.body.review);
    newReview.owner = req.user._id; 
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("Review Saved");
    req.flash("success", "New Review ADDED Successfully!");
    res.redirect(`/listings/${listing.id}`);
}

module.exports.destroyReview = async (req, res) => {
    let {id, reviewId} = req.params;

    let deleted = await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review DELETED Successfully!");
    // console.log(reviewId);
    res.redirect(`/listings/${ id }`);

}