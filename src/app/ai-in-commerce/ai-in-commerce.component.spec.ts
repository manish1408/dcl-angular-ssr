import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiInCommerceComponent } from './ai-in-commerce.component';

describe('AiInCommerceComponent', () => {
  let component: AiInCommerceComponent;
  let fixture: ComponentFixture<AiInCommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiInCommerceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiInCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
