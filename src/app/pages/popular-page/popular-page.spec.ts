import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPage } from './popular-page';

describe('PopularPage', () => {
  let component: PopularPage;
  let fixture: ComponentFixture<PopularPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
