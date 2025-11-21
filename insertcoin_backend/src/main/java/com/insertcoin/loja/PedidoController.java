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
        if (obj.getCliente() != null && obj.getCliente().getCodigo() > 0) {
            Cliente cliente = clienteRepo.findById(obj.getCliente().getCodigo())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
            obj.setCliente(cliente);
            System.out.println("✅ Cliente carregado: " + cliente.getNome());
        } else {
            throw new RuntimeException("Cliente inválido!");
        }
        obj.setDataPedido(LocalDateTime.now());
        obj.setStatus("PENDENTE");
        
        BigDecimal total = BigDecimal.ZERO;
        for(ItemPedido item : obj.getItens()) {
            item.setPedido(obj);
            total = total.add(item.getPrecoUnitario().multiply(new BigDecimal(item.getQuantidade())));
        }
        obj.setTotal(total);
        
        pedidoRepo.save(obj);
        
        
        String emailMsg = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>" +
        "<h2 style='color: #28a745;'>🎉 Pedido Confirmado!</h2>" +
        "<p>Olá, <strong>" + obj.getCliente().getNome() + "</strong>!</p>" +
        "<p>Seu pedido foi confirmado com sucesso!</p>" +
        "<div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>" +
        "<h3 style='margin-top: 0;'>📦 Detalhes do Pedido</h3>" +
        "<p><strong>Número do Pedido:</strong> #" + obj.getCodigo() + "</p>" +
        "<p><strong>Data:</strong> " + obj.getDataPedido().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")) + "</p>" +
        "<p><strong>Status:</strong> " + obj.getStatus() + "</p>" +
        "<hr style='border: none; border-top: 1px solid #ddd;'>" +
        "<p style='font-size: 24px; color: #28a745;'><strong>Total: R$ " + obj.getTotal() + "</strong></p>" +
        "</div>" +
        "<p>Obrigado por comprar conosco! </p>" +
        "<p style='color: #666; font-size: 12px;'>Em breve você receberá mais informações sobre a entrega.</p>" +
        "</div>";

        service.enviaEmailHTML(obj.getCliente().getEmail(), "Confirmação de Pedido #" + obj.getCodigo(), emailMsg);
        // String emailMsg = "Pedido #" + obj.getCodigo() + " realizado com sucesso! Total: R$ " + obj.getTotal();
        // service.enviarEmail(obj.getCliente().getEmail(), "Confirmação de Pedido", emailMsg);
        
        System.out.println("Pedido gravado com sucesso!");
    }

    @PutMapping("/api/pedido")
    public void alterar(@RequestBody Pedido obj){
        if(pedidoRepo.existsById(obj.getCodigo())){
	    BigDecimal total = BigDecimal.ZERO;
        for(ItemPedido item : obj.getItens()) {
            item.setPedido(obj);
            total = total.add(item.getPrecoUnitario().multiply(new BigDecimal(item.getQuantidade())));
        }
        obj.setTotal(total);

        pedidoRepo.save(obj);
        System.out.println("Pedido alterado com sucesso!");
        }
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

    @DeleteMapping("/api/pedido/{codigo}")
     public void remover(@PathVariable("codigo") int codigo) {
        if(pedidoRepo.existsById(codigo)) {
        
        pedidoRepo.deleteById(codigo);
        System.out.println("Pedido removido com sucesso!");
    }   else {
        System.out.println("Pedido não encontrado!");
    }
}
}