import { Memory } from "../domain/Memory";
import { Mapper } from "../../../shared/infra/Mapper";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class MemoryMap implements Mapper<Memory> {
    public static toDomain(raw: any): Memory {
        const memoryOrError = Memory.create(
            {
                host_name: raw.host_name,
                memory_num: raw.memory,
                created_at: new Date(raw.created_at),
            },
            new UniqueEntityID(raw.memory_id));

        memoryOrError.isFailure ? console.log(memoryOrError.error) : "";

        return memoryOrError.isSuccess ? memoryOrError.getValue() : null;
    }

    public static async toPersistence(memory: Memory): Promise<any> {
        return {
            memory_id: memory.MemoryId.id.toString(),
            host_name: memory.host_name,
            memory: memory.memory_num,
            created_at: memory.created_at
        };
    }
}
