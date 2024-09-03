const mongoose = require("mongoose");
const dotenv = require("dotenv");
const validator =require("validator");
const { default: slugify } = require("slugify");


const nftSchema = new mongoose.Schema({
    name: { type: String, required: [true,"A NFT Must Have A name"] ,unique: true,trim:true,maxlength:[10,"Must have  10 character"], minlength:[5,"Must have 5 character"],validator:[validator.isAlpha,"must be a valid alpha"]},
   slug:String,

    rating: { type: Number,default:4.5},
    // duration:{type: String, required: [true,"Must Provide a duration"]},
    // maxGroups: {type: Number, required: [true," must provide a maxGroups"]},
    // difficulty: {type: String, required: [true," must provide a difficulty"]},
   ratingAverage: {type: Number, default:4.5,maxlength:[5,"Must have  5 character"],
   minlength:[1,"Must have 1 character"],},
    ratingQuantity: {type: Number, default:0},
    description: { type: String,trime:true},
    imageCover: {type: String,trime:true},

    image: [String],
    createdAt: {type: Date,default:Date.now(),select:false},
    startDates: [Date],
    secretNFTs:{type:Boolean,default:false},
    price: { type: Number, required: true },
    owner: { type: String, required: true },
    summary:{ type: String, trim:true},
    priceDiscount:{ type: Number, required: true, trim:true,
        //Only at POst New DAta
        validae:{
            validator: function(v) {
                return v < this.price; 
            },
            message: "Price Discount must be below ({VALUE}) Price Dude Dont do that"
        }
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
 
}
);
nftSchema.virtual("durationWeeks").get(function(){
    return this.duration/ 7;
});
//Doc MiddleWare

// nftSchema.pre("save",  function () {
//     this.slug =slugify(this.name,{lower:true})
   
//     next();
// });

// //Middleware Hooks


// nftSchema.post("save",function () {
//     console.log(`New NFT ${this.name} has been saved to the DB`);
//     next();
// })


//  nftSchema.pre("find",  function (next) {
// this.find({secretNFTs:{$ne:true}});
// next();
//  });
 nftSchema.pre("/^find/",  function (next) {
    this.find({secretNFTs:{$ne:true}});
    this.start =Date.now();
    next();
     });
//  nftSchema.pre("findOne",  function (next) {
// this.findOne({secretNFTs:{$ne:true}});
// next();
//  });

nftSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match:{secretNFTs: {$ne: true}} });
    next();
});

//----POst

 nftSchema.post("/^find/", async function (doc, next) {
    const duration = Date.now() - this.start;
    console.log(doc);

 });


const NFT = mongoose.model("NFT",nftSchema);

module.exports = NFT;
