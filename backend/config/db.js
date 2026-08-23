import mongoose from "mongoose";

export const connectDB = async () => {

    const host = process.env.MONGO_HOST;
    const port = process.env.MONGO_PORT;
    const database = process.env.MONGO_DATABASE;
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    await mongoose.connect(
        `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
    );

    console.log("DB Connected");
};