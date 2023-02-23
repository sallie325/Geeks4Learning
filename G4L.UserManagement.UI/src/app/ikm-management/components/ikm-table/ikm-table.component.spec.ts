import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IkmTableComponent } from './ikm-table.component';

describe('IkmTableComponent', () => {
  let component: IkmTableComponent;
  let fixture: ComponentFixture<IkmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IkmTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IkmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
