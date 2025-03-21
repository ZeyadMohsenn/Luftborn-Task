import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppLayoutComponent } from './app.layout.component';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { MenuModule } from 'primeng/menu';
import { TranslateModule } from '@ngx-translate/core';
import { CustomBreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';

@NgModule({
  declarations: [AppMenuitemComponent, AppTopBarComponent, AppMenuComponent, AppSidebarComponent, AppLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    SidebarModule,
    RouterModule,
    BreadcrumbComponent,
    CustomBreadcrumbComponent,
    BreadcrumbItemDirective,
    MenuModule,
    TranslateModule,
    LoaderComponent,
  ],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
