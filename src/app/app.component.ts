import { Component, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { from } from 'rxjs';
import { env } from './core/model/app.config';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public editorOptions: JsonEditorOptions;
  public initialData: any;
  public visibleData: any;
  public form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.buildForm();
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.initialData = {
      iat: 1648075435,
      meta: {
        messageId: 'Este campo se genera automaticamente',
        requestDate: 20150625200000,
        systemId: 'AW78461',
        usrMod: 'BIZAGI',
        version: 1,
        responseUrl: 'https://www.google.com/',
        urlCancel: 'https://www.facebook.com/',
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

  buildForm(): void {
    this.form = this.fb.group({
      privateKey: ['', []],
      env: ['local'],
    });
  }

  showJson(d: Event): void {
    this.visibleData = d;
  }

  generateJwt(): void {
    const privateKey = this.form.get('privateKey').value;
    const envSelected = this.form.get('env').value;
    const envUrl = this.getUrl(envSelected);

    this.initialData.meta.messageId = uuid();
    const token = sign(this.initialData, privateKey, {
      expiresIn: '365d',
      algorithm: 'RS256',
    });
    window.open(`${envUrl}/?t=${token}&aw=AW`, '_blank');
  }

  private getUrl(envName: string) {
    return env.find((envData) => envData.name === envName).url;
  }
}
