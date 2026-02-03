import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected")
    } catch (err) {
        console.log("db connection error",err);
        
    }
}

export default connectDb