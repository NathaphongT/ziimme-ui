import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { RootLayout } from '../root/root.component';
import { pagesToggleService } from '../../services/toggler.service';
import { ApiService } from '../../../api.service';
import { FuncService } from '../../../func.service';

@Component({
  selector: 'simplywhite-layout',
  templateUrl: './simplywhite.component.html',
  styleUrls: ['./simplywhite.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SimplyWhiteLayout extends RootLayout implements OnInit {
  @ViewChild('basicSearch', { static: true }) basicSearch: ElementRef;
  menuLinks = [
    {
      label: 'ข้อมูลพนักงาน',
      icon: '',
      submenu: [
        {
          label: 'รายชื่อพนักงาน',
          routerLink: 'forms/employee',
        },
      ],
    },
    {
      label: 'ข้อมูลลูกค้า',
      icon: '',
      submenu: [
        {
          label: 'รายชื่อลูกค้า',
          routerLink: 'forms/user',
        },
      ],
    },
    {
      label: 'จัดการสิทธิ์ผู้ใช้งาน',
      routerLink: 'forms/access',
      icon: '9-permission.png',
    },
    // {
    //   label: 'ข้อมูลพื้นฐาน',
    //   icon: '4-data-suspect.png',
    //   submenu: [
    //     {
    //       label: 'ประเภทสมาชิก',
    //       routerLink: 'forms/basic',
    //     },
    //   ],
    // },
    {
      label: 'ออกจากระบบ',
      reloadPage: 'logout',
      icon: 'logout.png',
    },
  ];
  basicRows = [];

  constructor(
    public toggler: pagesToggleService,
    public router: Router,
    private api: ApiService,
    public myFunc: FuncService
  ) {
    super(toggler, router);
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        var root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data) {
            this.menuLinks.forEach((mainMenu) => {
              mainMenu['toggle'] = 'close';
              if (!mainMenu.hasOwnProperty('submenu')) {
                if (event.url.indexOf(mainMenu.routerLink) > 0) {
                  mainMenu['toggle'] = 'open';
                } else {
                  mainMenu['toggle'] = 'close';
                }
              } else {
                mainMenu.submenu.forEach((subMenu: any) => {
                  if (event.url.indexOf(subMenu.routerLink) > 0) {
                    mainMenu['toggle'] = 'open';
                    subMenu.toggle = 'open';
                  } else {
                    subMenu.toggle = 'close';
                  }
                });
              }
            });
            break;
          } else {
            break;
          }
        }
      }
    });
  }

  ngOnInit() {
    this.changeLayout('menu-pin');
    this.autoHideMenuPin();
  }
}
