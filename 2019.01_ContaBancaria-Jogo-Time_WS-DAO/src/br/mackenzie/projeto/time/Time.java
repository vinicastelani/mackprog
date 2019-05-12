/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.mackenzie.projeto.time;
public class Time {
    
    private long id;
    private String nome;
    private String anoFundacao;
    private String cidade;
    private String estado;
    
    public Time(){}
    public Time(long id, String nome, String anoFundacao, String cidade, String estado){
        this.id = id;
        this.nome = nome;
        this.anoFundacao = anoFundacao;
        this.cidade = cidade;
        this.estado = estado;
    }

    public long getId() {return id;}

    public void setId(long id) {this.id = id;}

    public String getNome() {return nome;}

    public void setNome(String nome) {this.nome = nome;}

    public String getAnoFundacao() {return anoFundacao;}

    public void setAnoFundacao(String anoFundacao) {this.anoFundacao = anoFundacao;}

    public String getCidade() {return cidade;}

    public void setCidade(String cidade) {this.cidade = cidade;}

    public String getEstado() {return estado;}

    public void setEstado(String estado) {this.estado = estado;}
    
    
}
