export interface GetMemoryResponseDTO {
    memories: MemoryResponseDTO[];
}

interface MemoryResponseDTO {
    host_name: string;
    created_at: string | Date;
    memory_num: number;
}
