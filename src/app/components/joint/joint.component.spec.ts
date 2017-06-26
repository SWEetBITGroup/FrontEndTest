import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointComponent } from './joint.component';

describe('JointComponent', () => {
  let component: JointComponent;
  let fixture: ComponentFixture<JointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
