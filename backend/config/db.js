import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://sannifuddin:sannifuddin12345@cluster0.pzvtzcg.mongodb.net/food-del').then(()=>console.log("DB Connected"));
   
}


