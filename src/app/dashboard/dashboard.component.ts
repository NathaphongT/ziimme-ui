import Swal from 'sweetalert2';
import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation, TemplateRef, Type, NgZone, HostListener, Injectable } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../api.service';
import { DxDataGridComponent } from 'devextreme-angular';

interface GRID {
  AVATAR_DISPLAY_NAME? : any;
  AVATAR_FIRST_NAME? : any;
  AVATAR_ID? : any;
  AVATAR_LAST_NAME? : any;
  AVATAR_PICTURE? : any;
  AVATAR_PLATFORM_NAME? : any;
  FEED_TOTAL? : any;
  GROUP_TOTAL? : any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})


@Injectable()
export class DashboardComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;
  dashboradlist:any;
  userlist:GRID[];
  AVATA_TOTAL: any;
  GROUP_TOTAL: any;
  FEED_TOTAL?: any;
  
  constructor(private api: ApiService,) {
    this.userlist = [];
  }

  

  ngOnInit() {
    this.api.getDashborad().subscribe((res) => {
      if (res && res.status === 200) {
        console.log("t: ",typeof res.body);

        this.AVATA_TOTAL= res.body.AVATA_TOTAL;
        this.GROUP_TOTAL= res.body.GROUP_TOTAL;
        this.FEED_TOTAL= res.body.FEED_TOTAL;
        if(res.body.USER.length > 0){
          setTimeout(() => {
            this.userlist = res.body.USER
            console.log(res.body.USER);
          }, 500);


        }

      } else {
        Swal.fire({ icon: 'error', title: 'โหลดข้อมูลผิดพลาด', showConfirmButton: false, timer: 2000 });
      }
    }, error => {
      Swal.fire({ icon: 'error', title: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้', showConfirmButton: false, timer: 2000 });
    })
  }

}
