import { IMemoryRepo } from "../memoryRepo";
import { Memory } from "../../domain/Memory";

export class FakeRepo implements IMemoryRepo {
    async save(memory: Memory): Promise<void> {
        const rawSequelizeMemory = {
            memory_id: memory.MemoryId.toString(),
            host_name: memory.host_name,
            memory: memory.memory_num,
            create_at: memory.created_at,
        };

        // await MemoryModel.create(rawSequelizeMemory);

        return;
    }

    async getMemory({ date_range_top, date_range_bottom }): Promise<Memory[]> {
        const memoryOrError = Memory.create({
            host_name: "david",
            created_at: new Date(),
            memory_num: 12,
        });

        const memory: Memory = memoryOrError.getValue();

        return [memory];
    }
}
