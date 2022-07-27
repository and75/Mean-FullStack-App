/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaschboardComponent } from './daschboard.component';

describe('DaschboardComponent', () => {
  let component: DaschboardComponent;
  let fixture: ComponentFixture<DaschboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaschboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaschboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
