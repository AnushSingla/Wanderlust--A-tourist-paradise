const Listing=require("../models/listing.js")
const Review=require("../models/review.js")
module.exports.newreview=async(req,res)=>{
    let{id}=req.params;
    let listing = await Listing.findById(id)
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review Added Successfully")
    res.redirect(`/listings/${listing._id}`)
  }

  module.exports.destroyreview=async(req,res)=>{
      let{id,reviewId}=req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
      await Review.findByIdAndDelete(reviewId)
      req.flash("success","Review Deleted Successfully")
      res.redirect(`/listings/${id}`)
    }