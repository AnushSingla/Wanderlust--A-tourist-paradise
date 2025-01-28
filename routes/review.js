const express = require("express");
const router = express.Router({mergeParams:true});
const WrapAsync=require("../utils/WrapAsync.js")

const Listing= require("../models/listing.js")
const Review=require("../models/review.js")
const { ValidateReview ,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js")

router.post("/",isLoggedIn,ValidateReview,WrapAsync(reviewController.newreview))


  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,WrapAsync(reviewController.destroyreview))

  module.exports= router;