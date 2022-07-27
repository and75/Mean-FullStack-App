import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveViewComponent } from './drive-view.component';

describe('DriveViewComponent', () => {
  let component: DriveViewComponent;
  let fixture: ComponentFixture<DriveViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
