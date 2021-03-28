import { Memory } from "../domain/Memory";

export interface IMemoryRepo {
  // getMemoryByDate (): Promise<boolean>
  save(memory: Memory): Promise<void>;
}
