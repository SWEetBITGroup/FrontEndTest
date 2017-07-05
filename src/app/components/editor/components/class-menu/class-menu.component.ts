import { Component, Input, OnDestroy } from '@angular/core';

import { ClassMenuService } from '../../services/class-menu.service';
import { MainEditorService } from '../../../../services/main-editor.service';
import { Subscription } from 'rxjs/Subscription';
import { Classe } from '../../models/classe';
import { Param } from '../../models/param';

@Component({
  selector: 'class-menu',
  templateUrl: './class-menu.component.html',
  styleUrls: ['./class-menu.component.css']
})
export class ClassMenuComponent implements OnDestroy{
  // @Input() nome: string;
  classe: any;
  name: string = '';
  nomeAttributoUguale: boolean;

  sub: Subscription; // Subscription all'ossevable di tipo elemento-classe selezionato dal grafico

  types = ['byte','short','int','long','float','double','boolean','char'];
  accessoAttr = ['public','protected','private'];

  selectedTipoAtt: string;
  selectedAccAtt: string = 'public';
  selectedTipoMet: string;
  selectedAccMet: string = 'public';

  // Array per parametri di metodi
  parametriMetodo= new Array<Param>();

  constructor(private classMenuService: ClassMenuService, private mainEditorService: MainEditorService) {
    this.sub = classMenuService.selectedClass$.subscribe(
      (x) => {
        this.classe = x;
        this.name = x.getClassName();
      }
    );
    this.nomeAttributoUguale = false;
  }

  // Funzione per aggiungere un attributo alla classe selezionata
  addAttributo(nome: string) {
    let tipo = this.selectedTipoAtt;
    let acc = this.selectedAccAtt;
    console.log(nome+' '+tipo+' '+acc);
    if(nome && tipo && acc){
      try {
        this.mainEditorService.addAttributo(tipo, nome, acc);
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
      this.selectedAccAtt = 'public';
      this.selectedTipoAtt = null;
      } else {
        // TODO: segnalare il mancato selezionamento dei campi
        console.log('tette');
    }
  }

  removeAttributo(nome: string) {
    let attributi = this.classe.attributes.attributes;
    attributi.splice(attributi.findIndex(element => {
      let att = element.split(': ');        // Tutto questo perché non sono riuscito ad
      att = att[0].split(' ');              // implementare una regular expression S.B.
      if(att[1] == nome) {return element;}
    }),1);
    this.classe.set('attributes',null);
    this.classe.set('attributes',attributi);
    console.log('ora rimuovo attr');
    this.mainEditorService.removeAttributo(nome);
  }

  // Funzione per modificare un attributo
  changeAttributo() {

  }

  // Funzione per cambiare il nome alla classe selezionata e resetta il campo input del nome inserito
  changeNome(name: string) {
    if (name != '') {
      this.classe.set('name',name);
      this.name = name;
      (<HTMLInputElement>document.getElementById('changeName')).value = '';
    }
  }

  ngOnDestroy() {
    // Previene memory leak quando il componente è distrutto
    this.sub.unsubscribe();
  }

  /* Funzione per aggiungere/rimuovere la riga della lista di Parametri attuali */
  aggiungiParam() {
    this.parametriMetodo.push(new Param("test","test"));
    console.log("caodsa");
  }

  // Funzione per aggiungere un metodo alla classe selezionata
  addMetodo(nome: string) {
    let tipo = this.selectedTipoMet;
    let acc = this.selectedAccMet;
    console.log(nome+' '+tipo+' '+acc);
    if(nome && tipo && acc){
      try {
        this.mainEditorService.addMetodo(tipo, nome, acc);
      } catch (error) {
        if(error.message == 'NomePresente')
          // TODO: segnalare l'errore sul menu! Eliminare il console log
          console.log('nome attributo già esistente');
      }
      let metodi = this.classe.attributes.methods;
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
      metodi.push(vis+' '+nome+'(): '+ tipo);
      this.classe.set('methods',null); // Hack per far funzionare l'event change:attrs
      this.classe.set('methods',metodi);
      this.selectedAccMet = 'public';
      this.selectedTipoMet = null;
      } else {
        // TODO: segnalare il mancato selezionamento dei campi
        console.log('tette');
    }
  }

  //Rimuove il metodo
  removeMetodo(nome: string) {
    let metodi = this.classe.attributes.methods;
    metodi.splice(metodi.findIndex(element => {
      let met = element.split(': ');        // Tutto questo perché non sono riuscito ad
      met = met[0].split(' ');              // implementare una regular expression S.B.
      if(met[1] == nome) {return element;}
    }),1);
    this.classe.set('attributes',null);
    this.classe.set('attributes',metodi);
    console.log('ora rimuovo metodo');
    this.mainEditorService.removeMetodo(nome);
  }

  modifyMetodo(nome: string) {
    this.mainEditorService.enterActivityMode(nome);
  }

}
