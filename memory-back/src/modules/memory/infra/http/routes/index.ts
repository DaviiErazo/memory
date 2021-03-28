import express from "express";
import { createMemoryController } from "../../../useCases/createMemory";
import { getMemoryController } from "../../../useCases/getMemory";

const memoryRouter = express.Router();

memoryRouter.post("/", (req, res) => createMemoryController.execute(req, res));
memoryRouter.get("/", (req, res) => getMemoryController.execute(req, res));

export { memoryRouter };
