import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAugmentationComponent } from './staff-augmentation.component';

describe('StaffAugmentationComponent', () => {
  let component: StaffAugmentationComponent;
  let fixture: ComponentFixture<StaffAugmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAugmentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffAugmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
