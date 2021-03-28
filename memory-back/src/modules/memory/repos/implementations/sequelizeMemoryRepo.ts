import { Memory } from "../../domain/Memory";
import { MemoryMap } from "../../mappers/memoryMaps";
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
        const rawSequelizeMemory = await MemoryMap.toPersistence(memory);

        await MemoryModel.create(rawSequelizeMemory);

        return;
    }

    async getMemory({ date_range_top, date_range_bottom }: DateMemoryFormatted): Promise<Memory[]> {
        const MemoryModel = this.models.Memory;

        // Should create functions to create queries
        const memoryQuery = await MemoryModel.findAll();
        /*
        const memoryQuery = await MemoryModel.findAll({
            where: {
                created_at: {
                    $between: [date_range_top, date_range_bottom],
                },
            },
        });
        */

        const memories = memoryQuery.map((m) => MemoryMap.toDomain(m.dataValues));

        return memories;
    }
}
