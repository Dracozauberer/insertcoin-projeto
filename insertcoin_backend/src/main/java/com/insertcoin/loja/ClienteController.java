package com.insertcoin.loja;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.UUID;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class ClienteController {
    @Autowired
    private ClienteRepository bd;
    @Autowired
    private InsertcoinService util;

    @PostMapping("/api/cliente") 
    public String gravar(@Valid @RequestBody Cliente obj){
        obj.setSenha(util.md5(obj.getSenha()));

        String token = UUID.randomUUID().toString();
        obj.setTokenConfirmacao(token);
        obj.setTokenConfirmacaoExpiracao(new Date(System.currentTimeMillis() + 86400000)); 

        bd.save(obj);

        String email = "<b>Email de confirmação de cadastro</b><br><br>" +
                    "seja bem vindo, "+ obj.getNome() + ", clique no link abaixo para "+
                    "confirmar o seu cadastro.<br><br>"+
                    "<a href='http://localhost:8080/api/cliente/confirmar/"+ token +"'>Clique aqui</a>";
        String retorno = util.enviaEmailHTML(obj.getEmail(), "Confirmação de novo cadastro", email);
        System.out.println("Cliente gravado com sucesso! "+ retorno);

        return retorno;
    }

    @PutMapping("/api/cliente")
    public void alterar(@RequestBody Cliente obj){
         obj.setSenha(util.md5(obj.getSenha()));
        if(bd.existsById(obj.getCodigo())) bd.save(obj);
        System.out.println("Cliente alterado com sucesso!");
    }

    @GetMapping("/api/clientes")
    public List<Cliente> listarTodos(){
        return bd.findAll();
    }

    @GetMapping("/api/cliente/{codigo}")
    public Cliente carregar(@PathVariable("codigo") int id){
        if(bd.existsById(id)){
            System.out.println("Cliente encontrado !");
            return bd.findById(id).get();
        } else {
            return new Cliente();
        }
    }

    @DeleteMapping("/api/cliente/{codigo}")
    public void remover(@PathVariable("codigo") int id){
        bd.deleteById(id);
        System.out.println("cliente removido com sucesso!");
    }


    @PostMapping("/api/cliente/login")
    public Cliente fazerLogin(@RequestBody Cliente obj){
         System.out.println("Email recebido: " + obj.getEmail()); 
         System.out.println("Senha recebida: " + obj.getSenha()); 

         obj.setSenha(util.md5(obj.getSenha()));
         System.out.println("Senha MD5: " + obj.getSenha());

       Optional<Cliente> retorno 
       =  bd.fazerLogin(obj.getEmail(), obj.getSenha());
       if(retorno.isPresent()){
             System.out.println("Login efetuado com sucesso!");
            return retorno.get();
       } else {
            System.out.println("Falha no login!");
            return new Cliente();
       }
    }
    @PostMapping("/api/cliente/solicitar-recuperacao")
    @ResponseBody
    public String solicitarRecuperacao(@RequestBody Map<String, String> dados) {
    String email = dados.get("email");
    
    System.out.println("Email recebido: " + email); 
    
    Optional<Cliente> clienteOpt = bd.findByEmail(email);
    
    if(clienteOpt.isPresent()) {
        Cliente cliente = clienteOpt.get();
        
        String token = String.valueOf((int)(Math.random() * 900000) + 100000);
        
        cliente.setTokenRecuperacao(token);
        cliente.setTokenExpiracao(new Date(System.currentTimeMillis() + 3600000)); 
        bd.save(cliente);
        
        System.out.println("Token gerado: " + token); 
        
        
        new Thread(() -> {
            String emailHtml = "<b>Recuperação de Senha</b><br><br>" +
                        "Olá, " + cliente.getNome() + "!<br><br>" +
                        "Você solicitou a recuperação de senha. Use o código abaixo:<br><br>" +
                        "<h2>" + token + "</h2><br><br>" +
                        "Este código expira em 1 hora.<br><br>" +
                        "Se você não solicitou, ignore este email.";
            
            util.enviaEmailHTML(cliente.getEmail(), "Recuperação de Senha", emailHtml);
        }).start();

        
        return "Email de recuperação enviado!";
    }
    
    return "Email não encontrado!";
}

    @PostMapping("/api/cliente/redefinir-senha")
    @ResponseBody
    public String redefinirSenha(@RequestBody Map<String, String> dados) {
    String token = dados.get("token");
    String novaSenha = dados.get("novaSenha");
    
    System.out.println("Token recebido: " + token); 
    
    
    Optional<Cliente> clienteOpt = bd.findByTokenRecuperacao(token);
    
    if(clienteOpt.isPresent()) {
        Cliente cliente = clienteOpt.get();
        
        
        if(cliente.getTokenExpiracao() != null && 
           cliente.getTokenExpiracao().before(new Date())) {
            return "Token expirado! Solicite um novo.";
        }
        
        
        cliente.setSenha(util.md5(novaSenha));
        cliente.setTokenRecuperacao(null);
        cliente.setTokenExpiracao(null);
        bd.save(cliente);
        
        System.out.println("Senha redefinida para: " + cliente.getEmail()); 
        
        return "Senha redefinida com sucesso!";
    }
    
    return "Token inválido!";
}
    @GetMapping("/api/cliente/inativos")
    public List<Cliente> listarInativos(){
        return bd.listaInativos();
    }

    @PatchMapping("/api/cliente/efetivar/{codigo}")
    public void efetivar(@PathVariable("codigo") int codigo){
         Cliente obj = bd.findById(codigo).get();
         obj.setAtivo(1);
         bd.save(obj);
         System.out.println("cliente liberado"); 
    }

    @GetMapping("/api/cliente/confirmar/{token}")
    public String confirmar(@PathVariable("token") String token){
        Optional<Cliente> clienteOpt = bd.findByTokenConfirmacao(token);
    
        if(clienteOpt.isPresent()){
        Cliente cliente = clienteOpt.get();
        
        
        if(cliente.getTokenConfirmacaoExpiracao() != null && 
           cliente.getTokenConfirmacaoExpiracao().before(new Date())){
            return "Token expirado! Solicite um novo cadastro.";
        }
        
        
        cliente.setAtivo(1);
        cliente.setTokenConfirmacao(null);
        cliente.setTokenConfirmacaoExpiracao(null);
        bd.save(cliente);
        
        System.out.println("Conta confirmada para: " + cliente.getEmail());
        return "Conta confirmada com sucesso!";
    }
    
    return "Token inválido!";
}

    @PostMapping("/api/contato")
    public String enviarContato(@RequestBody Map<String, String> dados) {
        String nome = dados.get("nome");
        String telefone = dados.get("telefone");
        String email = dados.get("email");
        String assunto = dados.get("assunto");
        String numeroPedido = dados.get("numeroPedido");
        String mensagem = dados.get("mensagem");
    
    
        if (nome == null || nome.isEmpty() || email == null || email.isEmpty() || mensagem == null || mensagem.isEmpty()) {
        return "Erro: Campos obrigatórios não preenchidos.";
        }
    
    
        String corpoEmail = "<b>Nova mensagem de contato</b><br><br>" +
                        "Nome: " + nome + "<br>" +
                        "Telefone: " + telefone + "<br>" +
                        "Email: " + email + "<br>" +
                        "Assunto: " + assunto + "<br>" +
                        "Número do Pedido: " + numeroPedido + "<br><br>" +
                        "Mensagem:<br>" + mensagem.replace("\n", "<br>");
    
    
        String seuEmail = "vsbarcellos20@gmail.com";  // Substitua pelo seu email real
        String retorno = util.enviaEmailHTML(seuEmail, "Nova mensagem de contato: " + assunto, corpoEmail);
    
        System.out.println("Email de contato enviado: " + retorno);
    return retorno;
}
}

