const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User=require("../models/user.js");

const mongo_url= 'mongodb://127.0.0.1:27017/DopamineDiner';

main().then(()=>console.log("connected to db"))
.catch(err=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_url);
}

const init2Db=async()=>{
    await User.insertOne({
        email: "sania@example.com",
        cart: [],
        completedActivities: []
});
}
const initDb = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"69d5f116ca6e3a350341a9d7"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDb();
// init2Db();