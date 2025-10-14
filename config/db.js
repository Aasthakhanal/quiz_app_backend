import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://aasthakhanal02_db_user:quizapp12345@cluster0.uz8n26l.mongodb.net/"
    )
    .then(() => {
      console.log("DB CONNECTED");
    });
};
