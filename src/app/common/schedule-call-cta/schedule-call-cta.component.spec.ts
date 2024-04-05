import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCallCTAComponent } from './schedule-call-cta.component';

describe('ScheduleCallCTAComponent', () => {
  let component: ScheduleCallCTAComponent;
  let fixture: ComponentFixture<ScheduleCallCTAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleCallCTAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleCallCTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
