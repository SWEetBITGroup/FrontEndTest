import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import * as $ from 'jquery';
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';
//import * as joint from '../joint.min.js'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  graph: any;
  graph2: any;
  paper: any;
  App: any;
  stencil: any;
  public yAx: number =0;
  public xAx: number =1;

  ngOnInit(){

    this.createGraph();
    this.paper.scale(this.xAx,this.yAx);
  }

  private download(text,name,type){
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
  }
  private createGraph() {

    this.graph = new joint.dia.Graph();

    this.paper = new joint.dia.Paper({
      el: $('.paper'),
      width: 1000,
      height: 1000,
      model: this.graph
    });

   let pro = new joint.shapes.uml.Class({
       position: { x: 200, y: 300 },
       size: { width: 160, height: 100 },
       name: ['prova'],
       attributes: ['+ speremo:int','+ speremo:int','+ speremo:int'],
       methods: [],
     });

     let pro2 = new joint.shapes.uml.Class({
         position: { x: 300, y: 400 },
         size: { width: 160, height: 100 },
         name: ['prova'],
         attributes: ['+ speremo:int','+ speremo:int','+ speremo:int'],
         methods: [],
       });

let list: any[] = [pro];
let list2: any[] = [pro2];

let aa = pro.clone();

    this.graph.addCells([list,list2,aa]);

    this.paper.scale(0,0);
  }

  saveProg(){
    var str = JSON.stringify(this.graph.toJSON());
    this.download(str,'text.txt','text/plain');
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
