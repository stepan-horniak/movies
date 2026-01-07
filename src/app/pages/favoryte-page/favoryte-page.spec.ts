import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorytePage } from './favoryte-page';

describe('FavorytePage', () => {
  let component: FavorytePage;
  let fixture: ComponentFixture<FavorytePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavorytePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorytePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
