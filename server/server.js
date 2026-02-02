import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import menuRoutes from "./routes/menu.route.js";
import orderRoutes from "./routes/order.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

/*------------ Middleware --------------*/
app.use(express.json());

app.use(
    cors({
        // origin: ["http://localhost:5000"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
})
);

/* ----------- Routes -----------*/
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);

/*---------- Health Check ---------- */
app.get("/", (req, res) => {
    res.send("Restaurant API is running");
});

/*--------- Error Handler -------------*/
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) {
    return next(err); // If response was already sent, don't try to send it again!
  }
    res.status(500).json({message: "Internal Server Error"});
}); 

/* --------- Server start ---------*/
const PORT = process.env.PORT || 5000
connectDB();
app.listen(PORT, () => {   
    console.log(`Server run at http://localhost:${PORT}`);
});

