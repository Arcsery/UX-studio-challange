import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBackArrowComponent } from './icon-back-arrow.component';

describe('IconBackArrowComponent', () => {
  let component: IconBackArrowComponent;
  let fixture: ComponentFixture<IconBackArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconBackArrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconBackArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
