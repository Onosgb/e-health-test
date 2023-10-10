export interface Task {
  id: number;
  name: string;
  description: string;
  time: string;
  priority: boolean;
  date: string;
  scheduled: boolean;
  completed: boolean;
  flagged: boolean;
}
