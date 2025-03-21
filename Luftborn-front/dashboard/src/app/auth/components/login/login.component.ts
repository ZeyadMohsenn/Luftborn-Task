// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToasterService } from '@shared/services/toaster.service';
// import { ControlsOf } from '@shared/utility/controlsOf.type';
// import { LoginForWebDto } from 'app/auth/models/auth.model';
// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { ToastModule } from 'primeng/toast';
// import { AuthService } from '../../services/auth.service';
// import { ButtonComponent } from '@shared/components/button/button.component';
// import { InputComponent } from '@shared/components/input/input.component';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     InputTextModule,
//     ButtonModule,
//     CommonModule,
//     ReactiveFormsModule,
//     ToastModule,
//     ButtonComponent,
//     InputComponent,
//   ],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class LoginComponent {
//   loginForm: ControlsOf<LoginForWebDto> = new FormGroup({
//     userNameOrEmail: new FormControl(null, [Validators.required]),
//     password: new FormControl(null, [Validators.required]),
//     rememberMe: new FormControl(false),
//   });

//   showPassword = signal<boolean>(false);

//   constructor(
//     private _authService: AuthService,
//     private _router: Router,
//     private toast: ToasterService
//   ) {}

//   ngOnInit() {
//     const savedData = JSON.parse(localStorage.getItem('rememberMe') || '{}');
//     if (savedData.userNameOrEmail) {
//       this.loginForm.patchValue(savedData);
//     }
//   }

//   login() {
//     const loginData = this.loginForm.getRawValue();

//     this._authService.login(loginData).subscribe({
//       next: res => {
//         if (res.succeeded) {
//           if (loginData.rememberMe) {
//             localStorage.setItem('rememberMe', JSON.stringify(loginData));
//           } else {
//             localStorage.removeItem('rememberMe');
//           }
//           this.toast.showSuccess(res.messages);
//           this._router.navigate(['']);
//         } else {
//           this.toast.showError(res.messages);
//         }
//       },
//       error: err => {
//         console.error(err);
//       },
//     });
//   }

//   togglePassword() {
//     this.showPassword.set(!this.showPassword());
//   }
// }
