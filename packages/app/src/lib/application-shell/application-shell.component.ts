import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatDrawerMode, MatSidenavContent } from "@angular/material/sidenav";
import { map, Subject, takeUntil } from "rxjs";
import { ApplicationShellConfig } from "./ApplicationShellConfig";
import { FINAL_APPLICATION_SHELL_CONFIG } from "./FINAL_APPLICATION_SHELL_CONFIG";
import { MenuMode } from "./MenuMode";
import {observe} from '@cpangular/cdk/value-resolver';
import { ApplicationViewAnchors } from "./ApplicationViewAnchors";
import { InternalViewAnchors } from "./InternalViewAnchors";
import { HeaderPosition } from "./HeaderMode";

@Component({
  selector: "cpng-application-shell",
  templateUrl: "./application-shell.component.html",
  styleUrls: ["./application-shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationShellComponent implements OnInit {
  private destroy$ = new Subject();
  
  public readonly viewAnchors = ApplicationViewAnchors;
  public readonly _va = InternalViewAnchors;

  public headerMode$ = observe(this._config.headerMode);
  public headerPosition$ = observe(this._config.headerPosition);
  public headerInnerPosition$ = this.headerPosition$.pipe(map(p => p === HeaderPosition.INNER))


  @ViewChild("scrollArea", { static: true, read: MatSidenavContent })
  public scrollArea!: MatSidenavContent;

  public leftMenuMode$ = observe(this._config.leftMenuMode).pipe(
    takeUntil(this.destroy$)
  );

  public showLeftMenuButton$ = this.leftMenuMode$.pipe(
    map((m) => m !== MenuMode.FIXED)
  );

  public leftMenuSideNavMode$ = this.leftMenuMode$.pipe(
    map(
      (m) =>
        ["side", "side", "over", "push"][m ?? MenuMode.FIXED] as MatDrawerMode
    )
  );

  public leftMenuSideNavOpen$ = this.leftMenuMode$.pipe(
    map((m) => {
      if (m === MenuMode.FIXED) {
        return true;
      }
      return false;
    })
  );

  public rightMenuMode$ = observe(this._config.rightMenuMode).pipe(
    takeUntil(this.destroy$)
  );

  public showRightMenuButton$ = this.rightMenuMode$.pipe(
    map((m) => m !== MenuMode.FIXED)
  );
  public rightMenuSideNavMode$ = this.rightMenuMode$.pipe(
    map(
      (m) =>
        ["side", "side", "over", "push"][m ?? MenuMode.FIXED] as MatDrawerMode
    )
  );

  public rightMenuSideNavOpen$ = this.rightMenuMode$.pipe(
    map((m) => {
      if (m === MenuMode.FIXED) {
        return true;
      }
      return false;
    })
  );

  constructor(
    @Inject(FINAL_APPLICATION_SHELL_CONFIG)
    private readonly _config: ApplicationShellConfig
  ) {}

  ngOnInit(): void {}
}
