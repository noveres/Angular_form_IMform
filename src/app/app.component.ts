

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { User } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User | null = null;
  isSidebarCollapsed = false;
  hasNotifications = true;
  currentPage = '';
  isLoginPage = false;
  isRefreshed = false;
  title: any;
  initialNavigation: boolean | undefined;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {

      this.initialNavigation = true;

      this.currentPage = this.getPageTitle(event.url);
      this.isLoginPage = event.url == '/login';
     
      const url = typeof event.url === 'string' ? event.url.replace(/[#?].*$/, '').trim() : '';
      if (url === '/' || url === ''||/^\/?(login|l|lo|log|logi)?$/i.test(event.url)) {
          this.isLoginPage = true;
          this.isRefreshed = true;
      }

      else if(this.isRefreshed == false) {
         this.isRefreshed = true;
        // location.reload();
        //記得放加載畫面
      }
      
    });
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user && this.router.url == '/login') {
        this.router.navigate(['/new/dashboard']);
      }
    });
  }


  getPageTitle(url: string): string {
    if (url.includes('dashboard')) return '儀表板';
    if (url.includes('questionnaires')) return '問卷列表';
    if (url.includes('users')) return '用戶管理';
    if (url.includes('external-forms')) return '外部表單';
    return '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getRoleText(role?: string): string {
    switch (role) {
      case 'admin':
        return '管理員';
      case 'user':
        return '研發部';
      default:
        return '';
    }
  }
}
