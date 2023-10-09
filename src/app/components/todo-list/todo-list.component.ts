import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  dailog = inject(MatDialog);

  addTodo() {
    const dailog = this.dailog.open(TodoFormComponent, {
      minWidth: '30%',
      height: '80%',
    });

    dailog.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }
}
