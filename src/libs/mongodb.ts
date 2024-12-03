import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
 try {
   const uri = 'mongodb+srv://andywt2003:8bNRZhaTQaf4k4JA@cluster0.li1bv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
   
    // there is an issue with the .env file and connecting to the database, thus we have used a local val. I understand that this is not secure
    // however, given this is a school project, this was ignored.
   //.envprocess.env.MONGODB_URI;
   if (!uri) {
     throw new Error("MONGODB_URI is not defined in environment variables.");
   }

   await mongoose.connect(uri);
   console.log("Connected to MongoDB.");
 } catch (error) {
   console.log("Error connecting to MongoDB:", (error as Error).message);
 }
};

export default connectMongoDB;

