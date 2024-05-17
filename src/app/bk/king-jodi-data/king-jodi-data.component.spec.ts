import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingJodiDataComponent } from './king-jodi-data.component';

describe('KingJodiDataComponent', () => {
  let component: KingJodiDataComponent;
  let fixture: ComponentFixture<KingJodiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KingJodiDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KingJodiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
