import { GetMemoryUseCase } from "./GetMemoryUseCase";
import { FakeRepo } from "../../repos/fakeRepo/FakeRepo";
import { Memory } from "../../domain/Memory";

test("Should be able to get memories", async () => {
  const req = {
    date_range_top: "06/05/2020",
    date_range_bottom: "07/05/2020",
  };

  const fakeRepo = new FakeRepo();
  const createMemoryUseCase = new GetMemoryUseCase(fakeRepo);
  const createMemoryResponse = await createMemoryUseCase.execute(req);

  expect(createMemoryResponse.value.isSuccess).toBe(true);
});

test("Should be not able to get memory", async () => {
  const req = {
    date_range_top: "",
    date_range_bottom: "07/05/2020",
  };

  const fakeRepo = new FakeRepo();
  const createMemoryUseCase = new GetMemoryUseCase(fakeRepo);
  const createMemoryResponse = await createMemoryUseCase.execute(req);

  expect(createMemoryResponse.value.isFailure).toBe(true);
});

test("Should to get host_name david", async () => {
  const req = {
    date_range_top: "06/05/2020",
    date_range_bottom: "07/05/2020",
  };

  const fakeRepo = new FakeRepo();
  const createMemoryUseCase = new GetMemoryUseCase(fakeRepo);
  const createMemoryResponse = await createMemoryUseCase.execute(req);

  const firstMemory: Memory =  createMemoryResponse.value.getValue()[0];
  expect(firstMemory.host_name).toEqual("david");

});
