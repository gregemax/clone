import express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import AppDataSource from "./db";
import { handle } from "./errors/error.midd";
import * as dotenv from "dotenv";
import router from "./router/userrouter";
import { login } from "./controller/usercontroller";
import Todo from "./router/todorouter";
import cors from "cors";
import swggerUi from "swagger-ui-express";
import  swggerjsdoc  from  "swagger-jsdoc"
dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log(err["message"]||err);

  process.exit(1);
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.2",
    info: {
      version: "1.0.0",
      title: "Todo API",
      discription: "A simple todo API",
      contact: {
        name: "greg",
      },
      server: ["http://localhost:4000/"],
    },
    schemas: ["http", "https"],
  },
  apis: ["./dist/**/*.js"],
};
AppDataSource
const app = express();
app.use(cors());
const swaggerDocs = swggerjsdoc(swaggerOptions);
app.use("/api-docs", swggerUi.serve, swggerUi.setup(swaggerDocs))
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);
app.use(express.json());

app.use("/users", router);
app.use("/todos", Todo);

app.post("user/login", login)
app.get("/users", async (req: Request, res: Response) => { })




app.use("*", handle);
app.listen(4000, () => {
    
    console.log(
      "Express server has started on port 4000"
    );
});



process.on("unhandledRejection", (err) => { 
    console.log(err["message"]||err);
    
    process.exit(1);
})
