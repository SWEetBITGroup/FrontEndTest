import { Component, Input, OnDestroy } from '@angular/core';

import { ClassMenuService } from '../../services/class-menu.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'class-menu',
  templateUrl: './class-menu.component.html',
  styleUrls: ['./class-menu.component.css']
})
export class ClassMenuComponent implements OnDestroy{
  // @Input() nome: string;
  classe: any;
  types: string[];
  name: string = '';
  nomeAttributoUguale: boolean;
  sub: Subscription;

  // Funzione per cambiare il nome alla classe selezionata
  change(name: string) {
    this.classe.set('name',name);
    this.name = name;
  }

  // Funzione per aggiungere un attributo alla classe selezionata
  addAtribute(attr: string, type: string) {
    let newAtt = attr + ': ' + type;
    let attributi = this.classe.attributes.attributes;
    let nomeUguale = false;
    // Ciclo per controllare che non sia stato inserito un nome per l'attributo già esistente
    attributi.forEach(element => {
      let split = element.split(':');
      if(split[0]==attr) nomeUguale = true;
    });
    if(!nomeUguale){
      attributi.push(newAtt);
      this.classe.set('attributes',null); // Hack per far funzionare l'event change:attrs
      this.classe.set('attributes',attributi);
    } else {
      this.nomeAttributoUguale = true;
    }
  }

  constructor(private classMenuService: ClassMenuService) {
    this.sub = classMenuService.selectedClass$.subscribe(
      (x) => {
        this.classe = x;
        this.name = x.getClassName();
      }
    );
    this.nomeAttributoUguale = false;
    this.types = ['byte','short','int','long','float','double','boolean','char'];
  }

  ngOnDestroy() {
    // prevents memory leak when component destroyed
    this.sub.unsubscribe();
  }

}
