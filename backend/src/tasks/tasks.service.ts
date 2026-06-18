import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task, TaskStatus } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }


    async findAll(status?: TaskStatus): Promise<Task[]> {
        if (status) {
            return this.tasksRepository.find({
                where: { status },
                order: { createdAt: 'DESC' },
            });
        }
        return this.tasksRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id });
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        return task;
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepository.create(createTaskDto);
        return this.tasksRepository.save(task);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.findOne(id);
        Object.assign(task, updateTaskDto);
        return this.tasksRepository.save(task);
    }

    async remove(id: number): Promise<{ message: string }> {
        const task = await this.findOne(id);
        await this.tasksRepository.remove(task);
        return { message: `Task with id ${id} has been removed` };
    }
}