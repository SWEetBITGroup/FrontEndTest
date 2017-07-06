import { Component, OnInit , AfterViewInit, Input } from '@angular/core';

import { ClassMenuService } from './services/class-menu.service';
import { EditServiceService } from '../../services/edit-service.service';
import { MainEditorService } from '../../services/main-editor.service';

import { Subscription } from 'rxjs/Subscription';

import { Classe } from './models/classe';

declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  // host: {
  //   '(window:resize)': 'onResize($event)'
  // }
  providers: [ClassMenuService]
})

export class EditorComponent implements OnInit {
  graph: any;
  paper: any;

  public yAx: number =0;
  public xAx: number =1;

  sub: Subscription; // Subscription all'observable per la funzione di zoom

  selectedCell: any; // Cella selezionata tramite mouse-click sul grafico


  constructor(private classMenuService: ClassMenuService,
              private editService: EditServiceService,
              private mainEditorService: MainEditorService) {
    this.selectedCell = null;

    // Subscribe all'oggetto observable per la funzione di zoom
    this.sub = editService.selectedGrapg$.subscribe(
      (x) => {
        if(x=='+')
          this.zoomIn();
        else if(x=='-')
          this.zoomOut();
      }
    );
  }


  ngOnInit() {
    this.graph = new joint.dia.Graph;
    this.paper = new joint.dia.Paper({
      el: $("#paper"),
      width: $('#paper').width(),
      height: $('#paper').height(),
      gridSize: 10,
      model: this.graph
    });

    this.paper.drawGrid("dot");

    this.paper.scale(this.xAx,this.yAx);

    // DA RIMUOVERE: crea una shape classe UML
    let class1 = new joint.shapes.uml.Class({
      position: { x: 120, y: 30 },
      size: { width: 300, height: 100 },
      name: ['Class1'],
      attributes: ['+ attributeOne: String'],
      methods: ['+ setAttributeOne(att: String): Void','+ getAttributeOne(): String'],
      attrs: {
            '.uml-class-name-rect': {
                fill: 'rgba(48,28,198,0.1)',
                stroke: 'rgba(48,8,198,0.5)',
                'stroke-width': 1.5
            },
            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                fill: 'rgba(48,28,198,0.1)',
                stroke: 'rgba(48,8,198,0.5)',
                'stroke-width': 1.5
            },
            '.uml-class-name-text': {
              'font-family': 'monospace'
            },
            '.uml-class-attrs-text': {
                ref: '.uml-class-attrs-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle',
                'font-family': 'monospace'
            },
            '.uml-class-methods-text': {
                ref: '.uml-class-methods-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle',
                'font-family': 'monospace'
            }
        }
    });

    // DA RIMUOVERE: Inserisce l'elemento classe in graph
    this.graph.addCell(class1);

    /**
     * This methods allows to the mouse's pointer to recognize when a class is clicked and select it
     */
    this.paper.on('cell:pointerdown', (cellView) => {
      this.elementSelection(cellView);
    });

    // Funzione per deselezionare le classi selezionate, rimuove l'highlight
    // dall'elemento e pone a null l'oggetto selectedCell del component
    /**
     * This methods allows to the mouse's pointer to recognize when the class is unselected by click outside that shape
     */
    this.paper.on('blank:pointerdown', () => {
      if(this.selectedCell){
        this.selectedCell.unhighlight();
      }
      this.selectedCell = null;
    });

    this.mainEditorService.storeGraph(this.graph.toJSON()); // ELIMINARE
    this.mainEditorService.setEditorComp(this);

    // TODO: da eliminare solo per testing
    this.mainEditorService.addClass(new Classe('Class1'), class1);
    this.mainEditorService.getClassList()[0].addAttributo('String', 'attributeOne', 'public');
  }
   // Salva il graph corrente utilizzando il metodo storeGraph di mainEditor service,pulisce this.graph e lo ripopola tramite il JSON fornito in ingresso
  /**
   *  This methods is used to replace the editor with a new windows with the contents in the JSON file
   *  @param graph
   */
  replaceDiagram(graph: JSON) {
    if(graph){
      if(!this.mainEditorService.getActivityModeStatus())
        this.mainEditorService.storeGraph(this.graph.toJSON());
      this.graph.clear();
      this.graph.fromJSON(graph);
    }
  }

  /**
   * This methods select a shape in the editor
   * @param cellView
   */
  elementSelection(cellView: any) {
    if (this.selectedCell){
      this.selectedCell.unhighlight();
    }
    cellView.highlight();
    if(!this.mainEditorService.getActivityModeStatus()){
      this.selectedCell = cellView;
      this.classMenuService.classSelection(cellView.model);
      this.mainEditorService.selectClasse(cellView.model.attributes.name[0]);
    } else {
      // TODO selezione elemento dell'activity diagram
    }
  }

  // Aggointa classe
  /**
   * This methods add to the editor an element
   * @param element
   */
  addElement(element: any) {
    this.graph.addCell(element);
  }

  /**
   * This methods increase the scale of the editor
   */
  zoomIn(){
    this.xAx+=(0.05);
    this.xAx+=(0.05);
    this.paper.scale(this.xAx,this.xAx);
  }

  /**
   * This methods decrease the scale of the editor
   */
  zoomOut(){
    this.xAx-=(0.05);
    this.xAx-=(0.05);
    this.paper.scale(this.xAx,this.xAx);
  }

  /**
   * This methods clone the selected element
   */
  cloneElement() {
    let clone = this.selectedCell.model.clone();
    clone.translate(80,80);
    this.graph.addCell(clone);
  }

}