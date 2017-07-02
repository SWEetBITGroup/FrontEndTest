import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class EditServiceService {

  private selectedGraphService = new Subject<any>();

  selectedGrapg$ = this.selectedGraphService.asObservable();

  zoomIn(){
    this.selectedGraphService.next('+');
  }

  zoomOut(){
    this.selectedGraphService.next('-');
  }

  constructor() { }

}
