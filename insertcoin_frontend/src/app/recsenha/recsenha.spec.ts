import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recsenha } from './recsenha';

describe('Recsenha', () => {
  let component: Recsenha;
  let fixture: ComponentFixture<Recsenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recsenha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recsenha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
