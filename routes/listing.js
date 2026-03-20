const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/expressError.js");
const Listing = require("../models/listing.js");

//middleware
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}


const normalizeMoodTags = (req,res,next)=>{
  if(req.body.listing && typeof req.body.listing.moodTags === "string"){
    req.body.listing.moodTags =
      req.body.listing.moodTags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
  }
  next();
};


//Index route
router.get("/",wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}));

//new route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");

});

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});

}));

//create route
router.post("/",normalizeMoodTags,validateListing,wrapAsync(async(req,res,next)=>{
    
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}));

//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(req.body);
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}));

//update route
router.put("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let updListing=req.body.listing;
    await Listing.findByIdAndUpdate(id,{...updListing});  //deconstruct and passing individual vals
    res.redirect(`/listings/${id}`);

}));

//delet route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

}));

module.exports=router;