import { ChangeDetectionStrategy, Component, ElementRef, Inject } from "@angular/core";
import { IApplicationConfiguration } from "../../config/ApplicationConfiguration";
import { FinalApplicationConfiguration } from "../../config/FinalApplicationConfiguration";
import { ApplicationMenuBaseComponent } from "../menu-base/menu-base.component";

@Component({
  selector: "cpng-application-menu-end",
  templateUrl: "./menu-end.component.html",
  styleUrls: ["../menu-base/menu-base.component.scss", "./menu-end.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationMenuEndComponent extends ApplicationMenuBaseComponent {
  constructor(
    @Inject(FinalApplicationConfiguration)
    config: IApplicationConfiguration,
    elmRef:ElementRef<HTMLElement>
  ) {
    super("end", config, elmRef);
  }
}
