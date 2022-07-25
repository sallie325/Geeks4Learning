import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboadComponent } from './admin-dashboad.component';

describe('AdminDashboadComponent', () => {
  let component: AdminDashboadComponent;
  let fixture: ComponentFixture<AdminDashboadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
