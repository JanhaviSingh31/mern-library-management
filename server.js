import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import  cors from "cors";


//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product",productRoutes);

//rest api
app.get("/", (req, res) => {
    res.send({
        message:'Welcome to ecommerce app',
    });
});

//port
const PORT = process.env.PORT || 8080
const DATABASE_URL = process.env.DATABASE_URL ||"mongodb://127.0.0.1:27017";

//Database connection
connectDB(DATABASE_URL);

//run listen
app.listen(PORT, () =>{
    console.log(`Server RUnning on ${process.env.DEV_MODE} mode on port ${PORT} `.bgCyan.white);
});