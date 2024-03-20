import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItProfessionalsComponent } from './it-professionals.component';

describe('ItProfessionalsComponent', () => {
  let component: ItProfessionalsComponent;
  let fixture: ComponentFixture<ItProfessionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItProfessionalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
