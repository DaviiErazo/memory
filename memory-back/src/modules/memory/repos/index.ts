import { SequelizeUserRepo } from "./implementations/sequelizeMemoryRepo";
import models from "../../../shared/infra/database/sequelize/models";

const memoryRepo = new SequelizeUserRepo(models);

export { memoryRepo };
