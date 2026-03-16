const sampleListings = [

/* 🌿 STARTERS (Activation / Gentle Boost) */

{
name:"Aromatherapy Boost",
category:"starter",
description:"Diffuse calming scents to create a soothing environment and gently uplift mood.",
duration:10,
impactLevel:"medium",
effort:"easy",
moodTags:["low","neutral"],
image:"/images/aroma.png",
isDefault:true,
createdAt:new Date()
},

{
name:"Morning Sunlight Pause",
category:"starter",
description:"Exposure to natural sunlight helps regulate circadian rhythm and emotional balance.",
duration:8,
impactLevel:"medium",
effort:"easy",
moodTags:["low"],
image:"/images/sunlight.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Hydration Reset",
category:"starter",
description:"Drinking water mindfully refreshes cognitive functioning and alertness.",
duration:3,
impactLevel:"low",
effort:"easy",
moodTags:["low"],
image:"/images/water.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Gratitude Journaling",
category:"starter",
description:"Writing small wins increases reward sensitivity and optimism.",
duration:10,
impactLevel:"medium",
effort:"easy",
moodTags:["low","neutral"],
image:"/images/journal.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Light Stretch Flow",
category:"starter",
description:"Gentle stretching activates blood circulation and mental readiness.",
duration:12,
impactLevel:"medium",
effort:"easy",
moodTags:["neutral"],
image:"/images/stretch.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Fresh Flowers Setup",
category:"starter",
description:"Decorating space with flowers increases aesthetic pleasure and calm.",
duration:7,
impactLevel:"low",
effort:"easy",
moodTags:["low"],
image:"/images/flowers.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Mindful Tea Ritual",
category:"starter",
description:"Preparing tea slowly encourages grounding and sensory awareness.",
duration:8,
impactLevel:"low",
effort:"easy",
moodTags:["low","neutral"],
image:"/images/tea.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Mini Cleanup Reset",
category:"starter",
description:"Tidying a small area reduces cognitive load and increases clarity.",
duration:12,
impactLevel:"medium",
effort:"moderate",
moodTags:["neutral"],
image:"/images/cleanup.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Positive Affirmation Mirror",
category:"starter",
description:"Speaking affirmations builds motivational neural pathways.",
duration:5,
impactLevel:"low",
effort:"easy",
moodTags:["low"],
image:"/images/affirm.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Plant Care Moment",
category:"starter",
description:"Watering plants builds nurturing satisfaction and emotional grounding.",
duration:9,
impactLevel:"low",
effort:"easy",
moodTags:["low"],
image:"/images/plants.jpg",
isDefault:true,
createdAt:new Date()
},

/* 🔥 MAIN COURSES (Effortful Reward Building) */

{
name:"Deep Work Study Sprint",
category:"main",
description:"Focused academic work increases long-term dopamine through achievement.",
duration:50,
impactLevel:"high",
effort:"hard",
moodTags:["neutral","energetic"],
image:"/images/study.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Gym Strength Session",
category:"main",
description:"Resistance training releases endorphins and stabilizes emotional state.",
duration:60,
impactLevel:"high",
effort:"hard",
moodTags:["energetic"],
image:"/images/gym.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Creative DIY Project",
category:"main",
description:"Hands-on creation enhances intrinsic motivation and satisfaction.",
duration:45,
impactLevel:"high",
effort:"moderate",
moodTags:["neutral"],
image:"/images/diy.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Healthy Cooking Experience",
category:"main",
description:"Preparing nutritious meals builds competence and sensory joy.",
duration:40,
impactLevel:"medium",
effort:"moderate",
moodTags:["neutral"],
image:"/images/cook.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Guided Yoga Session",
category:"main",
description:"Structured yoga enhances emotional balance and body awareness.",
duration:35,
impactLevel:"high",
effort:"moderate",
moodTags:["low","neutral"],
image:"/images/yoga.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Skill Practice Hour",
category:"main",
description:"Practicing a personal skill increases mastery-based dopamine cycles.",
duration:55,
impactLevel:"high",
effort:"moderate",
moodTags:["neutral","energetic"],
image:"/images/skill.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Outdoor Cycling Trip",
category:"main",
description:"Cardio activity improves neural plasticity and mood regulation.",
duration:60,
impactLevel:"high",
effort:"hard",
moodTags:["energetic"],
image:"/images/cycle.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Book Immersion Session",
category:"main",
description:"Reading deeply stimulates curiosity and calm cognitive engagement.",
duration:40,
impactLevel:"medium",
effort:"easy",
moodTags:["neutral"],
image:"/images/book.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Declutter Full Zone",
category:"main",
description:"Organizing larger spaces creates relief and environmental control.",
duration:50,
impactLevel:"high",
effort:"hard",
moodTags:["neutral"],
image:"/images/declutter.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Passion Project Build",
category:"main",
description:"Working on meaningful goals builds purpose-driven dopamine.",
duration:60,
impactLevel:"high",
effort:"hard",
moodTags:["energetic"],
image:"/images/project.jpg",
isDefault:true,
createdAt:new Date()
},

/* 🍰 DESSERTS (Recovery & Joy) */

{
name:"Golden Hour Walk",
category:"dessert",
description:"Slow sunset walks calm nervous system and encourage reflection.",
duration:30,
impactLevel:"medium",
effort:"easy",
moodTags:["neutral"],
image:"/images/sunset.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Dance Release Session",
category:"dessert",
description:"Freestyle movement releases stress and improves emotional expression.",
duration:25,
impactLevel:"high",
effort:"moderate",
moodTags:["low","energetic"],
image:"/images/dance.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Game Night Social",
category:"dessert",
description:"Board games create joy through bonding and playful competition.",
duration:35,
impactLevel:"medium",
effort:"easy",
moodTags:["neutral"],
image:"/images/board.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Comfort Movie Moment",
category:"dessert",
description:"Watching familiar uplifting scenes provides emotional relaxation.",
duration:40,
impactLevel:"low",
effort:"easy",
moodTags:["low"],
image:"/images/movie.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Pet Interaction Therapy",
category:"dessert",
description:"Playing with pets releases oxytocin and increases happiness.",
duration:20,
impactLevel:"medium",
effort:"easy",
moodTags:["low","neutral"],
image:"/images/pet.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Candlelight Reflection",
category:"dessert",
description:"Quiet reflective time builds gratitude and mental closure.",
duration:20,
impactLevel:"low",
effort:"easy",
moodTags:["low"],
image:"/images/candle.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Slow Stretch Wind-Down",
category:"dessert",
description:"Gentle stretching prepares body for restful sleep.",
duration:15,
impactLevel:"low",
effort:"easy",
moodTags:["neutral"],
image:"/images/nightstretch.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Audio Story Escape",
category:"dessert",
description:"Listening to calming narratives reduces rumination and stress.",
duration:30,
impactLevel:"low",
effort:"easy",
moodTags:["low"],
image:"/images/podcast.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Mini Social Hangout",
category:"dessert",
description:"Lighthearted conversations boost belonging and emotional warmth.",
duration:40,
impactLevel:"medium",
effort:"easy",
moodTags:["neutral"],
image:"/images/hangout.jpg",
isDefault:true,
createdAt:new Date()
},

{
name:"Warm Shower Relax",
category:"dessert",
description:"Warm water relaxation reduces muscle tension and anxiety.",
duration:15,
impactLevel:"low",
effort:"easy",
moodTags:["low"],
image:"/images/shower.jpg",
isDefault:true,
createdAt:new Date()
}

];

module.exports={data:sampleListings};