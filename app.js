if(process.env.NODE_ENV!="production"){
  require("dotenv").config();
}

const express = require('express')
const app = express();
const port=3030;
const mongoose=require("mongoose");
const path=require("path");



const ejsMate = require("ejs-mate");

const ExpressError=require("./utils/ExpressError.js")


const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const Listing = require("./models/listing.js")
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User =require("./models/user.js");
const listingRouter= require("./routes/listing.js")
const reviewRouter =require("./routes/review.js")
const userRouter = require("./routes/user.js")

const { CloudinaryStorage } = require('multer-storage-cloudinary')






const dbUrl=process.env.ATLASDB_URL;
main().then((res)=>{
  console.log("successful")
})
.catch((err)=>{
  console.log(err)
})

async function main() {
  await mongoose.connect(dbUrl);

  
}

app.engine("ejs",ejsMate);
app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"public")));
const methodOverride=require("method-override");
const { Session } = require('inspector/promises');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))

const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
  secret:process.env.SECRET
  },
  touchAfter:24*3600,});

  store.on("error",()=>{
    console.log("error",err)
  });

const SessionOptions ={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized : true,
  cookie: { expires: Date.now() + 7*24*60*60*1000,
    maxAge : 7*24*60*60*1000,
    httpOnly:true

  }
}




app.use(session(SessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user;
  next();
})

app.get("/",(req,res)=>{
  res.render("listings/home.ejs")
})

  

app.use("/listings", listingRouter);
  
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);












app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"express not found"));

});


  

  
  
 


  app.use((err,req,res,next)=>{
    let{statuscode=500,message="NOT ACCEPTABLE"}=err;
    res.status(statuscode).render("error.ejs",{err});
  })

  


    


app.listen(port,(req,res)=>{
    console.log("port executed")
})