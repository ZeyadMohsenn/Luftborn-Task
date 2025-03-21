import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AppConfig, LayoutService } from './layout/service/app.layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Real Estate Marketer';

  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutService: LayoutService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true; //enables core ripple functionality
    // this.translateService.setDefaultLang('ar');

    //optional configuration with the default configuration
    const config: AppConfig = {
      ripple: false, //toggles ripple on and off
      inputStyle: 'outlined', //default style for input elements
      menuMode: 'static', //layout mode of the menu, valid values are "static" and "overlay"
      colorScheme: 'light', //color scheme of the template, valid values are "light" and "dark"
      theme: 'lara-light-indigo', //default component theme for PrimeNG
      scale: 16, //size of the body font size to scale the whole application
    };
    this.layoutService.config.set(config);
  }
  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }
}

