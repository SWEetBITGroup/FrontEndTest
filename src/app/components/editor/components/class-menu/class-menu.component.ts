import { Component, Input, OnDestroy } from '@angular/core';

import { ClassMenuService } from '../../services/class-menu.service';
import { MainEditorService } from '../../../../services/main-editor.service';
import { Subscription } from 'rxjs/Subscription';
import { Classe } from '../../models/classe';

@Component({
  selector: 'class-menu',
  templateUrl: './class-menu.component.html',
  styleUrls: ['./class-menu.component.css']
})
export class ClassMenuComponent implements OnDestroy{
  // @Input() nome: string;
  classe: any;
  classeLista: Classe;
  name: string = '';
  nomeAttributoUguale: boolean;
  sub: Subscription;

  types = ['byte','short','int','long','float','double','boolean','char'];
  accessoAttr = ['public','protected','private'];

  selectedTipo: string;
  selectedAcc: string;

  constructor(private classMenuService: ClassMenuService, private mainEditorService: MainEditorService) {
    this.sub = classMenuService.selectedClass$.subscribe(
      (x) => {
        this.classe = x;
        this.name = x.getClassName();
        // this.classeLista = mainEditorService.selectClasse()
      }
    );
    this.nomeAttributoUguale = false;
  }

  // Funzione per aggiungere un attributo alla classe selezionata
  addAtributo(nome: string) {
    let tipo = this.selectedTipo;
    let acc = this.selectedAcc;
    console.log(nome+' '+tipo+' '+acc);
    if(nome && tipo && acc){
      try {
        this.classeLista.addAttributo(tipo, nome, acc);
      } catch (error) {
        if(error.message == 'NomePresente')
          // TODO: segnalare l'errore sul menu! Eliminare il console log
          console.log('nome attributo già esistente');
      }
      let attributi = this.classe.attributes.attributes;
      let vis;
      switch (acc) {  // switch per assegnare il giusto simbolo alla visibilità di un attributo
        case 'public':
          vis = '+';
          break;
        case 'protected':
          vis = '#';
          break;
        case 'private':
          vis = '-';
      }
      attributi.push(vis+' '+nome+' : '+ tipo);
      this.classe.set('attributes',null); // Hack per far funzionare l'event change:attrs
      this.classe.set('attributes',attributi);
      } else {
        // TODO: segnalare il mancato selezionamento dei campi
        console.log('tette');
    }
  }

  // Funzione per modificare un attributo
  changeAttributo() {

  }

  // Funzione per cambiare il nome alla classe selezionata
  changeNome(name: string) {
    this.classe.set('name',name);
    this.name = name;
  }

  ngOnDestroy() {
    // Previene memory leak quando il componente è distrutto
    this.sub.unsubscribe();
  }

}
