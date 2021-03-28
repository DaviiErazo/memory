import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface DateMemoryProps {
    date_range_top: string;
    date_range_bottom: string;
}

interface DateMemoryFormatted {
    date_range_top: Date;
    date_range_bottom: Date;
}

export class MemoryDate extends ValueObject<DateMemoryFormatted> {
    get date_range_top(): Date {
        return this.props.date_range_top;
    }

    get date_range_bottom(): Date {
        return this.props.date_range_bottom;
    }

    private constructor(props: DateMemoryFormatted) {
        super(props);
    }

    public static create(props: DateMemoryProps): Result<MemoryDate> {
        let dateformatted: DateMemoryFormatted;

        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.date_range_top, argumentName: "date_range_top" },
            { argument: props.date_range_bottom, argumentName: "date_range_bottom" },
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<MemoryDate>(guardResult.message);
        }

        try {
            dateformatted = {
                date_range_top: new Date(props.date_range_top),
                date_range_bottom: new Date(props.date_range_bottom),
            };
        
        } catch (err) {
            return Result.fail<MemoryDate>("An error ocurred fwhile ormatting string to Date");
        }

        return Result.ok<MemoryDate>(new MemoryDate(dateformatted));
    }
}
