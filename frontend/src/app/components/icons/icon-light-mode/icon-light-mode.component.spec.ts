import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLightModeComponent } from './icon-light-mode.component';

describe('IconLightModeComponent', () => {
  let component: IconLightModeComponent;
  let fixture: ComponentFixture<IconLightModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconLightModeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconLightModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
