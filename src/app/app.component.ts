import { Component, inject } from '@angular/core';
import { Todo } from './models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  matSnackBar = inject(MatSnackBar);
  todos: Todo[] = [];
  title = 'e-health-todo-list';

  get getTimeOfDay(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Afternoon';
    } else {
      return 'Night';
    }
  }

  get today() {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return this.todos.filter(
      (todo) =>
        year === new Date(todo.date).getFullYear() &&
        month === new Date(todo.date).getMonth() &&
        date === new Date(todo.date).getDate()
    ).length;
  }

  get scheduled() {
    return this.todos.filter((todo) => todo.isScheduled).length;
  }

  createTodo(todo: Todo) {
    if (todo) {
      if (typeof todo.id === 'number') {
        this.todos = this.todos.map((oldTodo) =>
          oldTodo.id === todo.id ? todo : oldTodo
        );
        this.msg('Successfully updated!');
      } else {
        this.todos.push({ ...todo, id: this.todos.length });
        this.msg('Successfully added!');
      }
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== +id);
    this.msg('Successfully removed!');
  }

  msg(msg: string) {
    this.matSnackBar.open(msg, 'X', { duration: 3000 });
  }

  schedule(id: number) {
    this.todos = this.todos.map((t) =>
      t.id == id ? { ...t, isSchedule: t.isScheduled ? false : true } : t
    );
  }
}
