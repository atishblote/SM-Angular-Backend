import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularBazaarComponent } from './regular-bazaar.component';

describe('RegularBazaarComponent', () => {
  let component: RegularBazaarComponent;
  let fixture: ComponentFixture<RegularBazaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularBazaarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegularBazaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
