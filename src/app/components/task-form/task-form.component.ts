import { Component, HostListener, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  taskForm!: FormGroup;
  selectedDateTime: Date = new Date();
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder
  ) {
    this.createForm();

    if (data) {
      this.taskForm.patchValue(this.data);
    }
  }

  get f() {
    return this.taskForm.controls;
  }

  createForm() {
    this.taskForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      priority: new FormControl(''),
      completed: new FormControl(false, Validators.required),
      flagged: new FormControl(false, Validators.required),
      date: new FormControl(new Date()),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  @HostListener('click', ['$event'])
  selectTime(event: any) {
    console.log(event.target.id);
    if (event.target.id === 'time') {
    }
  }
}
