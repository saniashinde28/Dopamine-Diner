const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride=require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/DopamineDiner');
}
main().then(() => {
    console.log("db is connected");
}).catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("working");
});

//Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

});

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");

});

//show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

});

//create route
app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

});

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let updListing=req.body.listing;
    await Listing.findByIdAndUpdate(id,{...updListing});  //deconstruct and passing individual vals
    res.redirect(`/listings/${id}`);

});

//delet route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

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

const port = 8080;

app.listen(port, (req, res) => {
    console.log("app is listening!");
});