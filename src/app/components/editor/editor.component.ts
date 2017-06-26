import { Component, OnInit , AfterViewInit } from '@angular/core';
import { MaterialModule } from '@angular/material';

declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
  // host: {
  //   '(window:resize)': 'onResize($event)'
  // }
})

export class EditorComponent implements OnInit {
  graph: any;
  paper: any;

  constructor() { }

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

    var rect = new joint.shapes.basic.Rect({
    position: { x: 50, y: 70 },
    size: { width: 100, height: 40 }
});
this.graph.addCell(rect);
  }

  // onResize(resize){
  //   this.paper.setDimensions($('#paper').width(),$('#paper').height());
  //   // this.paper.scaleContentToFit({minScaleX: 0.3, minScaleY: 0.3, maxScaleX: 1 , maxScaleY: 1});
  // }

}
