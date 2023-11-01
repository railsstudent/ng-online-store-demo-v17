import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
  template: `
  <div>
    <h2>Signal Demo</h2>
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
  title = 'ng-online-store-demo-v17';
}
