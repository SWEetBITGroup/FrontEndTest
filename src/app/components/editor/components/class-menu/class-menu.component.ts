import { Component, Input, OnDestroy } from '@angular/core';

import { ClassMenuService } from '../../services/class-menu.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'class-menu',
  templateUrl: './class-menu.component.html',
  styleUrls: ['./class-menu.component.css']
})
export class ClassMenuComponent implements OnDestroy{
  @Input() nome: string;
  classe: any;
  name: string;
  sub: Subscription;

  change(name: string) {
    console.log(this.classe);
    this.classe.set('name',name);
    this.name = name;
  }

  addAtribute(attr: string) {
    let attributi = this.classe.attributes.attributes;
    attributi.push(attr);
    this.classe.set('attributes',null); // Hack per far funzionare l'event change:attrs
    this.classe.set('attributes',attributi);
  }

  constructor(private classMenuService: ClassMenuService) { 
    this.sub = classMenuService.selectedClass$.subscribe(
      (x) => {
        this.classe = x;
        this.name = x.getClassName();
      }
    );
  }

  ngOnDestroy() {
    // prevents memory leak when component destroyed
    this.sub.unsubscribe();
  }

}
