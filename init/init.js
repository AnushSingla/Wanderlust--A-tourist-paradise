const mongoose=require("mongoose");
main().then((res)=>{
    console.log("successful")
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  
    
  };
  const Listing= require("../models/listing.js");
  const initData=require("./data.js");
  
const initdb=async()=>{
 await Listing.deleteMany({});
 initData.data=initData.data.map((obj)=>({...obj,owner:"678e894f20326c5bb87ef07b"}))
 await Listing.insertMany(initData.data);
}

initdb();
 
 

