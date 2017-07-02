import { Component, OnInit , AfterViewInit, Input } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { ClassMenuService } from './services/class-menu.service';
import { EditServiceService } from '../../edit-service.service';

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
  ciao : boolean;  // TODO da eliminare
  classList = new Array<Classe>();


  public yAx: number =0;
  public xAx: number =1;

  sub: Subscription;

  selectedClass: any;

  constructor(private classMenuService: ClassMenuService, private editService: EditServiceService) {
    this.selectedClass = null;
    
    // Subscribe all'oggetto observable per la funzione di zoom
    this.sub = editService.selectedGrapg$.subscribe(
      (x) => {
        if(x=='+')
          this.zoomIn();
        else if(x=='-')
          this.zoomOut();
      }
    );

    // TODO: da eliminare solo per testing
    this.classList.push(new Classe('prova'));
    this.classList[0].addAttributo('String', 'attributeOne', 'public');
    console.log(this.classList);
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
      position: { x: 50, y: 30 },
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
    // Funzione per rilevare il click del puntatore su un elemento
    this.paper.on('cell:pointerdown', (cellView) => {
      this.classSelection(cellView);
    });
    // Funzione per deselezionare le classi selezionate, rimuove l'highlight
    // dall'elemento e pone a null l'oggetto selectedClass del component
    this.paper.on('blank:pointerdown', () => {
      if(this.selectedClass){
        this.selectedClass.unhighlight();
      }
      this.selectedClass = null;
      this.ciao = true;
    });
  }

  // Selezione di una classe
  classSelection(cellView: any) {
    if (this.selectedClass){
      this.selectedClass.unhighlight();
      this.ciao = true;
    }
    cellView.highlight();
    this.selectedClass = cellView;
    this.classMenuService.classSelection(cellView.model);
    this.ciao = false;
  }


  zoomIn(){
    this.xAx+=(0.05);
    this.xAx+=(0.05);
    this.paper.scale(this.xAx,this.xAx);
  }

  zoomOut(){
    this.xAx-=(0.05);
    this.xAx-=(0.05);
    this.paper.scale(this.xAx,this.xAx);
  }
}
