import { Injectable } from '@angular/core';
import { FuncModule } from './func.module';
import { MessageService } from './@pages/components/message/message.service';

@Injectable({
  providedIn: FuncModule,
})
export class FuncService {
  constructor(private _notification: MessageService) {}
  delayLoading(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, timeout);
    });
  }
  convertDatetoThai(datetime) {
    if (datetime && datetime != '-') {
      return new Date(datetime).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else {
      return '-';
    }
  }
  convertDateTimetoThai(datetime) {
    if (datetime && datetime != '-') {
      return new Date(datetime).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    } else {
      return '-';
    }
  }

  convertTime(datetime) {
    if (datetime && datetime != '-') {
      // return new Date(parseInt(datetime)).getHours() + ':' + (new Date(parseInt(datetime)).getMinutes());
      return (
        new Date(parseInt(datetime)).getHours() +
        ':' +
        (new Date(parseInt(datetime)).getMinutes() < 10 ? '0' : '') +
        new Date(parseInt(datetime)).getMinutes()
      );
    } else {
      return '--:--';
    }
  }

  notificationFail(massage) {
    this._notification.create('error', massage, {
      Position: 'bottom-right',
      Style: 'bar',
      Duration: 2500,
    });
  }
}
