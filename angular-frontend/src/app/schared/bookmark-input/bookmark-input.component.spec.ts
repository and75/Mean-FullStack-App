import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkInputComponent } from './bookmark-input.component';

describe('BookmarkInputComponent', () => {
  let component: BookmarkInputComponent;
  let fixture: ComponentFixture<BookmarkInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
