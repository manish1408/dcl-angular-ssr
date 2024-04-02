import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudySliderComponent } from './case-study-slider.component';

describe('CaseStudySliderComponent', () => {
  let component: CaseStudySliderComponent;
  let fixture: ComponentFixture<CaseStudySliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudySliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseStudySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
