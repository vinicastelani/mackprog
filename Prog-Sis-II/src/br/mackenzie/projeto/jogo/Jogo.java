
package br.mackenzie.projeto.jogo;

public class Jogo {
    
    private long id;
    private String nomeTimeA;
    private String nomeTimeB;
    private int golsTimeA;
    private int golsTimeB;
    
    public Jogo(){}
    public Jogo(long id, String nomeTimeA, String nomeTimeB, int golsTimeA, int golsTimeB){
        this.id = id;
        this.nomeTimeA = nomeTimeA;
        this.nomeTimeB = nomeTimeB;
        this.golsTimeA = golsTimeA;
        this.golsTimeA = golsTimeB;
    }

    public long getId() {return id;}

    public void setId(long id) {this.id = id;}

    public String getNomeTimeA() {return nomeTimeA;}

    public void setNomeTimeA(String nomeTimeA) {this.nomeTimeA = nomeTimeA;}

    public String getNomeTimeB() {return nomeTimeB;}

    public void setNomeTimeB(String nomeTimeB) {this.nomeTimeB = nomeTimeB;}

    public int getGolsTimeA() {return golsTimeA;}

    public void setGolsTimeA(int golsTimeA) {this.golsTimeA = golsTimeA;}

    public int getGolsTimeB() {return golsTimeB;}

    public void setGolsTimeB(int golsTimeB) {this.golsTimeB = golsTimeB;}
    
}
