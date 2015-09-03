/// <reference path="typings/angular2/angular2.d.ts" />
import { Component, View, bootstrap, NgFor, NgIf, Inject, forwardRef } from 'angular2/angular2';

@Component({
  selector: "my-app",
  bindings: [FriendsService]
})

@View({
  template: `<h1>Hello {{ name }}</h1>
    <p>Friends:</p>
  <ul>
    <li *ng-for="#name of names">{{ name }}</li>
  </ul>
  <p *ng-if="names.length > 3">Has many friends!</p>
  <input #myname (keyup)>
  <p>{{myname.value}}</p> 
  <input #nametext>
  <button (click)="addName(nametext.value)">Add Name</button>
  `,
  directives: [NgFor, NgIf]
})

//Component controller
class MyAppComponent {
  name: string;
  names: Array<string>;

  constructor(@Inject(forwardRef( () => FriendsService )) friendsService: FriendsService) {
    this.name = 'Alice';
    this.names = friendsService.names;
  }
  addName(name: string) {
    this.names.push(name);
  }
  doneTyping($event) {
    if($event.which === 13) {
      this.addName($event.target.value);
      $event.target.value = null;
    }
  }
}

class FriendsService {
  names: Array<string>;
  constructor() {
    this.names = ["Alice", "Aarav", "Martin", "Shannon", "Ariana", "Kai"]
  }
}

bootstrap(MyAppComponent,[FriendsService]);
