import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ClassMenuService {

  /**
   * The subject of the selected class
   */
  private selectedClassSource = new Subject<any>();

  /**
   * Observable of the selected class
   */
  selectedClass$ = this.selectedClassSource.asObservable();

  /**
   * Update the subject of the selected class
   * @param classe 
   */
  classSelection(classe: any) {
    this.selectedClassSource.next(classe);
  }

  constructor() { }

}
