import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DedicatedTeamsComponent } from './dedicated-teams.component';

describe('DedicatedTeamsComponent', () => {
  let component: DedicatedTeamsComponent;
  let fixture: ComponentFixture<DedicatedTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DedicatedTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DedicatedTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
