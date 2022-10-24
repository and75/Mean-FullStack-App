import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorViewComponent } from './author-view.component';

describe('AuthorViewComponent', () => {
  let component: AuthorViewComponent;
  let fixture: ComponentFixture<AuthorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
