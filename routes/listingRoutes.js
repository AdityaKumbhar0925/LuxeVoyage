const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const { index, renderCreateForm, createListing, renderEditForm, editListing, showListing, destroyListing } = require("../controllers/listingController.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//Index Route
router.get("/", wrapAsync(index));
    
//Create Route
router.get("/new",isLoggedIn, renderCreateForm);
router.post("/",isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(createListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(renderEditForm));
router.put("/:id",isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(editListing));

//Delete Route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(destroyListing));

//Show Route
router.get("/:id", wrapAsync(showListing));

module.exports = router;