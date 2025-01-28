const express = require("express");
const router = express.Router();
const WrapAsync=require("../utils/WrapAsync.js")
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,ValidateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js")
const multer  = require('multer');
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage });


router
.route("/")
.get(WrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),ValidateListing,WrapAsync(listingController.rendernewlisting))



router.get("/new",isLoggedIn,listingController.newlisting)

router
.route("/:id")
.get(WrapAsync(listingController.renderlisting))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),ValidateListing,WrapAsync(listingController.rendereditlisting))
.delete(isLoggedIn,isOwner,WrapAsync(listingController.destroylisting));




router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(listingController.editlisting))


  
module.exports= router;


