import express from "express";
import errorHandler from "../middleware/errorHandler.js";
import authRoutes from "../routes/auth.route.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

export default app;