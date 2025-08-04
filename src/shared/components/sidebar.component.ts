import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, Home, Users, Settings, BarChart3, FileText, LogOut } from 'lucide-angular';
import { UserCountService } from '../../services/user-count.service';
import { Subscription } from 'rxjs';

export interface SidebarItem {
  title: string;
  icon: any;
  href: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <aside 
      class="fixed left-0 top-0 z-40 h-screen transition-transform duration-300 ease-in-out"
      [class.translate-x-0]="isOpen"
      [class.-translate-x-full]="!isOpen"
      [ngClass]="sidebarClasses"
    >
      <!-- Sidebar Header -->
      <div class="flex h-16 items-center border-b px-6">
        <div class="flex items-center space-x-2">
          <div class="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span class="text-primary-foreground font-bold text-sm">UM</span>
          </div>
          <span class="font-semibold text-lg">User Management</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 p-4">
        <div class="space-y-1">
          <div *ngFor="let item of navigationItems" class="relative">
            <a
              [routerLink]="item.href"
              routerLinkActive="bg-primary text-primary-foreground"
              class="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <lucide-angular [img]="item.icon" class="h-4 w-4"></lucide-angular>
              <span>{{ item.title }}</span>
              <span 
                *ngIf="item.badge" 
                class="ml-auto rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground"
              >
                {{ item.badge }}
              </span>
            </a>
          </div>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="border-t p-4">
        <div class="flex items-center space-x-3 rounded-lg px-3 py-2">
          <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span class="text-sm font-medium">JD</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">John Doe</p>
            <p class="text-xs text-muted-foreground truncate">john&#64;example.com</p>
          </div>
        </div>
        <button 
          class="mt-2 flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          (click)="onLogout()"
        >
          <lucide-angular [img]="logOutIcon" class="h-4 w-4"></lucide-angular>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div 
      *ngIf="isOpen" 
      class="fixed inset-0 z-30 bg-black/50 lg:hidden"
      (click)="toggleSidebar()"
    ></div>
  `,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  logOutIcon = LogOut;
  userCount = 0;
  private userCountSubscription?: Subscription;

  constructor(private userCountService: UserCountService) {}

  ngOnInit() {
    this.userCountSubscription = this.userCountService.userCount$.subscribe(count => {
      this.userCount = count;
    });
  }

  ngOnDestroy() {
    if (this.userCountSubscription) {
      this.userCountSubscription.unsubscribe();
    }
  }

  get navigationItems(): SidebarItem[] {
    return [
      {
        title: 'Dashboard',
        icon: Home,
        href: '/dashboard'
      },
      {
        title: 'Users',
        icon: Users,
        href: '/users',
        badge: this.userCount.toString()
      },
      {
        title: 'Analytics',
        icon: BarChart3,
        href: '/analytics'
      },
      {
        title: 'Reports',
        icon: FileText,
        href: '/reports'
      },
      {
        title: 'Settings',
        icon: Settings,
        href: '/settings'
      }
    ];
  }

  get sidebarClasses() {
    return 'w-64 bg-background border-r border-border';
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  onLogout() {
    // Implement logout logic here
    console.log('Logout clicked');
  }
}