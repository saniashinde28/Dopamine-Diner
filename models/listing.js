const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ListingSchema=new Schema(
{

  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 80
  },

  category: {
    type: String,
    required: true,
    enum: ["starter", "main", "dessert"]
  },

  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 300
  },

  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 180,
    validate: {
      validator: function(value){
        if (this.category === "dessert" && value > 90) return false;
        return true;
      },
      message: "Dessert activities should not exceed 90 minutes"
    }
  },

  impactLevel: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"]
  },

  effort: {
    type: String,
    required: true,
    enum: ["easy", "moderate", "hard"]
  },

  moodTags: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr){
        return arr.length > 0;
      },
      message: "At least one mood tag required"
    },
    enum: ["low","neutral","energetic"]
  },

  image: {
    type: String,
    default:"https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/activity.svg",
    set: (v)=> v===""?"https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/activity.svg":v,
  },

  isDefault: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}
);

//creating model
const Listing=mongoose.model("listing",ListingSchema);

module.exports=Listing;
