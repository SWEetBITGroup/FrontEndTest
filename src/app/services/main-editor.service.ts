import { Injectable } from '@angular/core';

import { EditorComponent } from '../components/editor/editor.component';
import { Classe } from '../components/editor/models/classe';
import { Global } from '../models/global';

@Injectable()
export class MainEditorService {
  private project = new Global();
  private selectedClasse: Classe;
  private editorComp: EditorComponent;
  public graph: JSON;

  constructor() { 
  }

  setEditorComp(editCmp: EditorComponent) {
    this.editorComp = editCmp;
  }

  getClassList() {
    return this.project.getClassi();
  }

  getSelectedClasse() {
    return this.selectedClasse;
  }

  addClass(classe: Classe) {
    this.project.getClassi().push(classe);
  }

  selectClasse(nome: string) {
    this.project.getClassi().forEach(classe => {
      if(classe.getNome() == nome)
        this.selectedClasse = classe;
      else
        this.selectedClasse = null;
    });
    if(!this.selectedClasse)
      console.log('Classe mancante');
  }

  addAttributo(tipo: string, nome:string, acc: string) {
    this.selectedClasse.addAttributo(tipo,nome,acc);
  }

  replaceDia(){
    this.editorComp.replaceDiagram(this.graph);
  }

}
