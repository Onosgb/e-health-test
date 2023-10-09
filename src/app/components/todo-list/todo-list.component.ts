import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Todo } from 'src/app/models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  dailog = inject(MatDialog);
  @Input({ required: true }) todos: Todo[] = [];
  @Output()
  createEvent = new EventEmitter<Todo>();
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() scheduleEvent = new EventEmitter<number>();
  addTodo() {
    const dailog = this.dailog.open(TodoFormComponent, {
      minWidth: '30%',
      height: 'auto',
    });

    dailog.afterClosed().subscribe((data) => {
      if (data) {
        this.createEvent.emit(data);
      }
    });
  }

  deleteTodo(id: number) {
    this.deleteEvent.emit(id);
  }

  editTodo(todo: Todo) {
    const dailog = this.dailog.open(TodoFormComponent, {
      minWidth: '30%',
      height: 'auto',
      data: todo,
    });

    dailog.afterClosed().subscribe((data) => {
      if (data) {
        this.createEvent.emit(data);
      }
    });
  }

  schedule(id: number) {
    this.scheduleEvent.emit(id);
  }
}
