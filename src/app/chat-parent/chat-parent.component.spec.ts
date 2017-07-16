import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatParentComponent } from './chat-parent.component';

describe('ChatParentComponent', () => {
  let component: ChatParentComponent;
  let fixture: ComponentFixture<ChatParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
