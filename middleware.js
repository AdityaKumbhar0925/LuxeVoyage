const Listing = require("./models/listing");
const Review = require("./models/review");
const cusError = require("./utils/cusError.js");
const {reviewSchema} =  require("./schema.js");
const {listingSchema} =  require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.isLoggedInReview = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.session.redirectUrl = req.session.redirectUrl.replace("/reviews", "");
        req.flash("error", "You must be logged in to write a Review!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are NOT THE OWNER of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewOwner = async(req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);

    if (!review.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are NOT THE AUTHOR of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new cusError(400, errMsg);
    }
    else{
        next();
    }
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new cusError(400, errMsg);
    }
    else{
        next();
    }
}