import { Memory } from "../domain/Memory";

interface DateMemoryFormatted {
  date_range_top: Date;
  date_range_bottom: Date;
}

export interface IMemoryRepo {
  // getMemoryByDate (): Promise<boolean>
  save(memory: Memory): Promise<void>;
  getMemory({
    date_range_top,
    date_range_bottom,
  }: DateMemoryFormatted): Promise<Memory[]>;
}
