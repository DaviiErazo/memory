import { GetMemoryUseCase } from "./GetMemoryUseCase";
import { GetMemoryController } from "./GetMemoryController";
import { memoryRepo } from "../../repos";

const getMemoryUseCase = new GetMemoryUseCase(memoryRepo);
const getMemoryController = new GetMemoryController(getMemoryUseCase);

export { getMemoryUseCase, getMemoryController };
