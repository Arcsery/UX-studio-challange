import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMuteComponent } from './icon-mute.component';

describe('IconMuteComponent', () => {
  let component: IconMuteComponent;
  let fixture: ComponentFixture<IconMuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconMuteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconMuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
