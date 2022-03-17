import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "cpng-auth-iframe",
  templateUrl: "./auth-iframe.component.html",
  styleUrls: ["./auth-iframe.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthIFrameComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { url: string },
    private readonly changeRef:ChangeDetectorRef
    
    ) {
      console.log('AuthIFrameComponent.constructor', this.data);
    }

  ngOnInit(): void {
    console.log('AuthIFrameComponent.ngOnInit', this.data)
    this.changeRef.detectChanges();
  }
}
