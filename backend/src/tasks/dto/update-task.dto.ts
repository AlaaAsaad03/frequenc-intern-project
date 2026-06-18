import { IsDateString, IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { TaskStatus } from "../task.entity";


export class UpdateTaskDto {

    @IsString()
    @IsOptional()
    @MaxLength(100)
    title?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @IsEnum(TaskStatus, {
        message: `Status must be one of the following: ${Object.values(TaskStatus).join(', ')}`,
    })
    @IsOptional()
    status?: TaskStatus;

    @IsDateString()
    @IsOptional()
    dueDate?: string;



}