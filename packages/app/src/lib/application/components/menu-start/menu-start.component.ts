import { ChangeDetectionStrategy, Component, ElementRef, Inject } from "@angular/core";
import { IApplicationConfiguration } from "../../config/ApplicationConfiguration";
import { FinalApplicationConfiguration } from "../../config/FinalApplicationConfiguration";
import { ApplicationMenuBaseComponent } from "../menu-base/menu-base.component";

@Component({
  selector: "cpng-application-menu-start",
  templateUrl: "./menu-start.component.html",
  styleUrls: ["../menu-base/menu-base.component.scss", "./menu-start.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationMenuStartComponent extends ApplicationMenuBaseComponent {
  constructor(
    @Inject(FinalApplicationConfiguration)
    config: IApplicationConfiguration,
    elmRef:ElementRef<HTMLElement>
  ) {
    super(config, elmRef);
  }
}
