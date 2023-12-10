import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports : [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent {
  welcome = 'hola'
  tasks = signal([
    'todoapp',
    'hola',
    'si',
    'no']);
    name = signal('Andress')
    age = '18';
    disabled = true;
    img = 'https://w3schools.com/howto/img_avatar.png';

    person = {
      name: 'elver',
      age: 18,
      avatar: 'https://w3schools.com/howto/img_avatar.png'
    };

    colorCtrl = new FormControl();
    widthCtrl = new FormControl(50, {
      nonNullable : true,
    });

    constructor() {
      this.colorCtrl.valueChanges.subscribe(value => {console.log(value)
      }
      );
    }

    clickHandler(){
      alert('Hola')

  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.name.set(newValue);

  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
