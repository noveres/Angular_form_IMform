import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // 檢查是否已登入
  if (authService.isLoggedIn()) {
    // 如果已登入且嘗試訪問登入頁面，重定向到首頁
    if (state.url === '/login') {
      router.navigate(['/']);
      return false;
    }
    return true;
  }

  // 如果未登入且不是訪問登入頁面，重定向到登入頁面
  if (state.url !== '/login') {
    router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url },
      replaceUrl: true 
    });
    return false;
  }

  return true;
};
