import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        // Use the `mongoose.connect` method properly
        await mongoose.connect(process.env.URI).then((res) => {
            console.log("MONGODB CONNECTED SUCCESSFULLY.");
        
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectToDB;