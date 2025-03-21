import { Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/services/auth.service';
import { ChangeLanguageService } from '../shared/services/change-language.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];
  #router = inject(Router);

  @ViewChild('menuButton') menuButton!: ElementRef;

  @ViewChild('topbarMenuButton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarMenu') menu!: ElementRef;
  #authService = inject(AuthService);
  #ChangeLanguageService = inject(ChangeLanguageService);

  constructor(
    public layoutService: LayoutService,
    public TranslateService: TranslateService,
    private changeLanguageService: ChangeLanguageService
  ) {}

  currentLang = computed(() => this.changeLanguageService.currentLang());

  ngOnInit() {
    const savedLang = localStorage.getItem('selectedLanguage') as 'ar' | 'en' | undefined;
    if (savedLang) {
      this.changeLanguage(savedLang);
    } else {
      this.changeLanguage('en');
    }
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        },
      },
    ];
  }
  logout() {
    this.#authService.logout();
    this.#router.navigate(['/login']);
  }

  changeLanguage(lang: 'ar' | 'en') {
    // if (lang == 'ar') {
    //   this.changeLanguageService.isLanguageChanged.set(false);

    // } else {
    //   this.changeLanguageService.isLanguageChanged.set(true);
    // }
    this.changeLanguageService.changeLanguage(lang);

    this.TranslateService.use(lang);
    // localStorage.setItem('selectedLanguage', lang);
    // this.currentLang = signal(lang);
    this.layoutService.changeDirection(lang);
  }
}
