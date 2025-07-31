import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, Search, Filter } from 'lucide-angular';
import { ButtonComponent } from '../../shared/components/button.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Page header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Users</h1>
          <p class="text-muted-foreground">
            Manage your user accounts and permissions.
          </p>
        </div>
        <app-button>
          <lucide-angular [img]="plusIcon" class="mr-2 h-4 w-4"></lucide-angular>
          Add User
        </app-button>
      </div>

      <!-- Search and filters -->
      <div class="flex items-center space-x-4">
        <div class="relative flex-1 max-w-sm">
          <lucide-angular [img]="searchIcon" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"></lucide-angular>
          <input
            type="search"
            placeholder="Search users..."
            class="h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <lucide-angular [img]="filterIcon" class="mr-2 h-4 w-4"></lucide-angular>
          Filter
        </button>
      </div>

      <!-- Users table -->
      <div class="rounded-md border">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b bg-muted/50">
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users" class="border-b transition-colors hover:bg-muted/50">
                <td class="p-4 align-middle">
                  <div class="flex items-center space-x-3">
                    <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <span class="text-sm font-medium">{{ user.initials }}</span>
                    </div>
                    <div>
                      <div class="font-medium">{{ user.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="p-4 align-middle text-muted-foreground">{{ user.email }}</td>
                <td class="p-4 align-middle">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" 
                        [ngClass]="getRoleBadgeClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td class="p-4 align-middle">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        [ngClass]="getStatusBadgeClass(user.status)">
                    {{ user.status }}
                  </span>
                </td>
                <td class="p-4 align-middle text-muted-foreground">{{ user.joinedDate }}</td>
                <td class="p-4 align-middle">
                  <div class="flex items-center space-x-2">
                    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                      Edit
                    </button>
                    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-8 w-8 text-destructive">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  plusIcon = Plus;
  searchIcon = Search;
  filterIcon = Filter;

  users = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      initials: 'AJ',
      role: 'Admin',
      status: 'Active',
      joinedDate: 'Jan 15, 2024'
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      initials: 'BS',
      role: 'User',
      status: 'Active',
      joinedDate: 'Jan 12, 2024'
    },
    {
      name: 'Carol Davis',
      email: 'carol@example.com',
      initials: 'CD',
      role: 'Moderator',
      status: 'Inactive',
      joinedDate: 'Jan 10, 2024'
    },
    {
      name: 'David Wilson',
      email: 'david@example.com',
      initials: 'DW',
      role: 'User',
      status: 'Active',
      joinedDate: 'Jan 8, 2024'
    },
    {
      name: 'Eva Brown',
      email: 'eva@example.com',
      initials: 'EB',
      role: 'User',
      status: 'Pending',
      joinedDate: 'Jan 5, 2024'
    }
  ];

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Moderator':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'User':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  }
}