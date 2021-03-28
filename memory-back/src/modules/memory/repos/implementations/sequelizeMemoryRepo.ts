import { Memory } from "../../domain/Memory";
import { IMemoryRepo } from "../memoryRepo";

interface DateMemoryFormatted {
    date_range_top: Date;
    date_range_bottom: Date;
}

export class SequelizeUserRepo implements IMemoryRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async save(memory: Memory): Promise<void> {
        const MemoryModel = this.models.Memory;

        // const rawSequelizeMemory = await MemoryModel.toPersistence(memory);
        // should create a mappers to persistence/domain
        const rawSequelizeMemory = {
            memory_id: memory.MemoryId.toString(),
            host_name: memory.host_name,
            memory: memory.memory_num,
            create_at: memory.created_at,
        };

        await MemoryModel.create(rawSequelizeMemory);

        return;
    }

    async getMemory({ date_range_top, date_range_bottom }: DateMemoryFormatted): Promise<Memory[]> {
        const MemoryModel = this.models.Memory;

        // Should create functions to create queries
        const memoryQuery = await MemoryModel.findAll({
            where: {
                created_at: { 
                  "$between": [date_range_top, date_range_bottom]
                }
              }
        });

        // if (!!memories === false) throw new Error("Memories not found.");

        const memories = memoryQuery.map((m) => {
            return { 
                host_name: m.dataValues.host_name, 
                created_at: m.dataValues.created_at,
                memory_num: m.dataValues.memory,
            };
        });

        return memories;
    }
}
