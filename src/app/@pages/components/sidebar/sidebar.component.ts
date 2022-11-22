import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
  Inject,
  forwardRef,
  Input,
  ViewChild,
  TemplateRef,
  ContentChild,
  HostListener,
  HostBinding
} from '@angular/core';
import { Subscription } from 'rxjs';
import { pagesToggleService } from '../../services/toggler.service';
declare var pg: any;

@Component({
  selector: 'pg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    class: 'page-sidebar'
  },
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  pin: boolean = false;
  drawer: boolean = false;
  sidebar;
  timer;
  @HostBinding('style.transform')
  style: string;
  user_name = '';
  display_name = '';
  icon_toggle = 'fa-angle-left';

  private sideBarWidth = 280;
  private sideBarWidthCondensed = 280 - 70;

  @ContentChild('sideBarOverlay', { static: true }) sideBarOverlay: TemplateRef<void>;
  @ContentChild('sideBarHeader', { static: true }) sideBarHeader: TemplateRef<void>;
  @ContentChild('menuItems', { static: true }) menuItems: TemplateRef<void>;

  constructor(private appSidebar: ElementRef, private toggler: pagesToggleService) {
    this.subscriptions.push(
      this.toggler.sideBarToggle.subscribe(toggle => {
        this.toggleMobile(toggle);
      })
    );
    this.subscriptions.push(
      this.toggler.pageContainerHover.subscribe(message => {
        this.closeSideBar();
      })
    );
    this.subscriptions.push(
      this.toggler.menuDrawer.subscribe(message => {
        this.toggleDrawer();
      })
    );
    this.mobileSidebar = false;
  }

  ngOnInit() {
    this.user_name = localStorage.getItem('ad_name') ? localStorage.getItem('ad_name').toUpperCase() : '';
    this.display_name = localStorage.getItem('display_name') ? localStorage.getItem('display_name').toUpperCase() : '';
  }
  
  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    clearTimeout(this.timer);
  }
  @HostBinding('class.visible') mobileSidebar: boolean;

  @HostListener('mouseenter', ['$event'])
  @HostListener('click', ['$event'])
  openSideBar() {
    if (pg.isVisibleSm() || pg.isVisibleXs()) {
        return false;
    }
    if (this.pin) {
        return false;
    }

    // this.style = 'translate3d(' + this.sideBarWidthCondensed + 'px, 0,0)';
    // pg.addClass(document.body, 'sidebar-visible');
  }

  closeSideBar() {
    if (pg.isVisibleSm() || pg.isVisibleXs()) {
        return false;
    }
    if (this.pin) {
        return false;
    }
    this.style = 'translate3d(0,0,0)';
    pg.removeClass(document.body, 'sidebar-visible');
    this.drawer = false;
  }

  toggleMenuPin() {
    if (this.pin) {
        this.pin = false;
    } else {
        this.pin = true;
    }
  }

  toggleDrawer() {
    if (this.drawer) {
        this.drawer = false;
    } else {
        this.drawer = true;
    }
  }

  toggleMobile(toggle: boolean) {
    clearTimeout(this.timer);
    if (toggle) {
      this.mobileSidebar = toggle;
    } else {
      this.timer = setTimeout(() => {
        this.mobileSidebar = toggle;
      }, 400);
    }
  }

  /**
   * @description Toggle menu button from sidebar show only on desktop
   */
  toggleMenu(){
    let body = document.body;
    if (body.classList.contains('menu-pin')) {
      body.classList.remove('menu-pin')
      body.classList.add('menu-unpinned')
      this.icon_toggle = 'fa-angle-right';
    }else{
      body.classList.add('menu-pin')
      body.classList.remove('menu-unpinned')
      this.icon_toggle = 'fa-angle-left';
    }

    // Force click on toggle button (By default, the toggle menu is viewable on tablets and below.)
    let toggleSideMenu = document.getElementById("side-menu");
    toggleSideMenu.click();
  }
}