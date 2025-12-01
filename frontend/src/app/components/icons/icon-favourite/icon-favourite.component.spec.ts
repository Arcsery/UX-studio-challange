import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFavouriteComponent } from './icon-favourite.component';

describe('IconFavouriteComponent', () => {
  let component: IconFavouriteComponent;
  let fixture: ComponentFixture<IconFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFavouriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
