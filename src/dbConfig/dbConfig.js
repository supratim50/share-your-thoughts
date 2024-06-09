import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected!");
        })

        connection.on("error", (err) => {
            console.log('MongoDB connection error, please make sure DB is up and running!' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error);
    }
}