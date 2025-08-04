import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, Menu, Search, Bell, User, LogOut } from 'lucide-angular';
import { ThemeToggleComponent } from './theme-toggle.component';
import { AuthService, User as AuthUser } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ThemeToggleComponent],
  template: `
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="w-full flex h-16 items-center px-4 lg:px-6">
        <!-- Sidebar toggle button -->
        <button
          class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          (click)="toggleSidebar()"
        >
          <lucide-angular [img]="menuIcon" class="h-5 w-5"></lucide-angular>
          <span class="sr-only">Toggle sidebar</span>
        </button>

        <!-- Breadcrumb / Page title -->
        <div class="flex items-center space-x-2 lg:ml-0 ml-2">
          <h1 class="text-lg font-semibold">{{ pageTitle }}</h1>
        </div>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4 ml-auto flex-shrink-0">
          <div class="relative hidden md:block">
            <lucide-angular [img]="searchIcon" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"></lucide-angular>
            <input
              type="search"
              placeholder="Search..."
              class="h-9 w-64 rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <!-- Notifications -->
          <button class="relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <lucide-angular [img]="bellIcon" class="h-5 w-5"></lucide-angular>
            <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-xs text-destructive-foreground flex items-center justify-center">
              3
            </span>
            <span class="sr-only">Notifications</span>
          </button>

          <!-- Theme toggle -->
          <app-theme-toggle></app-theme-toggle>

          <!-- User menu -->
          <div class="relative">
            <button 
              class="flex items-center space-x-2 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              (click)="toggleUserMenu()"
            >
              <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <lucide-angular [img]="userIcon" class="h-4 w-4"></lucide-angular>
              </div>
              <span class="sr-only">User menu</span>
            </button>

            <!-- User dropdown menu -->
            <div 
              *ngIf="isUserMenuOpen" 
              class="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md animate-in slide-in-from-top-2"
            >
              <div class="px-3 py-2 text-sm">
                <p class="font-medium">{{ currentUser?.name || 'User' }}</p>
                <p class="text-muted-foreground">{{ currentUser?.email || 'user@example.com' }}</p>
              </div>
              <div class="h-px bg-border my-1"></div>
              <button 
                (click)="navigateToProfile()" 
                class="w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Profile
              </button>
              <button 
                (click)="navigateToSettings()" 
                class="w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Settings
              </button>
              <div class="h-px bg-border my-1"></div>
              <button 
                (click)="logout()" 
                class="w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center space-x-2"
              >
                <lucide-angular [img]="logoutIcon" class="h-4 w-4"></lucide-angular>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() pageTitle = 'Dashboard';
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  isUserMenuOpen = false;
  currentUser: AuthUser | null = null;
  private userSubscription: Subscription = new Subscription();

  menuIcon = Menu;
  searchIcon = Search;
  bellIcon = Bell;
  userIcon = User;
  logoutIcon = LogOut;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.isUserMenuOpen = false;
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
    this.isUserMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen = false;
  }
}