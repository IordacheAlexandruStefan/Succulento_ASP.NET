import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucculentListComponent } from './succulent-list.component';

describe('SucculentListComponent', () => {
  let component: SucculentListComponent;
  let fixture: ComponentFixture<SucculentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucculentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucculentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
