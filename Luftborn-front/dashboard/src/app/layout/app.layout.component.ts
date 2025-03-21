import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from './service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopBarComponent } from './app.topbar.component';
@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html',
  styleUrls: ['./app.layout.component.scss']
})
export class AppLayoutComponent implements OnDestroy {
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      if (!this.menuOutsideClickListener) {
        this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
          if (this.appSidebar.el) {
            const isOutsideClicked = !(
              this.appSidebar.el.nativeElement.isSameNode(event.target) ||
              this.appSidebar.el.nativeElement.contains(event.target) ||
              this.appTopbar.menuButton.nativeElement.isSameNode(event.target) ||
              this.appTopbar.menuButton.nativeElement.contains(event.target)
            );

            if (isOutsideClicked) {
              this.hideMenu();
            }
          }
        });
      }

      if (!this.profileMenuOutsideClickListener) {
        this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
          if (this.appTopbar.menu) {
            const isOutsideClicked = !(
              this.appTopbar.menu.nativeElement.isSameNode(event.target) ||
              this.appTopbar.menu.nativeElement.contains(event.target) ||
              this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) ||
              this.appTopbar.topbarMenuButton.nativeElement.contains(event.target)
            );
            if (isOutsideClicked) {
              this.hideProfileMenu();
            }
          }
        });
      }

      if (this.layoutService.state.staticMenuMobileActive) {
        this.blockBodyScroll();
      }
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.hideMenu();
      this.hideProfileMenu();
    });
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' '
      );
    }
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config().colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }



  routes: { router?: string; label?: string }[] = [];

  // ngOnInit(): void {
  //   this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       this.updateRoutesBasedOnUrl();
  //     });

  //   this.updateRoutesBasedOnUrl();
  // }

  // private async updateRoutesBasedOnUrl(): Promise<void> {
  //   const urlSegments = this.router.url.split('/').filter(Boolean);
    
  //   if (urlSegments.length <= 1) {
  //     // this.routes = this.getMainRoutes();
  //     this.routes = [];
  //   } else {
  //     this.routes = await this.getChildRoutes(urlSegments[0], urlSegments[1] , urlSegments[2]);
  //   }
  // }

  // private getMainRoutes(): { router: string; label?: string }[] {
  //   const mainRoute = MainRoutes.find((route) => route.children);
  //   if (!mainRoute || !mainRoute.children) return [];

  //   return mainRoute.children.map((child) => ({
  //     router: child.path!,
  //     label: child.data?.['breadcrumb'] || null,
  //   }));
  // }

  // private async getChildRoutes(parentPath: string, childPath: string, next: string): Promise<{ router?: string; label?: string }[]> {
  //   const mainRoute = MainRoutes.find((route) => route.children);
  //   if (!mainRoute || !mainRoute.children) return [];
  //   const childRoute = mainRoute.children.find((child) => child.path === parentPath);
  //   if (childRoute && childRoute.loadChildren) {
  //     try {
  //       const moduleOrRoutes = await childRoute.loadChildren();
  //       const childRoutes = (moduleOrRoutes as any) || [];
  //       let routesWithParent: object[] = [];
  //       routesWithParent = [
  //         {
  //           router: childRoute.path!,
  //           label: childRoute.data?.['breadcrumb'] || null,
  //         },
  //       ];
  //       if(childPath != "add" && childPath != "edit"){
  //         routesWithParent.push(
  //           ...childRoutes.map((child: any) => ({
  //             router: child.path!,
  //             label: child.data?.['breadcrumb'] || null,
  //           }))
  //         )
  //       }
  //       else if(+next == 0){
  //         routesWithParent.push({
  //           label: "create"
  //         })
  //       }
  //       else{
  //         routesWithParent.push({
  //           label: 'edit'
  //         })
  //       }

  //       return routesWithParent;
  //     } catch (error) {
  //       console.error('Error loading child routes:', error);
  //     }
  //   }
  //   return [];
  // }



  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.routes = this.getBreadcrumbs(this.activatedRoute.root);
    });

    this.routes = this.getBreadcrumbs(this.activatedRoute.root);
    console.log(this.routes);
  }

  private getBreadcrumbs(route: ActivatedRoute, path: string = '', breadcrumbs: { router?: string; label?: string }[] = []): any[] {
    let children: ActivatedRoute[] = route.children;
    let activeChild = children.find(
      (child) => child.outlet === 'primary' && child.snapshot.url.length >= 0
    );
  
    if (activeChild) {
      const routeURL: string = activeChild.snapshot.url.map(segment => segment.path).join('/');
      const newPath = routeURL ? `${path}/${routeURL}` : path;
      if (activeChild.snapshot.data['breadcrumb'] && !breadcrumbs.some(bc => bc.router === newPath)) {
        breadcrumbs.push({
          router: newPath,
          label: activeChild.snapshot.data['breadcrumb'],
        });
      }
  
      return this.getBreadcrumbs(activeChild, newPath, breadcrumbs);
    }
  
    return breadcrumbs;
  }

}
