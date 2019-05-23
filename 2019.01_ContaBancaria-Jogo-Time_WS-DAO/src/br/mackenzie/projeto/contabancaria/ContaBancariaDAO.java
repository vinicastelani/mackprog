package br.mackenzie.projeto.contabancaria;

import br.mackenzie.projeto.db.ConexaoJavaDB;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ContaBancariaDAO {
    
    private PreparedStatement stmtC;
    private PreparedStatement stmtR;
    private PreparedStatement stmtRMaS;
    private PreparedStatement stmtRMeS;
    private PreparedStatement stmtRID;
    private PreparedStatement stmtU;
    private PreparedStatement stmtD;
    
    @SuppressWarnings("CallToPrintStackTrace")
    public ContaBancariaDAO(ConexaoJavaDB conexao) {
        try {
            Connection conn = conexao.getConexao();
            
            String sqlC = "INSERT INTO conta_bancaria(nome_titular, saldo, numero_agencia) VALUES(?,?,?)";
            String sqlR = "SELECT * FROM conta_bancaria ORDER BY nome_titular ASC";
            String sqlRID = "SELECT * FROM conta_bancaria WHERE id=?";
            String sqlRMaS = "SELECT * FROM conta_bancaria ORDER BY saldo DESC";
            String sqlRMeS = "SELECT * FROM conta_bancaria ORDER BY saldo ASC";
            String sqlU = "UPDATE conta_bancaria SET nome_titular=?, saldo=? , numero_agencia=? WHERE id=?";
            String sqlD = "DELETE FROM conta_bancaria WHERE id=?";
            
            this.stmtC = conn.prepareStatement(sqlC,Statement.RETURN_GENERATED_KEYS);
            this.stmtR = conn.prepareStatement(sqlR);
            this.stmtRMaS = conn.prepareStatement(sqlRMaS);
            this.stmtRMeS = conn.prepareStatement(sqlRMeS);
            this.stmtRID = conn.prepareStatement(sqlRID);
            this.stmtU = conn.prepareStatement(sqlU);
            this.stmtD = conn.prepareStatement(sqlD);
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
    
    
    public ContaBancaria lerPorID(long ID) {
        try{
            this.stmtRID.setLong(1, ID);
            ResultSet rs = this.stmtRID.executeQuery();
            ContaBancaria contaBancaria = new ContaBancaria();
            
            while(rs.next()) {
                contaBancaria.setId(rs.getInt("id"));
                contaBancaria.setNomeTitular(rs.getString("nome_titular"));
                contaBancaria.setSaldo(rs.getDouble("saldo"));
                contaBancaria.setNumeroAgencia(rs.getString("numero_agencia"));
            }
            return contaBancaria;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    
    public List<ContaBancaria> lerTodos() {
        try{
            ResultSet rs = this.stmtR.executeQuery();
            List<ContaBancaria> contasBancarias = new ArrayList<>();
            
            while(rs.next()) {
                ContaBancaria aux = new ContaBancaria();
                aux.setId(rs.getInt("id"));
                aux.setNomeTitular(rs.getString("nome_titular"));
                aux.setSaldo(rs.getDouble("saldo"));
                aux.setNumeroAgencia(rs.getString("numero_agencia"));
                contasBancarias.add(aux);
            }
            return contasBancarias;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    
    public List<ContaBancaria> maiorSaldo() {
        try{
            ResultSet rs = this.stmtRMaS.executeQuery();
            List<ContaBancaria> contasBancarias = new ArrayList<>();
            
            while(rs.next()) {
                ContaBancaria aux = new ContaBancaria();
                aux.setId(rs.getInt("id"));
                aux.setNomeTitular(rs.getString("nome_titular"));
                aux.setSaldo(rs.getDouble("saldo"));
                aux.setNumeroAgencia(rs.getString("numero_agencia"));
                contasBancarias.add(aux);
            }
            return contasBancarias;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    
    public List<ContaBancaria> menorSaldo() {
        try{
            ResultSet rs = this.stmtRMeS.executeQuery();
            List<ContaBancaria> contasBancarias = new ArrayList<>();
            
            while(rs.next()) {
                ContaBancaria aux = new ContaBancaria();
                aux.setId(rs.getInt("id"));
                aux.setNomeTitular(rs.getString("nome_titular"));
                aux.setSaldo(rs.getDouble("saldo"));
                aux.setNumeroAgencia(rs.getString("numero_agencia"));
                contasBancarias.add(aux);
            }
            return contasBancarias;
        }catch(SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    
    public ContaBancaria criar(ContaBancaria conta) {
        try{
            this.stmtC.setString(1, conta.getNomeTitular());
            this.stmtC.setDouble(2, conta.getSaldo());
            this.stmtC.setString(3, conta.getNumeroAgencia());
            
            this.stmtC.executeUpdate();
            ResultSet rs = this.stmtC.getGeneratedKeys();
            if (rs.next()) {
                int id = rs.getInt(1);
                conta.setId(id);
                return conta;
            } 
        }catch(SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public boolean atualizar(ContaBancaria conta) {
        try{
            
            this.stmtU.setString(1, conta.getNomeTitular());
            this.stmtU.setDouble(2, conta.getSaldo());
            this.stmtU.setString(3, conta.getNumeroAgencia());
            this.stmtU.setLong(4, conta.getId());
           
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
