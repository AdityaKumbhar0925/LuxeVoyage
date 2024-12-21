const Listing = require("../models/listing");
const maptilerClient = require("@maptiler/client");

maptilerClient.config.apiKey = process.env.MAP_TOKEN;

module.exports.index = async (req, res, next) => {
    let {search} = req.query;
    if(!search){
        let listings = await Listing.find({});
        res.render("listings/index.ejs", {listings});
    }
    else{
        let listings = await Listing.find({
            $or: [
                {title: new RegExp(search, "i")},
                {location: new RegExp(search, "i")},
                {country: new RegExp(search, "i")}
            ]
        });
        res.render("../views/listings/index.ejs", {listings});
    }
}

module.exports.renderCreateForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.createListing = async (req, res, next) => {
    if(!req.body.listing){
        next(new cusError(400, "Bad Request!"));
    }
    else{

        //geocoding
        const accurateLocation = req.body.listing.location + " " + req.body.listing.country;
        const result = await maptilerClient.geocoding.forward(accurateLocation);

        //adding some things to the listing
        let url = req.file.path;
        let filename = req.file.filename;
        const listing = new Listing(req.body.listing);

        listing.geometry = result.features[0].geometry;
        listing.owner = req.user._id;
        listing.image = {url, filename};
        await listing.save();

        req.flash("success", "New Listing CREATED Successfully!");
        res.redirect("/listings");

    }    
}

module.exports.renderEditForm = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Doesn't Exist!");
        res.redirect("/listings");
    }
    else{
        let updatedImageURL = listing.image.url;
        updatedImageURL = updatedImageURL.replace("/upload", "/upload/w_250");
        res.render("listings/edit.ejs",{listing, updatedImageURL});

    }
}

module.exports.editListing = async(req, res, next) => {
    let {id} = req.params;
    if(!req.body.listing){
        next(new cusError(400, "Bad Request!"));
    }
    else{
        listing = await Listing.findByIdAndUpdate(id, {... req.body.listing});

        if(typeof req.file !== "undefined"){
            let url = req.file.path;
            let filename = req.file.filename;

            listing.image = {url, filename};
            await listing.save();   
        }
         //geocoding
         const accurateLocation = req.body.listing.location + " " + req.body.listing.country;
         const result = await maptilerClient.geocoding.forward(accurateLocation);
         listing.geometry = result.features[0].geometry;
        

         await listing.save();
         

        req.flash("success", "Listing UPDATED Successfully!");
        res.redirect(`/listings/${id}`);
    }
}

module.exports.destroyListing = async(req, res, next) => {
    let {id} = req.params;

    await Listing.findByIdAndDelete(id).populate("reviews");
    req.flash("success", "Listing DELETED Successfully!")
    res.redirect("/listings");
}

module.exports.showListing = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "owner", // Populate the `author` field in each review
            model: "User"
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing Doesn't Exist!");
        res.redirect("/listings");
    }
    else{
        res.render("listings/show.ejs", {listing});
    }
}