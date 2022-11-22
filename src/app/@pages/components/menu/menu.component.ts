import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../../api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'pg-menu-items',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('toggleHeight', [
      state(
        'close',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          height: '*',
          // overflow: 'hidden',
        })
      ),
      transition('close => open', animate('140ms ease-in')),
      transition('open => close', animate('140ms ease-out')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit, AfterViewInit {
  menuItems = [];
  currentItem = null;
  isPerfectScrollbarDisabled = false;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.togglePerfectScrollbar();
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.togglePerfectScrollbar();
  }

  togglePerfectScrollbar() {
    this.isPerfectScrollbarDisabled = window.innerWidth < 1025;
  }

  @Input()
  set Items(value) {
    this.menuItems = value;
  }

  toggleNavigationSub(event, item) {
    event.preventDefault();
    if (this.currentItem && this.currentItem !== item) {
      this.currentItem['toggle'] = 'close';
    }
    this.currentItem = item;
    item.toggle = item.toggle === 'close' ? 'open' : 'close';
    if (item.reloadPage === 'logout') {
      this.logout();
    }
  }

  logout() {
    this.api.postLogout().subscribe(
      (res) => {
        if (res && res.status === 200) {
          this.router.navigate(['home/session/login']);
          var system_expires = localStorage.getItem('system_expires');
          localStorage.clear();
          localStorage.setItem('system_expires', system_expires);
          window.location.reload();
          console.log('logout success');
        } else {
          console.log('logout error1');
          this.router.navigate(['home/session/login']);
          var system_expires = localStorage.getItem('system_expires');
          localStorage.clear();
          localStorage.setItem('system_expires', system_expires);
          window.location.reload();
        }
      },
      (error) => {
        console.log('logout error2');
        this.router.navigate(['home/session/login']);
        var system_expires = localStorage.getItem('system_expires');
        localStorage.clear();
        localStorage.setItem('system_expires', system_expires);
        window.location.reload();
      }
    );
  }
}
