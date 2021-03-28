import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetMemoryUseCase } from "./GetMemoryUseCase";
import { GetMemoryRequestDTO } from "./GetMemoryRequestDTO";
import { GetMemoryResponseDTO } from "./GetMemoryResponseDTO";

import * as express from "express";

export class GetMemoryController extends BaseController {
    private useCase: GetMemoryUseCase;

    constructor(useCase: GetMemoryUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: express.Response, res: express.Response): Promise<any> {
        const dto: GetMemoryRequestDTO = {
            date_range_top: req["query"].date_range_top,
            date_range_bottom: req["query"].date_range_bottom,
        } as GetMemoryRequestDTO;
        
        try {
            const result = await this.useCase.execute(dto);

            if (result.isLeft()) {
                const error = result.value;
                return this.fail(res, error.errorValue().message);
            } else {
                const memoryDetails = result.value.getValue();

                // create future mapper
                return this.ok<GetMemoryResponseDTO>(res, {
                    memories: memoryDetails.map((m) => {
                        return {
                            host_name: m.host_name,
                            created_at: m.created_at,
                            memory: m.memory_num,
                            id: m.MemoryId.id.toString(),
                        };
                    }),
                });
            }
        } catch (err) {
            return this.fail(res, err);
        }
    }
}
