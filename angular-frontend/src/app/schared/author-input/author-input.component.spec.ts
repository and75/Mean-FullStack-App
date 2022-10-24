import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInputComponent } from './author-input.component';

describe('AuthorInputComponent', () => {
  let component: AuthorInputComponent;
  let fixture: ComponentFixture<AuthorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
