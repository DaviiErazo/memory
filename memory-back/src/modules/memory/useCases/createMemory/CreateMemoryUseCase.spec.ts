import { CreateMemoryUseCase } from "./CreateMemoryUseCase";
import { FakeRepo } from '../../repos/fakeRepo/FakeRepo';

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
