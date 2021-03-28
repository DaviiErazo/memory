import { Result } from "../../../../shared/core/Result";
import { CreateMemoryUseCase } from "./CreateMemoryUseCase";
import { IMemoryRepo } from "../../repos/memoryRepo";
import { Memory } from "../../domain/Memory";

class FakeRepo implements IMemoryRepo {
  async save(memory: Memory): Promise<void> {
    const rawSequelizeMemory = {
      memory_id: memory.MemoryId.toString(),
      host_name: memory.host_name,
      memory: memory.memory_num,
      create_at: memory.create_at,
    };

    // await MemoryModel.create(rawSequelizeMemory);

    return;
  }
}

test("Should be able to store memory", async () => {
  const req = {
    host_name: "david",
    memory_num: 12,
  };

  const fakeRepo = new FakeRepo();
  const createMemoryUseCase = new CreateMemoryUseCase(fakeRepo);
  const createMemoryResponse = await createMemoryUseCase.execute(req);

  expect(createMemoryResponse.value.isSuccess).toBe(true);
});

test("Should be not able to store memory", async () => {
  const req = {
    host_name: null,
    memory_num: 12,
  };

  const fakeRepo = new FakeRepo();
  const createMemoryUseCase = new CreateMemoryUseCase(fakeRepo);
  const createMemoryResponse = await createMemoryUseCase.execute(req);

  expect(createMemoryResponse.value.isFailure).toBe(true);
});
