import { Result } from "../../../shared/core/Result";
import { Memory } from "./Memory";

let memory: Memory;
let memoryOrError: Result<Memory>;

test("Should be able to create a valid memory", () => {
  memoryOrError = Memory.create({
    host_name: "david",
    create_at: new Date(),
    memory_num: 12,
  });

  expect(memoryOrError.isSuccess).toBe(true);
  memory = memoryOrError.getValue();

  expect(memory.props.host_name).toBe("david");
  expect(memory.props.memory_num).toBe(12);
});

test("Should be able to create an invalid memory", () => {
  memoryOrError = Memory.create({
    host_name: undefined,
    create_at: new Date(),
    memory_num: 12,
  });

  expect(memoryOrError.isFailure).toBe(true);
});
