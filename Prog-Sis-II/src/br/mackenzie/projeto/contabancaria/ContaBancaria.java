package br.mackenzie.projeto.contabancaria;

public class ContaBancaria {
    
    long id;
    String nomeTitular;
    Double saldo;
    String numeroAgencia;
    
    public ContaBancaria(){}
    
    public ContaBancaria(long id, String nomeTitular, Double saldo, String numeroAgencia){
        this.id = id;
        this.nomeTitular = nomeTitular;
        this.saldo = saldo;
        this.numeroAgencia = numeroAgencia;
    }
    
    public long getId() {return id;}

    public void setId(long id) {this.id = id;}

    public String getNomeTitular() {return nomeTitular;}

    public void setNomeTitular(String nomeTitular) {this.nomeTitular = nomeTitular;}

    public Double getSaldo() {return saldo;}

    public void setSaldo(Double saldo) {this.saldo = saldo;}

    public String getNumeroAgencia() {return numeroAgencia;}

    public void setNumeroAgencia(String numeroAgencia) {this.numeroAgencia = numeroAgencia;}
  
}
