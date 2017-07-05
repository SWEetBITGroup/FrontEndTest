import { Injectable } from '@angular/core';

import { EditorComponent } from '../components/editor/editor.component';
import { Classe } from '../components/editor/models/classe';
import { Global } from '../models/global';
import { Metodo } from '../components/editor/models/metodo';

/**
 * 'MainEditorservice' stores information about the editor's canvas, the project 
 * and stores a direct access to the EditorComponent.
 * 'MainEditorservice' provides methods to interact with the EditorComponent and 
 * to modify a selected class which is present in the editor's canvas.
 */
@Injectable()
export class MainEditorService {
  /**
   * 'project' is used to store and retrive information about the current project
   */
  private project = new Global();
  /**
   * 'selectedClass' is the selected class in the editor's canvas
   */
  private selectedClasse: Classe;
  /**
   * 'editorComponent' is used to access directly the EditorComponent
   */
  private editorComp: EditorComponent;
  /**
   * 'graph' is used to store the editor's class graph
   */
  private graph: JSON;

  /**
   * 'activityMode' is a flag which indicates if the activity diagram is in use
   */
  private activityMode = false;

  constructor() {
  }

  /**
   * This method is used to set the instantiation of the EditorComponent as
   * internal property of this class
   * @param editCmp the EditorComponent instance
   */
  setEditorComp(editCmp: EditorComponent) {
    this.editorComp = editCmp;
  }

  /**
   * This method is used to retrive the array of classes present in the project
   */
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

  setActivityMode() {
    this.activityMode = true;
  }
  setClassMode() {
    this.activityMode = false;
  }
  getActivityModeStatus() {
    return this.activityMode;
  }

  addAttributo(tipo: string, nome:string, acc: string) {
    this.selectedClasse.addAttributo(tipo,nome,acc);
  }

  removeAttributo(nome: string) {
    console.log(this.selectedClasse);
    this.selectedClasse.removeAttr(nome);
  }

  storeGraph(graph: JSON) {
    this.graph = graph;
  }

  replaceDia(){
    this.editorComp.replaceDiagram(this.graph);
  }

  addMetodo(tipo: string, nome:string, acc: string) {
    this.selectedClasse.addMetodo(new Metodo(nome,acc,tipo));
  }

  removeMetodo(nome: string) {
    console.log(this.selectedClasse);
    this.selectedClasse.removeMetodo(nome);
  }

}
