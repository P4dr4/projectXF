import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubComponent } from './hub.component';

describe('HubComponent', () => {
  let component: HubComponent;
  let fixture: ComponentFixture<HubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user profile', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.user-profile h2').textContent).toContain('John Doe');
  });

  it('should display feed items', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.feed-item').length).toBeGreaterThan(0);
  });
});
