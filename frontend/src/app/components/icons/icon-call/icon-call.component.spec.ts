import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCallComponent } from './icon-call.component';

describe('IconCallComponent', () => {
  let component: IconCallComponent;
  let fixture: ComponentFixture<IconCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
