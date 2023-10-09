export interface Todo {
  id: number;
  task: string;
  description: string;
  time: string;
  priority: boolean;
  date: string;
  scheduled: boolean;
  completed: boolean;
  flagged: boolean;
}
