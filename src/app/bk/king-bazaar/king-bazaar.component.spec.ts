import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingBazaarComponent } from './king-bazaar.component';

describe('KingBazaarComponent', () => {
  let component: KingBazaarComponent;
  let fixture: ComponentFixture<KingBazaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KingBazaarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KingBazaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
