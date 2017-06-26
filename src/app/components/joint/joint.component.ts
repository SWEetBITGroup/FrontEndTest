import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';

@Component({
  selector: 'app-joint',
  templateUrl: './joint.component.html',
  styleUrls: ['./joint.component.css']
})

export class JointComponent implements OnInit {
graph: any;
paper: any;

  constructor() {

  }

  ngOnInit() {
    this.graph = new joint.dia.Graph;
    this.paper = new joint.dia.Paper({
      el: $("#paper"),
      model: this.graph,
      gridSize: 1
    });
    let rect = new joint.shapes.basic.Rect({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 30 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });
    let rect2 = new joint.shapes.basic.Rect({
      position: { x: 100, y: 100 },
      size: { width: 100, height: 30 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });
    // rect2.translate(300);
    let link = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: rect2.id }
    });
    this.graph.addCells([rect, rect2, link]);

    let graph2 = new joint.dia.Graph;
    let paper2 = new joint.dia.Paper({
      el: $("#paper2"),
      width: 100,
      height: 100,
      model: graph2,
    });
    let rect3 = new joint.shapes.basic.Rect({
      size: { width: 50, height: 30 },
      attrs: { rect: { fill: 'red' }, text: { text: 'prova', fill: 'white' } }
    });
    graph2.addCells([rect3]);
  }

  aggiungi() {
    let banana = new joint.shapes.basic.Rect({
      position: { x: 100, y: 100 },
      size: { width: 100, height: 30 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });
    this.graph.addCells([banana]);
  }
}

