import { Injectable } from '@angular/core';

import { Classe } from '../components/editor/models/classe';

@Injectable()
export class MainEditorService {
  private classList = new Array<Classe>();
  private selectedClass: Classe;

  constructor() { 
  }

  getClassList() {
    return this.classList;
  }

  addClass(classe: Classe) {
    this.classList.push(classe);
  }

  selectClasse(nome: string) {
    this.classList.forEach(classe => {
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
