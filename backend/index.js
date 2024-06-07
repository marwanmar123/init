require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./Controllers/AuthController");
const product = require("./Controllers/ProductController");
const multer = require("multer");


const app = express();
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

const PORT = process.env.PORT || 4000;

mongoose
    .connect(process.env.DB)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server rah mrani t7t lpor ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("error hna", error);
    });

app.use("/", auth);
app.use("/", product);