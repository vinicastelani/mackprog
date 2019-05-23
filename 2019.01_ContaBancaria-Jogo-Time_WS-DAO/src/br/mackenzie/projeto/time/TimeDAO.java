/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.mackenzie.projeto.time;

import br.mackenzie.projeto.db.ConexaoJavaDB;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * 
 */
public class TimeDAO {
    private PreparedStatement stmtC;
    private PreparedStatement stmtR;
    private PreparedStatement stmtRALF;
    private PreparedStatement stmtRMA;
    private PreparedStatement stmtRSP;
    private PreparedStatement stmtU;
    private PreparedStatement stmtD;
    
    public TimeDAO(ConexaoJavaDB conexao) {
        try {
            Connection conn = conexao.getConexao();
            
            String sqlC = "INSERT INTO time(nome, ano_fundacao,cidade, estado) VALUES(?,?,?,?)";
            String sqlR = "SELECT * FROM time";
            String sqlRALF = "SELECT * FROM time ORDER BY nome ASC";
            String sqlRMA = "SELECT * FROM time ORDER BY ano_fundacao ASC";
            String sqlRSP = "SELECT * FROM time WHERE estado = 'SP'";
            String sqlU = "UPDATE time SET nome=?, ano_fundacao=?, cidade=?, estado=? WHERE id=?";
            String sqlD = "DELETE FROM time WHERE id=?";

            this.stmtC = conn.prepareStatement(sqlC,Statement.RETURN_GENERATED_KEYS);
            this.stmtR = conn.prepareStatement(sqlR);
            this.stmtRALF = conn.prepareStatement(sqlRALF);
            this.stmtRMA = conn.prepareStatement(sqlRMA);
            this.stmtRSP = conn.prepareStatement(sqlRSP);
            this.stmtU = conn.prepareStatement(sqlU);
            this.stmtD = conn.prepareStatement(sqlD);
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
    
     public List<Time> lerTodos() {
        try{
            ResultSet rs = this.stmtR.executeQuery();
            List<Time> times = new ArrayList<>();
            
            while(rs.next()) {
                Time aux = new Time();
                aux.setId(rs.getInt("id"));
                aux.setNome(rs.getString("nome"));
                aux.setAnoFundacao(rs.getString("ano_fundacao"));
                aux.setCidade(rs.getString("cidade"));
                aux.setEstado(rs.getString("estado"));
                times.add(aux);
            }
            return times;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
     
     public List<Time> lerAlf() {
        try{
            ResultSet rs = this.stmtRALF.executeQuery();
            List<Time> times = new ArrayList<>();
            
            while(rs.next()) {
                Time aux = new Time();
                aux.setId(rs.getInt("id"));
                aux.setNome(rs.getString("nome"));
                aux.setAnoFundacao(rs.getString("ano_fundacao"));
                aux.setCidade(rs.getString("cidade"));
                aux.setEstado(rs.getString("estado"));
                times.add(aux);
            }
            return times;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
     
     public List<Time> lerMaisAntigo() {
        try{
            ResultSet rs = this.stmtRMA.executeQuery();
            List<Time> times = new ArrayList<>();
            
            while(rs.next()) {
                Time aux = new Time();
                aux.setId(rs.getInt("id"));
                aux.setNome(rs.getString("nome"));
                aux.setAnoFundacao(rs.getString("ano_fundacao"));
                aux.setCidade(rs.getString("cidade"));
                aux.setEstado(rs.getString("estado"));
                times.add(aux);
            }
            return times;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
     
     public List<Time> lerTimeSP() {
        try{
            ResultSet rs = this.stmtRSP.executeQuery();
            List<Time> times = new ArrayList<>();
            
            while(rs.next()) {
                Time aux = new Time();
                aux.setId(rs.getInt("id"));
                aux.setNome(rs.getString("nome"));
                aux.setAnoFundacao(rs.getString("ano_fundacao"));
                aux.setCidade(rs.getString("cidade"));
                aux.setEstado(rs.getString("estado"));
                times.add(aux);
            }
            return times;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    
    public Time criar(Time time) {
        try {
            this.stmtC.setString(1, time.getNome());
            this.stmtC.setString(2, time.getAnoFundacao());
            this.stmtC.setString(3, time.getCidade());
            this.stmtC.setString(4, time.getEstado());
            this.stmtC.executeUpdate();
            ResultSet rs = this.stmtC.getGeneratedKeys();
            rs.next();
            long id = rs.getLong(1);
            time.setId(id);
            return time;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public boolean atualizar(Time time) {
        try{
            this.stmtU.setString(1, time.getNome());
            this.stmtU.setString(2, time.getAnoFundacao());
            this.stmtU.setString(3, time.getCidade());
            this.stmtU.setString(4, time.getEstado());
            this.stmtU.setLong(5, time.getId());
            
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
