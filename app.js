import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

/*
==========================
Global Middlewares
==========================
*/

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/*
==========================
Health Check
==========================
*/

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "🚀 Ardas Delivery Engine Running"

    });

});

export default app;