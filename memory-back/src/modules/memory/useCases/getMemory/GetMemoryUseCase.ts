import { AppError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Memory } from "../../domain/Memory";
import { MemoryDate } from "../../domain/MemoryDate";
import { IMemoryRepo } from "../../repos/memoryRepo";
import { GetMemoryDTO } from "./GetMemoryDTO";

type Response = Either<AppError.UnexpectedError, Result<Memory[] | void>>;

export class GetMemoryUseCase
  implements UseCase<GetMemoryDTO, Promise<Response>> {
  private memoryRepo: IMemoryRepo;

  constructor(memoryRepo: IMemoryRepo) {
    this.memoryRepo = memoryRepo;
  }

  public async execute(req: GetMemoryDTO): Promise<Response> {
    let memories: Memory[];

    const RangeDateOrError = MemoryDate.create(req);

    if (RangeDateOrError.isFailure) {
      return left(
        Result.fail<any>(RangeDateOrError.error.toString())
      ) as Response;
    }

    try {
      const ranges = {
        date_range_top: RangeDateOrError.getValue().date_range_top,
        date_range_bottom: RangeDateOrError.getValue().date_range_bottom,
      };
      memories = await this.memoryRepo.getMemory(ranges);
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    return right(Result.ok<Memory[]>(memories));
  }
}
