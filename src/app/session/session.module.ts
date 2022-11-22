import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionRoute } from './session.routing';

import { SharedModule } from '../@pages/components/shared.module';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { RegisterPageComponent } from './register/register.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ProgressModule } from '../@pages/components/progress/progress.module';
import { FuncService } from '../func.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(SessionRoute),
    NgxSpinnerModule,
    ProgressModule],
  declarations: [ErrorComponent, LoginComponent, LockscreenComponent, RegisterPageComponent],
  providers: [NgxSpinnerService, FuncService]
})
export class SessionModule { }
