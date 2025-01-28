
const mongoose=require("mongoose");

const listingSchema= new mongoose.Schema({
    title:{ type: String,
        required:true,
    },
    description:{type :String,
    },
    image:{
       
        url:String,
        filename:String,
    },
    
    price:{type:Number,
    },
    location:{type: String,
    },
    country:{ type: String,
    },
    category:{
        type:String,
        enum:["Cities","Mountains","Beaches","Islands","Arctic","Pools","Lakes","Camping"]
        
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Review"
        },
    ],
    owner: {type: mongoose.Schema.Types.ObjectId,
            ref:  "User"

        },
       
    
    
    
},{strict:false})

const Listing = mongoose.model("Listing",listingSchema);
module.exports= Listing;

const Review=require("./review.js");

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listingSchema}})
    }
})