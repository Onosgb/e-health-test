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
  todoForm!: FormGroup;

  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private fb: FormBuilder
  ) {
    this.createForm();

    if (data) {
      this.todoForm.patchValue(this.data);
    }
  }

  get f() {
    return this.todoForm.controls;
  }

  createForm() {
    this.todoForm = this.fb.group({
      id: new FormControl(''),
      task: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      priority: new FormControl(''),
      scheduled: new FormControl(false, Validators.required),
      completed: new FormControl(false, Validators.required),
      flagged: new FormControl(false, Validators.required),
      date: new FormControl(new Date()),
    });
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
