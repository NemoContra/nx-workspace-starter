import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Config, initConfig, Language } from './config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private _config = initConfig;

  get config(): Config {
    return { ...this._config };
  }

  loadConfig() {
    this.http.get<Config>('./assets/config.json').subscribe((config) => {
      this._config = config;
    });
  }

  setLanguage(language: Language): void {
    this._config.language = language;
  }

  getLanguage(): Language {
    return this._config.language;
  }
}
