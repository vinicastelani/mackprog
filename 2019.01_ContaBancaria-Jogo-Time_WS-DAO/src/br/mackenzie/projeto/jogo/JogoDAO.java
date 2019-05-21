
package br.mackenzie.projeto.jogo;

import br.mackenzie.projeto.db.ConexaoJavaDB;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JogoDAO {
    private PreparedStatement stmtC;
    private PreparedStatement stmtR;
    private PreparedStatement stmtRMG;
    private PreparedStatement stmtRVM;
    private PreparedStatement stmtRJE;
    private PreparedStatement stmtU;
    private PreparedStatement stmtD;
    
    public JogoDAO(ConexaoJavaDB conexao) {
        try {
            Connection conn = conexao.getConexao();
            
            String sqlC = "INSERT INTO jogo(nome_time_a, nome_time_b,gols_time_a, gols_time_b) VALUES(?,?,?,?)";
            String sqlR = "SELECT * FROM jogo";
            String sqlRMG = "SELECT * FROM jogo ORDER BY (gols_time_a + gols_time_b) DESC";
            String sqlRVM = "SELECT * FROM jogo WHERE gols_time_a > gols_time_b";
            String sqlRJE = "SELECT * FROM jogo WHERE gols_time_a = gols_time_b";
            String sqlU = "UPDATE jogo SET nome_time_a =?, nome_time_b=?,gols_time_a=?, gols_time_b=? WHERE id=?";
            String sqlD = "DELETE FROM jogo WHERE id=?";

            this.stmtC = conn.prepareStatement(sqlC,Statement.RETURN_GENERATED_KEYS);
            this.stmtR = conn.prepareStatement(sqlR);
            this.stmtRMG = conn.prepareStatement(sqlRMG);
            this.stmtRVM = conn.prepareStatement(sqlRVM);
            this.stmtRJE = conn.prepareStatement(sqlRJE);
            this.stmtU = conn.prepareStatement(sqlU);
            this.stmtD = conn.prepareStatement(sqlD);
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
    
     public List<Jogo> lerTodos() {
        try{
            ResultSet rs = this.stmtR.executeQuery();
            List<Jogo> times = new ArrayList<>();
            
            while(rs.next()) {
                Jogo aux = new Jogo();
                aux.setId(rs.getInt("id"));
                aux.setNomeTimeA(rs.getString("nome_time_a"));
                aux.setNomeTimeB(rs.getString("nome_time_b"));
                aux.setGolsTimeA(rs.getInt("gols_time_a"));
                aux.setGolsTimeB(rs.getInt("gols_time_b"));
                times.add(aux);
            }
            return times;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
     
    public List<Jogo> maisGols() {
        try{
            ResultSet rs = this.stmtRMG.executeQuery();
            List<Jogo> times = new ArrayList<>();
            
            while(rs.next()) {
                Jogo aux = new Jogo();
                aux.setId(rs.getInt("id"));
                aux.setNomeTimeA(rs.getString("nome_time_a"));
                aux.setNomeTimeB(rs.getString("nome_time_b"));
                aux.setGolsTimeA(rs.getInt("gols_time_a"));
                aux.setGolsTimeB(rs.getInt("gols_time_b"));
                times.add(aux);
            }
            return times;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    
    public List<Jogo> vitMandante() {
        try{
            ResultSet rs = this.stmtRVM.executeQuery();
            List<Jogo> times = new ArrayList<>();
            
            while(rs.next()) {
                Jogo aux = new Jogo();
                aux.setId(rs.getInt("id"));
                aux.setNomeTimeA(rs.getString("nome_time_a"));
                aux.setNomeTimeB(rs.getString("nome_time_b"));
                aux.setGolsTimeA(rs.getInt("gols_time_a"));
                aux.setGolsTimeB(rs.getInt("gols_time_b"));
                times.add(aux);
            }
            return times;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    
    public List<Jogo> jogosEmpate() {
        try{
            ResultSet rs = this.stmtRJE.executeQuery();
            List<Jogo> times = new ArrayList<>();
            
            while(rs.next()) {
                Jogo aux = new Jogo();
                aux.setId(rs.getInt("id"));
                aux.setNomeTimeA(rs.getString("nome_time_a"));
                aux.setNomeTimeB(rs.getString("nome_time_b"));
                aux.setGolsTimeA(rs.getInt("gols_time_a"));
                aux.setGolsTimeB(rs.getInt("gols_time_b"));
                times.add(aux);
            }
            return times;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    
    public Jogo criar(Jogo jogo) {
        try {
            this.stmtC.setString(1, jogo.getNomeTimeA());
            this.stmtC.setString(2, jogo.getNomeTimeB());
            this.stmtC.setInt(3, jogo.getGolsTimeA());
            this.stmtC.setInt(4, jogo.getGolsTimeB());
            this.stmtC.executeUpdate();
            ResultSet rs = this.stmtC.getGeneratedKeys();
            rs.next();
            long id = rs.getLong(1);
            jogo.setId(id);
            return jogo;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public boolean atualizar(Jogo jogo) {
        try{
            this.stmtU.setString(1, jogo.getNomeTimeA());
            this.stmtU.setString(2, jogo.getNomeTimeB());
            this.stmtU.setInt(3, jogo.getGolsTimeA());
            this.stmtU.setInt(4, jogo.getGolsTimeA());
            this.stmtU.setLong(5, jogo.getId());
            
            return this.stmtU.executeUpdate() > 0;
        }catch(SQLException e) {
            e.printStackTrace();
        }
        
        return false;
    }
    
    
    public boolean apagar(long id) {
        try{
            this.stmtD.setLong(1, id);
            return this.stmtD.executeUpdate() > 0;
        }catch(SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
