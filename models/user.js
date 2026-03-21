const mongoose=require("mongoose");
const { default: passportLocalMongoose } = require("passport-local-mongoose");
const Schema=mongoose.Schema;
const PassportLocalMongoose=require("passport-local-mongoose");

const userSchema = new Schema({
  
  email: {
    type: String,
    required: true,
    unique: true
  },

  // Activities user plans to do
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "listing"
    }
  ],

  //  Activities user has completed
  completedActivities: [
    {
      activity: {
        type: Schema.Types.ObjectId,
        ref: "listing"
      },
      completedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);