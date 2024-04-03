import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementModelsComponent } from './engagement-models.component';

describe('EngagementModelsComponent', () => {
  let component: EngagementModelsComponent;
  let fixture: ComponentFixture<EngagementModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementModelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EngagementModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
