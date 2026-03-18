const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/expressError.js");
const {listingSchema}=require("./schema.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/DopamineDiner');
}
main().then(() => {
    console.log("db is connected");
}).catch((err) => {
    console.log(err);
});

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

app.get("/", (req, res) => {
    res.send("working");
});

//Index route
app.get("/listings",wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}));

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");

});

//show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

}));

//create route
app.post("/listings",normalizeMoodTags,validateListing,wrapAsync(async(req,res,next)=>{
    
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}));

//edit route
app.get("/listings/:id/edit",normalizeMoodTags,validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}));

//update route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let updListing=req.body.listing;
    await Listing.findByIdAndUpdate(id,{...updListing});  //deconstruct and passing individual vals
    res.redirect(`/listings/${id}`);

}));

//delet route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

}));

//about route
app.get("/about",(req,res)=>{
    res.render("listings/about.ejs");

});

//my cart route
app.get("/cart",(req,res)=>{
    res.render("listings/cart.ejs");

});

//new  route
app.get("/addNew",(req,res)=>{
    res.render("listings/new.ejs");

});


// app.get("/testListings", async (req, res) => {
//     let sampleListing = new Listing({
//         name: "Morning Nature Walk",
//         category: "starter",
//         description: "A short walk in fresh air improves mood and activates natural dopamine pathways.",
//         duration: 10,
//         impactLevel: "medium",
//         effort: "easy",
//         moodTags: ["low", "neutral"],
//         image: "",
//         isDefault: true,
//         createdAt: new Date()
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");

// });

app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found!"));

});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"}=err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err});

});

const port = 8080;

app.listen(port, (req, res) => {
    console.log("app is listening!");
});