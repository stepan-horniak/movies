import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedPage } from './top-rated-page';

describe('TopRatedPage', () => {
  let component: TopRatedPage;
  let fixture: ComponentFixture<TopRatedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
