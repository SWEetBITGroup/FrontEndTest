import { Component, OnInit } from '@angular/core';
import {EditorComponent} from './editor/editor.component';
import {ToolBarComponent} from './tool-bar/tool-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  a: any;
  b: any;

constructor(){}
  ngOnInit(){

  }

}
