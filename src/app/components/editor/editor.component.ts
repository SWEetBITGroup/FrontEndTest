import { Component, OnInit , AfterViewInit } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { ClassMenuService } from './services/class-menu.service';

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
  ciao : boolean;

  selectedClass: any;

  constructor(private classMenuService: ClassMenuService) {
    this.selectedClass = null;
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

    // DA RIMUOVERE: crea una shape classe UML
    let class1 = new joint.shapes.uml.Class({
      position: { x: 50, y: 30 },
      size: { width: 300, height: 100 },
      name: ['Class1'],
      attributes: ['attributeOne: String'],
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
      this.selectedClass.unhighlight();
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

  // onResize(resize){
  //   this.paper.setDimensions($('#paper').width(),$('#paper').height());
  //   // this.paper.scaleContentToFit({minScaleX: 0.3, minScaleY: 0.3, maxScaleX: 1 , maxScaleY: 1});
  // }

}
