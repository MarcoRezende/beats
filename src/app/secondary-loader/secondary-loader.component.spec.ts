import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryLoaderComponent } from './secondary-loader.component';

describe('SecondaryLoaderComponent', () => {
  let component: SecondaryLoaderComponent;
  let fixture: ComponentFixture<SecondaryLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
