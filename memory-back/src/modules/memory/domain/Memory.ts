import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { MemoryId } from "./memoryId";

interface MemoryProps {
    memory_num: number;
    host_name: string;
    create_at: Date;
}

export class Memory extends Entity<MemoryProps> {
    get MemoryId(): MemoryId {
        return MemoryId.create(this._id).getValue();
    }

    get host_name(): string {
        return this.props.host_name;
    }

    get create_at(): Date {
        return this.props.create_at;
    }

    get memory_num(): number {
        return this.props.memory_num;
    }

    private constructor(props: MemoryProps, id?: UniqueEntityID) {
        super(props);
    }

    public static create(props: MemoryProps, id?: UniqueEntityID): Result<Memory> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.host_name, argumentName: "host_name" },
            { argument: props.create_at, argumentName: "create_at" },
            { argument: props.memory_num, argumentName: "memory_num" },
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<Memory>(guardResult.message);
        }

        const memory = new Memory({ ...props }, id);
        return Result.ok<Memory>(memory);
    }
}
