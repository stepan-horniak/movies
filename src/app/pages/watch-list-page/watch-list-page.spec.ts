import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLaterPage } from './watch-later-page';

describe('WatchLaterPage', () => {
  let component: WatchLaterPage;
  let fixture: ComponentFixture<WatchLaterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchLaterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchLaterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
