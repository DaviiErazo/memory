import { CreateMemoryUseCase } from "./CreateMemoryUseCase";
import { CreateMemoryController } from "./createMemoryController";
import { memoryRepo } from "../../repos";

const createMemoryUseCase = new CreateMemoryUseCase(memoryRepo);
const createMemoryController = new CreateMemoryController(createMemoryUseCase);

export { createMemoryUseCase, createMemoryController };