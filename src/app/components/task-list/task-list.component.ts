import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from 'src/app/models';
import { FilterEnum } from 'src/app/enums/filter.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  dailog = inject(MatDialog);
  @Input({ required: true }) tasks: Task[] = [];
  filterOpton = FilterEnum;
  @Input({ required: true }) active: FilterEnum = FilterEnum.today;

  @Output()
  createEvent = new EventEmitter<Task>();
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() completedEvent = new EventEmitter<number>();

  addTask() {
    const dailog = this.dailog.open(TaskFormComponent, {
      minWidth: '30%',
      height: 'auto',
    });

    dailog.afterClosed().subscribe((data) => {
      if (data) {
        this.createEvent.emit(data);
      }
    });
  }

  deleteTask(id: number) {
    this.deleteEvent.emit(id);
  }

  editTask(task: Task) {
    const dailog = this.dailog.open(TaskFormComponent, {
      minWidth: '30%',
      height: 'auto',
      data: task,
    });

    dailog.afterClosed().subscribe((data) => {
      if (data) {
        this.createEvent.emit(data);
      }
    });
  }

  selectCompleted(id: number) {
    this.completedEvent.emit(id);
  }
}
