import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerBlockComponent } from './owner-block.component';

describe('OwnerBlockComponent', () => {
  let component: OwnerBlockComponent;
  let fixture: ComponentFixture<OwnerBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
