import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';

// A factory that creates a mock repository with jest functions
const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
});

type MockRepository = Partial<Record<keyof Repository<Task>, jest.Mock>>;

describe('TasksService', () => {
    let service: TasksService;
    let repository: MockRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getRepositoryToken(Task),
                    useFactory: mockRepository,
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        repository = module.get<MockRepository>(getRepositoryToken(Task));
    });

    // ── findAll ────────────────────────────────────────────────
    describe('findAll', () => {
        it('should return an array of tasks', async () => {
            const mockTasks = [
                { id: 1, title: 'Task 1', status: TaskStatus.PENDING },
                { id: 2, title: 'Task 2', status: TaskStatus.COMPLETED },
            ];
            repository.find!.mockResolvedValue(mockTasks);

            const result = await service.findAll();

            expect(repository.find).toHaveBeenCalled();
            expect(result).toEqual(mockTasks);
        });

        it('should return tasks filtered by status', async () => {
            const mockTasks = [
                { id: 1, title: 'Task 1', status: TaskStatus.PENDING },
            ];
            repository.find!.mockResolvedValue(mockTasks);

            const result = await service.findAll(TaskStatus.PENDING);

            expect(repository.find).toHaveBeenCalledWith({
                where: { status: TaskStatus.PENDING },
                order: { createdAt: 'DESC' },
            });
            expect(result).toEqual(mockTasks);
        });
    });

    // ── findOne ────────────────────────────────────────────────
    describe('findOne', () => {
        it('should return a task when it exists', async () => {
            const mockTask = { id: 1, title: 'Task 1', status: TaskStatus.PENDING };
            repository.findOneBy!.mockResolvedValue(mockTask);

            const result = await service.findOne(1);

            expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });

            expect(result).toEqual(mockTask);
        });

        it('should throw NotFoundException when task does not exist', async () => {
            repository.findOneBy!.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    // ── create ─────────────────────────────────────────────────
    describe('create', () => {
        it('should create and return a new task', async () => {
            const createTaskDto = {
                title: 'New Task',
                description: 'Task description',
                status: TaskStatus.PENDING,
            };
            const mockTask = { id: 1, ...createTaskDto };

            repository.create!.mockReturnValue(mockTask);
            repository.save!.mockResolvedValue(mockTask);

            const result = await service.create(createTaskDto);

            expect(repository.create).toHaveBeenCalledWith(createTaskDto);
            expect(repository.save).toHaveBeenCalledWith(mockTask);
            expect(result).toEqual(mockTask);
        });
    });

    // ── update ─────────────────────────────────────────────────
    describe('update', () => {
        it('should update and return the task', async () => {
            const mockTask = { id: 1, title: 'Old Title', status: TaskStatus.PENDING };
            const updateDto = { title: 'Updated Title', status: TaskStatus.COMPLETED };
            const updatedTask = { ...mockTask, ...updateDto };

            repository.findOneBy!.mockResolvedValue(mockTask);
            repository.save!.mockResolvedValue(updatedTask);

            const result = await service.update(1, updateDto);

            expect(repository.save).toHaveBeenCalled();
            expect(result).toEqual(updatedTask);
        });

        it('should throw NotFoundException when task does not exist', async () => {
            repository.findOneBy!.mockResolvedValue(null);

            await expect(service.update(999, { title: 'New' })).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    // ── remove ─────────────────────────────────────────────────
    describe('remove', () => {
        it('should delete the task and return a success message', async () => {
            const mockTask = { id: 1, title: 'Task 1', status: TaskStatus.PENDING };

            repository.findOneBy!.mockResolvedValue(mockTask);
            repository.remove!.mockResolvedValue(mockTask);

            const result = await service.remove(1);

            expect(repository.remove).toHaveBeenCalledWith(mockTask);
            expect(result).toEqual({ message: 'Task 1 deleted successfully' });
        });

        it('should throw NotFoundException when task does not exist', async () => {
            repository.findOneBy!.mockResolvedValue(null);

            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});