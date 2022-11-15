import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',
 
})
export class CaptureGoalsComponent implements OnInit {


  ngOnInit(): void {

    
  }

constructor( public modalRef: MdbModalRef<CaptureGoalsComponent>,) {
 

}

close() {
  this.modalRef.close();
}


}
