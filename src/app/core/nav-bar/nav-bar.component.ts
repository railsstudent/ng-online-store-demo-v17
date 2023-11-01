import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

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
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => e as NavigationEnd),
        takeUntilDestroyed(this.destroyRef$)
      ).subscribe((e) => {
        this.currentUrl = e.url;
        this.cdr.markForCheck();
      });
  }
}