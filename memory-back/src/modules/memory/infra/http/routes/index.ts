import express from "express";
import { createMemoryController } from "../../../useCases/createMemory";

const memoryRouter = express.Router();

memoryRouter.post("/", (req, res) => createMemoryController.execute(req, res));

export { memoryRouter };
