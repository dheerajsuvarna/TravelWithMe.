import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInputForPswrdResetComponent } from './email-input-for-pswrd-reset.component';

describe('EmailInputForPswrdResetComponent', () => {
  let component: EmailInputForPswrdResetComponent;
  let fixture: ComponentFixture<EmailInputForPswrdResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailInputForPswrdResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInputForPswrdResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
