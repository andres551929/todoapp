import { Component, Injector, computed,effect,inject, signal } from '@angular/core';
import { Task } from './../../models/task.model';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  filter = signal('all');
  taskByFilter = computed( () => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);

    }
    return tasks;
  });

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,

    ]
  });

  injector = inject(Injector);

  constructor () {

  }

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  }

  changeHandler() {
    if (this.newTaskCtrl.valid && this.newTaskCtrl.value.trim() != '') {
      const value = this.newTaskCtrl.value
      this.addTask(value);
      this.newTaskCtrl.setValue('');

    }
    //this.tasks.update((tasks) => [...tasks, newTask]);
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask])
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          // Aquí debes actualizar la propiedad booleana según tus necesidades
          // Por ejemplo, si la propiedad booleana se llama 'completed', puedes hacer algo como:
          return { ...task, completed: !task.completed }; // Cambiar el valor de 'completed'
        } else {
          return task;
        }
      });
    });
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task, editing: true
          }
        }
        return { ...task, editing: false };
      })
    });
  }
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task, title: input.value,
            editing:false
          }
        }
        return task;
      })
    });
  }

  changeFilter(filter: string){
    this.filter.set(filter);
  }
}

