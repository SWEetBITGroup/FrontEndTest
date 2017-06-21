import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import {EditorComponent} from '../editor/editor.component';

export class MenuItem {
    name: string;
    path: string;
}

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  @Output() zoomIn = new EventEmitter<void>();

  doZoomIn(){
    this.zoomIn.emit();
  }
}
