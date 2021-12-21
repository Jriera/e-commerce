import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'routeAnim',
      [
        transition('* => *', [
          style({
            opacity: 0,
          }), //end of style
          animate('1.3s ease-in'),
        ]), //end of transition
      ] //end of trigger options
    ), //end of trigger
  ], //end of animations
})
export class AppComponent {
  title = 'e-commerce';

  constructor(private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      return outlet.activatedRoute.snapshot.url;
    }
    return null;
  }

  isHomeRoute() {
    return this.router.url === '/';
  }
}
