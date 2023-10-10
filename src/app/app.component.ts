import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { Task } from './models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterEnum } from './enums/filter.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  filterOpton = FilterEnum;
  matSnackBar = inject(MatSnackBar);
  tasks: Task[] = [];
  isSide = true;
  isContent = true;
  title = 'e-health-task-list';
  active: FilterEnum = FilterEnum.today;
  sSize!: number;

  ngOnInit(): void {
    const tasks = this.getTasks;

    if (tasks) {
      this.tasks = this.today;
    }
  }

  get getTimeOfDay(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }

  get currentDate() {
    return new Date().getDate();
  }

  get today() {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return this.getTasks.filter(
      (task) =>
        year === new Date(task.date).getFullYear() &&
        month === new Date(task.date).getMonth() &&
        date === new Date(task.date).getDate()
    );
  }

  get scheduled() {
    return this.getTasks.filter((task) => task.scheduled);
  }

  get completed() {
    return this.getTasks.filter((task) => task.completed);
  }

  get flagged() {
    return this.getTasks.filter((task) => task.flagged);
  }

  filterData(type: FilterEnum) {
    this.isSide = false;
    this.isContent = true;
    this.active = type;
    switch (type) {
      case this.filterOpton.all:
        this.tasks = this.getTasks;
        break;

      case this.filterOpton.scheduled:
        this.tasks = this.scheduled;
        break;

      case this.filterOpton.completed:
        this.tasks = this.completed;
        break;

      case this.filterOpton.flagged:
        this.tasks = this.flagged;
        break;

      default:
        this.tasks = this.today;
        break;
    }
  }

  createTask(task: Task) {
    let tasks = this.getTasks;

    if (task) {
      if (typeof task.id === 'number') {
        this.tasks = tasks.map((oldTask) =>
          oldTask.id === task.id ? task : oldTask
        );

        tasks = tasks.map((oldTask) =>
          oldTask.id === task.id ? task : oldTask
        );

        this.msg('Successfully updated!');
      } else {
        task.id = this.tasks.length;

        tasks.push(task);
        this.tasks.push(task);

        this.msg('Successfully added!');
      }
    }

    this.setTasks(tasks);
  }

  deleteTask(id: number) {
    let tasks = this.getTasks;
    this.tasks = this.tasks.filter((task) => task.id !== +id);
    tasks = this.tasks.filter((task) => task.id !== +id);
    this.setTasks(tasks);
    this.msg('Successfully removed!');
  }

  msg(msg: string) {
    this.matSnackBar.open(msg, 'X', { duration: 3000 });
  }

  get getTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      return JSON.parse(tasks);
    }

    return [];
  }

  selectCompleted(id: number) {
    let tasks = this.getTasks;
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, completed: t.completed ? false : true } : t
    );

    tasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: t.completed ? false : true } : t
    );

    this.setTasks(tasks);
  }

  setTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  openNav() {
    if (this.sSize <= 768) {
      this.isSide = !this.isSide;
      if (this.isSide) {
        this.isContent = false;
      } else {
        this.isContent = true;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update the screen width property when the window is resized
    this.detectScreenSize();
  }

  detectScreenSize() {
    this.sSize = window.innerWidth;
    // You can add logic here to respond to different screen sizes
    if (this.sSize <= 768) {
      // Small screen
      this.isContent = true;
      this.isSide = false;
    } else {
      this.isSide = true;
      this.isContent = true;
    }
  }
}
