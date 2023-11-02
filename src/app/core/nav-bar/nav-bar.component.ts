import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getCurrentUrlFn } from './utilities/currentUrl';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      @if (isShowBackButton) {
        <a routerLink="/">Home</a>
      } @else {
        <span>&nbsp;</span>
      }
      <a [routerLink]="['my-cart']">View Cart</a>
    </div>
  `,
  styles: [`
    div {
      background: goldenrod;
      height: 50px;
      padding: 0.25rem;
      margin-bottom: 1rem;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  cdr = inject(ChangeDetectorRef);
  isShowBackButton = false;
  getCurrentUrl = getCurrentUrlFn();

  ngOnInit(): void {
    this.getCurrentUrl.subscribe((url) => {
      this.isShowBackButton = !['/', '/products'].includes(url);
      this.cdr.markForCheck();
    });
  }
}