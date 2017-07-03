import { Injectable } from '@angular/core';

import { Classe } from '../components/editor/models/classe';
import { Global } from '../models/global';

@Injectable()
export class MainEditorService {
  private project = new Global();
  private selectedClass: Classe;

  constructor() { 
  }

  getClassList() {
    return this.project.getClassi();
  }

  addClass(classe: Classe) {
    this.project.getClassi().push(classe);
  }

  selectClasse(nome: string) {
    this.project.getClassi().forEach(classe => {
      console.log(classe.getNome()+' '+nome);
      if(classe.getNome() == nome)
        this.selectedClass = classe;
      else
        this.selectedClass = null;
    });
    if(!this.selectedClass)
      console.log('Classe mancante');
  }

}
