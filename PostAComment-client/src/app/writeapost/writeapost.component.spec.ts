import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteapostComponent } from './writeapost.component';

describe('WriteapostComponent', () => {
  let component: WriteapostComponent;
  let fixture: ComponentFixture<WriteapostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteapostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteapostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
