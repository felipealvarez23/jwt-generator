import { Component, VERSION, ViewChild } from '@angular/core';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { sign } from 'jsonwebtoken';
import { from } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public editorOptions: JsonEditorOptions;
  public initialData: any;
  public visibleData: any;
  public privateKey = '';

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.initialData = {
      iat: 1648075435,
      meta: {
        messageId: '31211565-6905-3cb3-8d27-3fea93c27b1d',
        requestDate: 20150625200000,
        systemId: 'AW78461',
        usrMod: 'BIZAGI',
        version: 1,
        responseUrl: '',
        urlCancel: '',
      },
      start: {
        productId: '8',
        subProductCategory: '8001',
        channelId: '002',
        businessLineId: '002',
      },
    };
    this.visibleData = this.initialData;
  }

  showJson(d: Event): void {
    this.visibleData = d;
  }

  generateJwt(): void {
    console.log(
      sign(this.initialData, this.privateKey, {
        expiresIn: '500s',
        algorithm: 'RS256',
      })
    );
  }
}
