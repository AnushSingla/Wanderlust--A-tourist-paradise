const { response } = require("express");
const Listing = require("../models/listing.js")

module.exports.index=async(req,res)=>{
    let listings = await Listing.find({});
    res.render("listings/index.ejs",{listings})
  }

  module.exports.newlisting=(req,res)=>{
    res.render("listings/new.ejs")
  }

  module.exports.renderlisting=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews").populate("owner").populate({path:"reviews",populate:{
      path:"author"
    }});
    if(!listing){
      req.flash("error","Listing doesn't exist");
      res.redirect("/listings")
    } 
    res.render("listings/show.ejs",{listing});
  }

  module.exports.rendernewlisting=async(req,res,next)=>{
    
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting = new Listing(req.body.listing);
    
    newlisting.owner = req.user._id;
    newlisting.image={url,filename};


    await newlisting.save();
    req.flash("success","Listing Added Successfully")
    res.redirect("/listings")
    
    
  }

  module.exports.editlisting=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    let originalURL=listing.image.url;
    originalURL=originalURL.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit.ejs",{listing,originalURL});
  }

  module.exports.rendereditlisting=async(req,res)=>{
    let {id} = req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file!=="undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image={url,filename}
      await listing.save();
    }
   
    req.flash("success","Listing Updated Successfully")
    res.redirect(`/listings/${id}`)
  }

  module.exports.destroylisting=async(req,res)=>{
      let {id}=req.params;
      const listing=await Listing.findByIdAndDelete(id);
      req.flash("success","Listing Deleted Successfully")
      res.redirect("/listings")
    }


  
    

    

  