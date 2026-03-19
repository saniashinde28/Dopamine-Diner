const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        name:Joi.string().required(),
        category:Joi.string().required(),
        description:Joi.string().required(),
        duration:Joi.number().required().min(0),
        impactLevel:Joi.string().required(),
        effort:Joi.string().required(),
        moodTags: Joi.array().items(Joi.string()).required(),
        image : Joi.string().allow("",null),


    }).required(),        //always there must be a listing obj


});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),

    }).required(),

});