import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ExcelService } from './excel-service.service';

@Injectable()
export class ReportingService {
  public logs: any[];

  constructor(private excelService: ExcelService) {
    this.logs = [];
  }

  addAuditLog(message) {
    const currentTime = moment().format('DD.MM.YYYY hh:mm');
    const log = {time: currentTime, message: `${message}`};
    console.log(log);
    this.logs.push(log);
  }

  exportAuditHistory() {
    const today = moment().format('MM-DD-YY');
    console.log('printing logs: ', this.logs);
    this.excelService.exportAsExcelFile(this.logs, `logs_${today}`);
  }
}
