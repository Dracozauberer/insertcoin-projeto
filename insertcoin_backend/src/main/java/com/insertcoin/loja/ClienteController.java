package com.insertcoin.loja;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        bd.save(obj);
        String email = "<b>Email de confirmação de cadastro</b><br><br>" +
                    "seja bem vindo, "+ obj.getNome() + ", clique no link abaixo para "+
                    "confirmar o seu cadastro.<br><br>"+
                    "<a href='http://localhost:8081/api/cliente/efetivar/"+ util.md5(obj.getEmail()) +"'>Clique aqui</a>";
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
         obj.setSenha(util.md5(obj.getSenha()));
       Optional<Cliente> retorno 
       =  bd.fazerLogin(obj.getEmail(), obj.getSenha());
       if(retorno.isPresent()){
             System.out.println("Login efetuado com sucesso!");
            return retorno.get();
       } else {
            return new Cliente();
       }
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
}

