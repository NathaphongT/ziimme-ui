// Angular Dependencies
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { locale } from 'moment';
// Router
import { FormsRoutes } from './forms.routing';

// Core Pages Layout Components
import { SharedModule } from '../@pages/components/shared.module';

// Bootstrap Components by ngx-bootstrap
import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TypeaheadModule } from 'ngx-bootstrap';

// Pages Components by ace
import { pgSelectModule } from '../@pages/components/select/select.module';
import { pgTagModule } from '../@pages/components/tag/tag.module';
import { pgTimePickerModule } from '../@pages/components/time-picker/timepicker.module';
import { pgTabsModule } from '../@pages/components/tabs/tabs.module';
import { pgSelectfx } from '../@pages/components/cs-select/select.module';
import { pgDatePickerModule } from '../@pages/components/datepicker/datepicker.module';
import { pgUploadModule } from '../@pages/components/upload/upload.module';

// Thirdparty components
import { TextMaskModule } from 'angular2-text-mask';
import { QuillModule } from 'ngx-quill';

// pik datable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgxSpinnerService } from 'ngx-spinner';
//Loading
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProgressModule } from '../@pages/components/progress/progress.module';
import { FuncService } from '../func.service';
import { pgCardModule } from '../@pages/components/card/card.module';
import { pgCardSocialModule } from '../@pages/components/card-social/card-social.module';
import { NvD3Module } from 'ngx-nvd3';
import { NgxEchartsModule } from 'ngx-echarts';
import { IsotopeModule } from 'ngx-isotope';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { ScrollToTopComponent } from '../components/scroll-to-top/scroll-to-top.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReadMoreComponent } from '../read-more/read-more.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { HighchartsChartModule } from 'highcharts-angular';
// import { NgxHighlightWordsModule } from 'ngx-highlight-words';

import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';

// Devextreme
import {
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFormModule,
  DxMultiViewModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxTemplateModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { DxiItemModule } from 'devextreme-angular/ui/nested';
import { FormUserComponent } from './form-user/form-user.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { FormAccessComponent } from './form-access/form-access.component';

@NgModule({
  imports: [
    // NgxHighlightWordsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(FormsRoutes),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    pgSelectModule,
    pgTagModule,
    TextMaskModule,
    pgTimePickerModule,
    pgTabsModule,
    pgSelectfx,
    pgUploadModule,
    TypeaheadModule.forRoot(),
    pgDatePickerModule,
    QuillModule.forRoot(),
    NgxDatatableModule,
    ModalModule,
    NgxSpinnerModule,
    ProgressModule,
    pgCardModule,
    pgCardSocialModule,
    NvD3Module,
    NgxEchartsModule,
    IsotopeModule,
    TagCloudModule,
    InfiniteScrollModule,
    NgMultiSelectDropDownModule.forRoot(),
    HighchartsChartModule,
    NgxPaginationModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxMultiViewModule,
    DxFormModule,
    DxTemplateModule,
    DxiItemModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTagBoxModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ReadMoreComponent,
    ScrollToTopComponent,
    PaginationComponent,
    FormUserComponent,
    FormEmployeeComponent,
    FormAccessComponent,
  ],
  providers: [NgxSpinnerService, FuncService, DatePipe],
})
export class FormsPageModule {
  constructor() {
    // Set locale
    locale('th-TH');
  }
}
