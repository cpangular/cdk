import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cpng-redirect',
  template: ``,
})
export class RedirectComponent {
  constructor(route: ActivatedRoute, router: Router) {
    router.navigate(
      route.snapshot.url.map((u) => u.toString()),
      {
        replaceUrl: true,
        preserveFragment: true,
        queryParamsHandling: 'preserve',
      }
    );
  }
}
