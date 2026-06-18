import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from '../task.entity';


export class CreateTaskDto {

    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MaxLength(100, {
        message: 'Title must be at most 100 characters long',
    })
    title!: string;

    @IsString()
    @IsOptional()
    @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
    description?: string;

    @IsEnum(TaskStatus, {
        message: `Status must be one of the following: ${Object.values(TaskStatus).join(', ')}`,
    })
    @IsOptional()
    status?: TaskStatus;

    @IsDateString({}, {
        message: 'Due date must be a valid date string',
    })
    @IsOptional()
    dueDate?: string;
}

