import { Component, signal } from '@angular/core';
import { Task } from './../../models/task.model';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports : [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'crear componentes',
      completed: false
    },
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,

    ]
  });

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


}

