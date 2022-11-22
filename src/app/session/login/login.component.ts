import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { MessageService } from '../../@pages/components/message/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FuncService } from '../../func.service';
import Swal from 'sweetalert2';
declare const NodesJs: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //Sample Varriables
  userName;
  password;
  remember_me: any;
  _loadingvideo: boolean = false;
  constructor(
    private api: ApiService,
    public myFunc: FuncService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    const checkStatusLogin = localStorage.getItem('ad_name');
    if (checkStatusLogin) this.router.navigate(['home/forms/mission']);
  }

  ngOnInit() {
    setTimeout(() => {
      this._loadingvideo = true;
    }, 4000);

    const nodesjs = new NodesJs({
      id: 'nodes',
      width: window.innerWidth,
      height: window.innerHeight,
      particleSize: 2,
      lineSize: 1,
      particleColor: [255, 255, 255, 0.3],
      lineColor: [255, 255, 255],
      backgroundFrom: [10, 25, 100],
      backgroundTo: [10, 25, 100],
      backgroundDuration: 3000,
      nobg: false,
      // eslint-disable-next-line id-blacklist
      number: window.hasOwnProperty('orientation') ? 50 : 50,
      speed: 20,
      pointerCircleRadius: 100,
    });

    var system_expires = localStorage.getItem('system_expires');
    if (system_expires) {
      let local_remember = JSON.parse(atob(system_expires));
      this.userName = local_remember.username;
      this.password = local_remember.password;
      this.remember_me = 1;
    }
  }

  async login(username, password) {
    let remember = this.remember_me ? this.remember_me : null;
    let params = {
      username: username,
      password: password,
    };
    this.spinner.show();
    await this.myFunc.delayLoading(2000);
    this.api.login(params).subscribe(
      (res) => {
        this.spinner.hide();
        if (res && res.status === 200) {
          if (remember) {
            localStorage.setItem(
              'system_expires',
              btoa(JSON.stringify(params))
            );
          } else {
            localStorage.removeItem('system_expires');
          }
          this.setSession(res.body);
          this.router.navigate(['home/forms/mission']);
        } else {
          this.myFunc.notificationFail('Username หรือ Password ไม่ถูกต้อง');
        }
      },
      (error) => {
        this.spinner.hide();
        // this.myFunc.notificationFail('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }
  
  private setSession(authResult) {
    let time = this.remember_me ? 7 : 3;
    const expiresAt = moment().add(time, 'days');
    localStorage.setItem('social_token', authResult.token);
    localStorage.setItem('ad_name', authResult.username);
    localStorage.setItem('display_name', authResult.display_name);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
