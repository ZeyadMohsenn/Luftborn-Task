import { computed, effect, Injectable, signal, untracked } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeLanguageService {
  isLanguageChanged = signal(false);
  private currentLangSignal = signal<'en' | 'ar'>('en');
  currentLang = this.currentLangSignal.asReadonly();
  isArabic = computed(() => {
    const result = this.currentLangSignal() === 'ar';
    return result;
  });

  constructor() {
    effect(() => {
      const currentLang = localStorage.getItem('selectedLanguage') as 'ar' | 'en' | undefined;
      const lang = this.currentLangSignal();
      untracked(() => {
        if (currentLang && currentLang != lang) {
          this.currentLangSignal.set(currentLang);
        }
      });
    });
  }

  changeLanguage(lang: 'en' | 'ar') {
    localStorage.setItem('selectedLanguage', lang);
    this.currentLangSignal.set(lang);
  }
}
