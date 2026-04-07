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
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
var flash = require('connect-flash');
require('dotenv').config();
const {isLoggedIn} = require("./middleware.js");

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

// const mongoURL="mongodb://127.0.0.1:27017/DopamineDiner";
const dbUrl=process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dbUrl);
}
main().then(() => {
    console.log("db is connected");
}).catch((err) => {
    console.log(err);
});


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("error in mongo session store",err);

});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: false,
    cookie:{
        expires: Date.now() +7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly:true
    },
};

app.get("/",(req,res)=>{
    res.send("working!");
});

app.use(session(sessionOptions));
app.use(flash());

//authentication middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();

});

// app.get("/demo",async(req,res)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta-student",
//     });
//     let registeredUser=await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//about route
app.get("/about",(req,res)=>{
    res.render("listings/about.ejs");

});

//my cart route
app.get("/cart",isLoggedIn,(req,res)=>{
    res.render("listings/cart.ejs");

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