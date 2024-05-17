import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JodiDataComponent } from './jodi-data.component';

describe('JodiDataComponent', () => {
  let component: JodiDataComponent;
  let fixture: ComponentFixture<JodiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JodiDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JodiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
