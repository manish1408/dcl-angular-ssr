import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareOutsourcingComponent } from './software-outsourcing.component';

describe('SoftwareOutsourcingComponent', () => {
  let component: SoftwareOutsourcingComponent;
  let fixture: ComponentFixture<SoftwareOutsourcingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareOutsourcingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoftwareOutsourcingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
