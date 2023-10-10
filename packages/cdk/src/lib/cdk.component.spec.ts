import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkComponent } from './cdk.component';

describe('CdkComponent', () => {
  let component: CdkComponent;
  let fixture: ComponentFixture<CdkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CdkComponent],
    });
    fixture = TestBed.createComponent(CdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
