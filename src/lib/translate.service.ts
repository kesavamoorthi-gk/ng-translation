import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslatePackageService {

  constructor(private translateService: TranslateService) { }

  getTranslation(lang: string, path: string): Promise<void> {
    return lastValueFrom(this.translateService.getTranslation(lang))
      .catch(() => lastValueFrom(this.translateService.use(lang)))
      .then(() => this.translateService.setTranslation(lang, {}))
      .then(() => this.translateService.use(lang))
      .then(() => lastValueFrom(this.translateService.getTranslation(path)));
  }

  useLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  async translate(key: string) {
    try {
      const translation = await this.translateService.get(key).toPromise();
      return translation;
    } catch (err) {
      return key;
    }
  }
  
}
