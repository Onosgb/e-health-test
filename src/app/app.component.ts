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
}
