import { AppError } from "../../../../shared/core/AppError";
import { left, right, Result, Either } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Memory } from "../../domain/Memory";
import { IMemoryRepo } from "../../repos/memoryRepo";
import { CreateMemoryDTO } from "./createMemoryDto";

type Response = Either<AppError.UnexpectedError, Result<Memory | void>>;

export class CreateMemoryUseCase implements UseCase<CreateMemoryDTO, Promise<Response>> {
    private memoryRepo: IMemoryRepo;

    constructor(userRepo: IMemoryRepo) {
        this.memoryRepo = userRepo;
    }

    async execute(request: CreateMemoryDTO): Promise<Response> {
        const host_name = request.host_name;
        const memory_num = request.memory_num;
        const created_at = new Date();

        try {
            const memoryOrError: Result<Memory> = Memory.create({
                host_name,
                memory_num,
                created_at,
            });

            if (memoryOrError.isFailure) {
                return left(Result.fail<Memory>(memoryOrError.error.toString())) as Response;
            }

            const memory: Memory = memoryOrError.getValue();

            await this.memoryRepo.save(memory);

            return right(Result.ok<Memory>(memory));
        } catch (err) {
            return left(new AppError.UnexpectedError(err)) as Response;
        }
    }
}
