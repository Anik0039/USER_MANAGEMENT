import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Settings, User, Shield, Bell, Palette, Database } from 'lucide-angular';
import { ButtonComponent } from '../../shared/components/button.component';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent, ThemeToggleComponent],
  template: `
    <div class="space-y-6">
      <!-- Page header -->
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Settings</h1>
        <p class="text-muted-foreground">
          Manage your application settings and preferences.
        </p>
      </div>

      <!-- Settings sections -->
      <div class="grid gap-6">
        <!-- Profile Settings -->
        <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div class="flex items-center space-x-3 mb-4">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <lucide-angular [img]="userIcon" class="h-5 w-5 text-primary"></lucide-angular>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Profile Settings</h3>
              <p class="text-sm text-muted-foreground">Manage your personal information and preferences</p>
            </div>
          </div>
          
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <label class="text-sm font-medium">Full Name</label>
              <input type="text" value="John Doe" class="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Email</label>
              <input type="email" value="john&#64;example.com" class="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            </div>
          </div>
          
          <div class="mt-4 flex justify-end">
            <app-button>Save Changes</app-button>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div class="flex items-center space-x-3 mb-4">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <lucide-angular [img]="shieldIcon" class="h-5 w-5 text-primary"></lucide-angular>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Security Settings</h3>
              <p class="text-sm text-muted-foreground">Manage your account security and authentication</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium">Two-Factor Authentication</h4>
                <p class="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Enable
              </button>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium">Change Password</h4>
                <p class="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Change
              </button>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div class="flex items-center space-x-3 mb-4">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <lucide-angular [img]="bellIcon" class="h-5 w-5 text-primary"></lucide-angular>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Notification Settings</h3>
              <p class="text-sm text-muted-foreground">Configure how you receive notifications</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div *ngFor="let notification of notificationSettings" class="flex items-center justify-between">
              <div>
                <h4 class="font-medium">{{ notification.title }}</h4>
                <p class="text-sm text-muted-foreground">{{ notification.description }}</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" [checked]="notification.enabled" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div class="flex items-center space-x-3 mb-4">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <lucide-angular [img]="paletteIcon" class="h-5 w-5 text-primary"></lucide-angular>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Appearance Settings</h3>
              <p class="text-sm text-muted-foreground">Customize the look and feel of your interface</p>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium">Theme</h4>
              <p class="text-sm text-muted-foreground">Choose between light and dark mode</p>
            </div>
            <app-theme-toggle></app-theme-toggle>
          </div>
        </div>

        <!-- System Settings -->
        <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div class="flex items-center space-x-3 mb-4">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <lucide-angular [img]="databaseIcon" class="h-5 w-5 text-primary"></lucide-angular>
            </div>
            <div>
              <h3 class="text-lg font-semibold">System Settings</h3>
              <p class="text-sm text-muted-foreground">Advanced system configuration options</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium">Data Export</h4>
                <p class="text-sm text-muted-foreground">Export your data in various formats</p>
              </div>
              <button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Export
              </button>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium">Clear Cache</h4>
                <p class="text-sm text-muted-foreground">Clear application cache and temporary data</p>
              </div>
              <button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  userIcon = User;
  shieldIcon = Shield;
  bellIcon = Bell;
  paletteIcon = Palette;
  databaseIcon = Database;

  notificationSettings = [
    {
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      enabled: true
    },
    {
      title: 'Push Notifications',
      description: 'Receive push notifications in your browser',
      enabled: false
    },
    {
      title: 'SMS Notifications',
      description: 'Receive notifications via SMS',
      enabled: false
    },
    {
      title: 'Marketing Emails',
      description: 'Receive marketing and promotional emails',
      enabled: true
    }
  ];
}