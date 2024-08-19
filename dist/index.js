"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const error_midd_1 = require("./errors/error.midd");
const dotenv = __importStar(require("dotenv"));
const userrouter_1 = __importDefault(require("./router/userrouter"));
const usercontroller_1 = require("./controller/usercontroller");
const todorouter_1 = __importDefault(require("./router/todorouter"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv.config({ path: "./.env" });
process.on("uncaughtException", (err) => {
    console.log(err["message"] || err);
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
db_1.default;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use("/users", userrouter_1.default);
app.use("/todos", todorouter_1.default);
app.post("user/login", usercontroller_1.login);
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
app.use("*", error_midd_1.handle);
app.listen(4000, () => {
    console.log("Express server has started on port 4000");
});
process.on("unhandledRejection", (err) => {
    console.log(err["message"] || err);
    process.exit(1);
});
