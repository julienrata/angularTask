export interface Task {
  id: number;
  title: string;
  completed: boolean;
  status?: 'completed' | 'in-progress' | 'pending';
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}
