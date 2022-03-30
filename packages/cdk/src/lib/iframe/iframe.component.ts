import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
  selector: "cpng-iframe",
  templateUrl: "./iframe.component.html",
  styleUrls: ["./iframe.component.scss"],
})
export class IFrameComponent implements OnInit {
  public _src?: string;

  @Input()
  public set src(val: string | undefined) {
    if(this._src !== val){
      this._src = val ?? '';
      if(this.iframe){
        this.iframe.src = this._src;
      }
    }
  }

  public get src(): string | undefined {
    return this._src;
  }
  //public get safeUrl() {
  //  return this.domSanitizer.bypassSecurityTrustResourceUrl(this.src ?? 'https://material.angular.io/components/dialog/overview');
  // }

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly element: ElementRef<HTMLElement>
  ) {}

  private get iframe(): HTMLIFrameElement {
    return this.element.nativeElement.querySelector(
      "iframe"
    ) as HTMLIFrameElement;
  }

  ngOnInit(): void {
    if(this.iframe){
      this.iframe.src = this._src ?? '';
    }

  }
}
