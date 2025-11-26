package com.insertcoin.loja;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import java.util.Date;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    private String senha;
    private String documento;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "\\d{10,11}", message = "Telefone deve ter 10 ou 11 dígitos")
    private String telefone;
    
    private String logradouro;
    private String cidade;
    private String cep;
    private String complemento;
    private int ativo;

    @Column(nullable = true)
    private String tokenRecuperacao;
    
    @Column(nullable = true)    
    private Date tokenExpiracao;

    @Column(nullable = true)
    private String tokenConfirmacao;
    
    @Column(nullable = true)    
    private Date tokenConfirmacaoExpiracao;

    public int getCodigo() {
        return codigo;
    }
    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public String getDocumento() {
        return documento;
    }
    public void setDocumento(String documento) {
        this.documento = documento;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public String getLogradouro() {
        return logradouro;
    }
    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }
    public String getCidade() {
        return cidade;
    }
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
    public String getCep() {
        return cep;
    }
    public void setCep(String cep) {
        this.cep = cep;
    }
    public String getComplemento() {
        return complemento;
    }
    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }
    public int getAtivo() {
        return ativo;
    }
    public void setAtivo(int ativo) {
        this.ativo = ativo;
    }
    public String getTokenRecuperacao() {
        return tokenRecuperacao;
    }
    public void setTokenRecuperacao(String tokenRecuperacao) {
        this.tokenRecuperacao = tokenRecuperacao;
    }
    public Date getTokenExpiracao() {
        return tokenExpiracao;
    }
    public void setTokenExpiracao(Date tokenExpiracao) {
        this.tokenExpiracao = tokenExpiracao;
    }

    public String getTokenConfirmacao() {
        return tokenConfirmacao;
    }   
    public void setTokenConfirmacao(String tokenConfirmacao) {
        this.tokenConfirmacao = tokenConfirmacao;
    }

    public Date getTokenConfirmacaoExpiracao() {
        return tokenConfirmacaoExpiracao;
    }

    public void setTokenConfirmacaoExpiracao(Date tokenConfirmacaoExpiracao) {
        this.tokenConfirmacaoExpiracao = tokenConfirmacaoExpiracao;
    }
    
}