import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, Observable, tap, catchError, EMPTY, timer, of, shareReplay } from "rxjs";
import { AuthAPI, TokenDto } from "../../core/services/REM-api-service";
import { LoginForWebDto } from "../models/auth.model";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authApi: AuthAPI,
    private router: Router
  ) {}

  private refreshSubscription?: Subscription;
  private refreshToken$?: Observable<any>;
  refreshInProgress = false;
  private expirationDateCache: Date | null = null;

  #currentUser$ = signal<TokenDto | null>(this.#currentUser ? JSON.parse(this.#currentUser) : null);

  get #currentUser() {
    return localStorage.getItem('currentUser');
  }

  get user() {
    return this.#currentUser$.asReadonly();
  }

  get expirationDate(): Date | null {
    if (this.expirationDateCache) {
      return this.expirationDateCache;
    }

    const user = this.user();
    if (user?.expires) {
      this.expirationDateCache = new Date(user.expires);
      return this.expirationDateCache;
    }
    return null;
  }

  login(credential: LoginForWebDto) {
    return this.authApi.loginAdmin(credential).pipe(
      tap(res => {
        if (!res.succeeded) return;

        const tokenData = res.data;
        if (tokenData) {
          this.storeTokenData(tokenData);
          this.scheduleTokenRefresh(new Date(tokenData.expires));
        }
      }),
      catchError(err => {
        return EMPTY;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.#currentUser$.set(null);
    this.cancelTokenRefresh();
    this.router.navigate(['/login']);
  }

  private storeTokenData(token: TokenDto) {
    localStorage.setItem('currentUser', JSON.stringify(token));
    this.#currentUser$.set(token);
    this.expirationDateCache = new Date(token.expires);
  }

  private scheduleTokenRefresh(expiration: Date) {
    this.cancelTokenRefresh();

    const now = new Date().getTime();
    const expirationTime = expiration.getTime();

    const nowInMinutes = Math.floor(now / 60000);
    const expirationInMinutes = Math.floor(expirationTime / 60000);

    const delayInMinutes = expirationInMinutes - nowInMinutes;

    console.log('Expiration in minutes:', expirationInMinutes);
    console.log('Now in minutes:', nowInMinutes);
    console.log('Now in ms:', now);
    console.log('Expiration in ms:', expirationTime);
    console.log('Delay in minutes:', delayInMinutes);

    const delayInMilliseconds = delayInMinutes * 60000;
    console.log('Delay in ms:', delayInMilliseconds);

    if (delayInMilliseconds > 0) {
      this.refreshSubscription = timer(delayInMilliseconds).subscribe(() => {
        this.refreshToken().subscribe();
        console.log('Token refresh triggered');
      });
    }
  }

  public refreshToken() {
    if (this.refreshToken$) {
      return this.refreshToken$;
    }

    const refreshToken = this.user()?.refreshToken;
    if (!refreshToken) {
      this.logout();
      return of(null);
    }

    this.refreshInProgress = true;

    this.refreshToken$ = this.authApi.refreshToken({ refreshToken }).pipe(
      tap(res => {
        this.refreshInProgress = false;
        this.refreshToken$ = undefined;

        if (res.succeeded && res.data) {
          this.storeTokenData(res.data);
          this.scheduleTokenRefresh(new Date(res.data.expires));
        } else {
          this.logout();
        }
      }),
      catchError(err => {
        this.refreshInProgress = false;
        this.refreshToken$ = undefined;

        if (err.status === 401) {
          console.error('Refresh token expired or invalid');
          this.logout();
        }

        return of(null);
      }),
      shareReplay(1)
    );

    return this.refreshToken$;
  }

  private cancelTokenRefresh() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = undefined;
    }
  }
}
