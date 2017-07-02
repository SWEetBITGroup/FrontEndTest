import { Component } from '@angular/core';
import { EditServiceService } from './services/edit-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EditServiceService]
})
export class AppComponent {
    selectedGrapg: any;

    constructor(private myService: EditServiceService) {
      this.selectedGrapg = null;
    }   

}
