import { Component, OnInit } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout'
import { map } from 'rxjs';
@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit {

  public isLT900$ = this.bp.observe('(max-width: 900px)').pipe(map(b => b.matches));

  constructor(
    private readonly bp:BreakpointObserver
  ) { }

  ngOnInit(): void {
  }

}
