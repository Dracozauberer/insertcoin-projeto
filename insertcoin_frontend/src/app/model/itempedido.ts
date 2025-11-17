import { Produto } from './produto';
import { Pedido } from './pedido';

export class ItemPedido {
  codigo: number = 0;
  quantidade: number = 1;
  precoUnitario: number = 0;
  produto: Produto = new Produto();
  pedido?: Pedido; // Opcional para evitar referência circular
}
