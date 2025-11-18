import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheProduto } from './detalhe-produto';

describe('DetalheProduto', () => {
  let component: DetalheProduto;
  let fixture: ComponentFixture<DetalheProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheProduto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheProduto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
