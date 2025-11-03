package com.insertcoin.loja;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Component;

@RestController
@CrossOrigin(origins = "*")
@Component
public class PedidoController {
    
    @Autowired
    private PedidoRepository pedidoRepo;
    
    @Autowired
    private ItemPedidoRepository itemRepo;
    
    @Autowired
    private ClienteRepository clienteRepo;
    
    @Autowired
    private ProdutoRepository produtoRepo;
    
    @Autowired
    private InsertcoinService service;

    @PostMapping("/api/pedido")
    public void gravar(@RequestBody Pedido obj) {
        obj.setDataPedido(LocalDateTime.now());
        obj.setStatus("PENDENTE");
        
        BigDecimal total = BigDecimal.ZERO;
        for(ItemPedido item : obj.getItens()) {
            item.setPedido(obj);
            total = total.add(item.getPrecoUnitario().multiply(new BigDecimal(item.getQuantidade())));
        }
        obj.setTotal(total);
        
        pedidoRepo.save(obj);
        
        String emailMsg = "Pedido #" + obj.getCodigo() + " realizado com sucesso! Total: R$ " + obj.getTotal();
        service.enviarEmail(obj.getCliente().getEmail(), "Confirmação de Pedido", emailMsg);
        
        System.out.println("Pedido gravado com sucesso!");
    }

    @GetMapping("/api/pedido/{codigo}")
    public Pedido carregar(@PathVariable("codigo") int codigo) {
        if(pedidoRepo.existsById(codigo)) {
            return pedidoRepo.findById(codigo).get();
        }
        return new Pedido();
    }

    @GetMapping("/api/pedidos")
    public List<Pedido> listarTodos() {
        return pedidoRepo.findAll();
    }

    @GetMapping("/api/pedidos/cliente/{clienteId}")
    public List<Pedido> listarPorCliente(@PathVariable("clienteId") int clienteId) {
        return pedidoRepo.listarPorCliente(clienteId);
    }
}