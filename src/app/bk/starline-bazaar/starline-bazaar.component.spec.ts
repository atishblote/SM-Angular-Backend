import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlineBazaarComponent } from './starline-bazaar.component';

describe('StarlineBazaarComponent', () => {
  let component: StarlineBazaarComponent;
  let fixture: ComponentFixture<StarlineBazaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarlineBazaarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarlineBazaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
