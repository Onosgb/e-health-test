import { Component, inject } from '@angular/core';
import { Todo } from './models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterEnum } from './enums/filter.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  filterOpton = FilterEnum;
  matSnackBar = inject(MatSnackBar);
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  title = 'e-health-todo-list';
  active: FilterEnum = FilterEnum.today;

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
    );
  }

  get scheduled() {
    return this.todos.filter((todo) => todo.isScheduled).length;
  }

  filterData(type: FilterEnum) {
    this.active = type;
    switch (type) {
      case this.filterOpton.all:
        this.filteredTodos = this.todos;
        break;
      case this.filterOpton.scheduled:
        this.filteredTodos = this.todos.filter((data) => data.isScheduled);
        break;

      case this.filterOpton.completed:
        this.filteredTodos = this.todos.filter((data) => data.completed);
        break;
      case this.filterOpton.flagged:
        this.filteredTodos = this.todos.filter((data) => data.flagged);
        break;

      default:
        this.today.length;
        break;
    }
  }

  createTodo(todo: Todo) {
    if (todo) {
      if (typeof todo.id === 'number') {
        this.todos = this.todos.map((oldTodo) =>
          oldTodo.id === todo.id ? todo : oldTodo
        );
        this.filteredTodos = this.filteredTodos.map((oldTodo) =>
          oldTodo.id === todo.id ? todo : oldTodo
        );
        this.msg('Successfully updated!');
      } else {
        this.todos.push({ ...todo, id: this.todos.length });
        this.filteredTodos.push({ ...todo, id: this.todos.length });
        this.msg('Successfully added!');
      }
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== +id);
    this.todos = this.filteredTodos.filter((todo) => todo.id !== +id);
    this.msg('Successfully removed!');
  }

  msg(msg: string) {
    this.matSnackBar.open(msg, 'X', { duration: 3000 });
  }

  schedule(id: number) {
    this.todos = this.todos.map((t) =>
      t.id == id ? { ...t, isScheduled: t.isScheduled ? false : true } : t
    );
    this.filteredTodos = this.filteredTodos.map((t) =>
      t.id == id ? { ...t, isScheduled: t.isScheduled ? false : true } : t
    );
  }
}
