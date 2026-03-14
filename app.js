const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/DopamineDiner');
}
main().then(()=>{
    console.log("db is connected");
}).catch((err)=>{
    console.log(err);
});

app.get("/",(req,res)=>{
    res.send("working");
});

app.get("/listings",async(req,res)=>{
    const alllistings= await Listing.find({});
    res.render("index.ejs");

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

const port=8080;

app.listen(port,(req,res)=>{
    console.log("app is listening!");
});