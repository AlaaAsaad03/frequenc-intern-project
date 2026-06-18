export const TaskStatus = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskPayload {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string;
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string;
}