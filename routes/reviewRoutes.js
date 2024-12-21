const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedInReview, isReviewOwner } = require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reveiwController.js");
const {validateReview} = require("../middleware.js");


//New Review
router.post("/",isLoggedInReview,validateReview, wrapAsync(createReview));

//Delete Review
router.delete("/:reviewId",isLoggedInReview,isReviewOwner, wrapAsync(destroyReview));


module.exports = router;