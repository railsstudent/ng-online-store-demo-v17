import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
  template: `
  <div>
    <h2>Online Shop New Control Flow Demo</h2>
    <app-nav-bar />
    <router-outlet />
  </div>`,
  styles: [`
    div {
      padding: 0.75rem;
    }

    h2 {
      margin-bottom: 0.75rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(titleService: Title) {
    titleService.setTitle('Angular 17 Online Store Demo');
  }
}
