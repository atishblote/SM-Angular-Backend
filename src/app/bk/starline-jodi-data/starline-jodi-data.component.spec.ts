import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlineJodiDataComponent } from './starline-jodi-data.component';

describe('StarlineJodiDataComponent', () => {
  let component: StarlineJodiDataComponent;
  let fixture: ComponentFixture<StarlineJodiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarlineJodiDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarlineJodiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
