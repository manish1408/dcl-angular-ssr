import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPoweredMvpDevelopmentComponent } from './ai-powered-mvp-development.component';

describe('AiPoweredMvpDevelopmentComponent', () => {
  let component: AiPoweredMvpDevelopmentComponent;
  let fixture: ComponentFixture<AiPoweredMvpDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPoweredMvpDevelopmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiPoweredMvpDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
