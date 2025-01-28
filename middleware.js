const Listing = require("./models/listing.js")
const Review=require("./models/review")
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema}=require("./Schema.js")

const {reviewSchema}=require("./Schema.js")

module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You should be Logged In");
        return res.redirect("/login")
    }
    next();
}


module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner")
        return res.redirect(`/listings/${id}`)
    }next();

}
module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review= await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the Author")
        return res.redirect(`/listings/${id}`)
    }next();

}

module.exports.ValidateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",")
      throw new ExpressError(400,errMsg)
    }else{
      next();
    }
  }

  module.exports.ValidateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body)
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",")
      throw new ExpressError(400,errMsg)
    }else{
      next();
    }
  }