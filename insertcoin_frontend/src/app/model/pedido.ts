import { Cliente } from './cliente';
import { ItemPedido } from './itempedido';

export class Pedido {
  codigo: number = 0;
  dataPedido: string = "";
  status: string = "";
  total: number = 0;
  cliente: Cliente = new Cliente();
  itens: ItemPedido[] = [];
}