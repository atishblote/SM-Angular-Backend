import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingAllJodiDataComponent } from './king-all-jodi-data.component';

describe('KingAllJodiDataComponent', () => {
  let component: KingAllJodiDataComponent;
  let fixture: ComponentFixture<KingAllJodiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KingAllJodiDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KingAllJodiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
