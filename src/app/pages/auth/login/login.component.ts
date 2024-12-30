import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
<<<<<<< HEAD
=======
import { Subscription } from 'rxjs';
import { Location } from '@angular/common'; // 导入Location服务
>>>>>>> b5099c3 (Initial commit with all files)

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule],
=======
  imports: [CommonModule, FormsModule,],
>>>>>>> b5099c3 (Initial commit with all files)
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
<<<<<<< HEAD
          <img src="assets/logo.svg" alt="Logo" class="logo">
=======
          <img src="logo.svg" alt="Logo" class="logo">
>>>>>>> b5099c3 (Initial commit with all files)
          <h1>問卷管理系統</h1>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="login-form">
          <div class="form-group">
            <label for="username">帳號</label>
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="username"
                name="username"
                [(ngModel)]="credentials.username"
                required
                #username="ngModel"
                placeholder="請輸入帳號"
              >
            </div>
            @if (username.invalid && (username.dirty || username.touched)) {
              <div class="error-message">
                請輸入帳號
              </div>
            }
          </div>

          <div class="form-group">
            <label for="password">密碼</label>
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                [(ngModel)]="credentials.password"
                required
                minlength="6"
                #password="ngModel"
                placeholder="請輸入密碼"
              >
              <button type="button" class="toggle-password" (click)="togglePasswordVisibility()">
                <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            @if (password.invalid && (password.dirty || password.touched)) {
              <div class="error-message">
                密碼長度必須至少為6個字符
              </div>
            }
          </div>

          <div class="form-group remember-me">
            <label>
              <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
              記住我
            </label>
            <a href="#" class="forgot-password">忘記密碼？</a>
          </div>

          @if (errorMessage) {
            <div class="error-alert">
              <i class="fas fa-exclamation-circle"></i>
              {{ errorMessage }}
            </div>
          }

          <button type="submit" [disabled]="!loginForm.form.valid || isLoading" class="login-button">
            @if (isLoading) {
              <i class="fas fa-spinner fa-spin"></i>
              登入中...
            } @else {
              登入
            }
          </button>
        </form>

        <div class="login-footer">
          <p>測試帳號：abc123</p>
          <p>測試密碼：abc123</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 15px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .login-header {
      text-align: center;
      margin-bottom: 40px;

      .logo {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
      }

      h1 {
        color: #2c3e50;
        font-size: 1.8rem;
        margin: 0;
      }
    }

    .login-form {
      .form-group {
        margin-bottom: 20px;

        label {
          display: block;
          margin-bottom: 8px;
          color: #2c3e50;
          font-weight: 500;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;

          i {
            position: absolute;
            left: 12px;
            color: #95a5a6;
          }

          input {
            width: 100%;
            padding: 12px 40px 12px 35px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;

            &:focus {
              border-color: #3498db;
              outline: none;
            }
          }

          .toggle-password {
            position: absolute;
            right: 12px;
            background: none;
            border: none;
            color: #95a5a6;
            cursor: pointer;
            padding: 0;

            &:hover {
              color: #2c3e50;
            }
          }
        }
      }

      .remember-me {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;

        label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .forgot-password {
          color: #3498db;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
      margin-top: 5px;
    }

    .error-alert {
      background-color: #fdecea;
      color: #e74c3c;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;

      i {
        font-size: 1.2rem;
      }
    }

    .login-button {
      width: 100%;
      padding: 12px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      &:hover:not(:disabled) {
        background-color: #2980b9;
      }

      &:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
      }
    }

    .login-footer {
      margin-top: 30px;
      text-align: center;
      color: #7f8c8d;
      font-size: 0.9rem;

      p {
        margin: 5px 0;
      }
    }
  `]
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
<<<<<<< HEAD
=======
  hasRefreshed = true;


  private routeSubscription: Subscription | undefined;
>>>>>>> b5099c3 (Initial commit with all files)

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
<<<<<<< HEAD
  ) {}
=======
  ) { }
>>>>>>> b5099c3 (Initial commit with all files)

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
<<<<<<< HEAD
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]);
=======
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/new/dashboard';
        this.router.navigate([returnUrl]);
        this.hasRefreshed = false; // 設定標誌為未刷新
>>>>>>> b5099c3 (Initial commit with all files)
      },
      error: (error) => {
        this.errorMessage = '帳號或密碼錯誤';
        this.isLoading = false;
      }
    });
  }
<<<<<<< HEAD
}
=======


  ngOnInit(): void {



    this.routeSubscription = this.router.events.subscribe(() => {
      if (this.router.url.includes('/login')) {
        console.log('Navigated to login');
        // 執行初始化邏輯
        if (!this.hasRefreshed) {
          this.hasRefreshed = true;  // 設定標誌為已刷新

          setTimeout(() => {
            this.refreshPage();
          }, 1000);

        }
        else if (!this.router.url.includes('/login')) {
          this.hasRefreshed = false;  // 設定標誌為未刷新

        }
      }
    });
  }

  ngOnDestroy(): void {
    // 記得取消訂閱以避免內存洩漏
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }


  // ngOnInit(): void {

  //   if (!this.hasRefreshed) {
  //     this.hasRefreshed = true;  // 設定標誌為已刷新
  //     // 延遲1秒後刷新頁面
  //     setTimeout(() => {
  //       this.refreshPage();
  //     }, 1000); // 1000毫秒，即1秒
  //   }
  // }

  refreshPage(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


}



>>>>>>> b5099c3 (Initial commit with all files)
