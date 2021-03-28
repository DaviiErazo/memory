import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateMemoryUseCase } from "./CreateMemoryUseCase";
import { CreateMemoryDTO } from "./createMemoryDto";
import { TextUtils } from "../../../../shared/infra/http/utils/TextUtils";

import * as express from "express";

export class CreateMemoryController extends BaseController {
  private useCase: CreateMemoryUseCase;

  constructor(useCase: CreateMemoryUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: express.Response,
    res: express.Response
  ): Promise<any> {
    let dto: CreateMemoryDTO = req["body"] as CreateMemoryDTO;

    dto = {
      host_name: TextUtils.sanitize(dto.host_name),
      memory_num: dto.memory_num,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
