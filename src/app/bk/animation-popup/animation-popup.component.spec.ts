import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationPopupComponent } from './animation-popup.component';

describe('AnimationPopupComponent', () => {
  let component: AnimationPopupComponent;
  let fixture: ComponentFixture<AnimationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
