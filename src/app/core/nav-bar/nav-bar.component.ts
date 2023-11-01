import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      @if (!['/', '/products'].includes(currentUrl)) {
        <a routerLink="/">Back</a>
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

      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  router = inject(Router);
  destroyRef$ = inject(DestroyRef);
  cdr = inject(ChangeDetectorRef);
  currentUrl = '';

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.currentUrl = (e as NavigationEnd).url;
          this.cdr.markForCheck();
        }
      });
  }
}