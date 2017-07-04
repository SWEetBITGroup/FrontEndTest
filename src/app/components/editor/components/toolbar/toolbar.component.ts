import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * Method add class to editor
   */
  addClasse() {}

  /**
   * Method add interface to editor
   */
  addInterfaccia() {}

  /**
   * Method add abstract class to editor
   */
  addAstratta() {}

  /**
   * Method selects association as connector
   */
  addAssociazione() {}

  /**
   * Method selects implementation as connector
   */
  addImplementazione() {}

  /**
   * Method selects generalization as connector
   */
  addGeneralizzazione() {}

  /**
   * Method add comment cell to editor
   */
  addCommento() {}

  /**
   * Method add selected connector to editor if target element is selected, else the method selects the source element
   * @param cellView 
   * Source or target element
   */
  addConnettore(cellView: any) {}

}
