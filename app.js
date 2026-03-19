const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/expressError.js");
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");

const listings=require("./routes/listing.js");

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



const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
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

app.use("/listings",listings);

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

//reviews
//post route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${req.params.id}`);

}));


//delete review route
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);

}

));


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