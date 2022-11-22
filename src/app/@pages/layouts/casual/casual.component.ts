import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RootLayout } from '../root/root.component';
declare var pg: any;
@Component({
  selector: 'casual-layout',
  templateUrl: './casual.component.html',
  styleUrls: ['./casual.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CasualLayout extends RootLayout implements OnInit {

  menuItems = [
    // {
    //   label: 'Dashboard',
    //   // details: '12 New Updates',
    //   routerLink: 'dashboard',
    //   iconType: 'fi',
    //   iconName: 'shield'
    // },
    {
      label: 'Data Source',
      routerLink: 'forms/sources',
      iconType: 'letter',
      iconName: 'ds'
    },
    {
      label: 'Monitor Alerts',
      routerLink: 'forms/monitor',
      iconType: 'letter',
      iconName: 'ma'
    },
    {
      label: 'Topic',
      routerLink: 'forms/topic',
      iconType: 'letter',
      iconName: 'tp'
    },
    {
      label: 'Schedule',
      routerLink: 'forms/schedule',
      iconType: 'letter',
      iconName: 'sc'
    },
    {
      label: 'Data List',
      routerLink: 'forms/list',
      iconType: 'letter',
      iconName: 'dl'
    },
    {
      label: 'Manage',
      // routerLink: 'forms/manage',
      iconType: 'letter',
      iconName: 'mu',
      submenu: [
        {
          label: 'Manage User',
          routerLink: 'forms/user',
          iconType: 'letter',
          iconName: 'dl'
        },
        {
          label: 'Manage Data Source',
          routerLink: 'forms/manage',
          iconType: 'letter',
          iconName: 'sl'
        }
      ]
    }
  ];
  user_name = '';
  ngOnInit() {
    this.changeLayout('menu-pin');
    this.autoHideMenuPin();
    pg.isHorizontalLayout = true;
    this.changeLayout('horizontal-menu');
    this.changeLayout('horizontal-app-menu');
    this.user_name = localStorage.getItem('ad_name') ? localStorage.getItem('ad_name').toUpperCase() : '';
  }
  logout() {
    localStorage.clear();
  }
  // ngOnInit() {
  //   pg.isHorizontalLayout = true;
  //   this.changeLayout('horizontal-menu');
  //   this.changeLayout('horizontal-app-menu');
  // }
}
