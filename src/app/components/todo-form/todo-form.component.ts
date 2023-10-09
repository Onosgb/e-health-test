import { Todo } from './../../models/todo.model';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  todoForm = new FormGroup({
    id: new FormControl(''),
    task: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    priority: new FormControl(''),
    isScheduled: new FormControl(false, Validators.required),
    date: new FormControl(new Date()),
  });

  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {}

  get f() {
    return this.todoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.valid) {
      this.dialogRef.close(this.todoForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
