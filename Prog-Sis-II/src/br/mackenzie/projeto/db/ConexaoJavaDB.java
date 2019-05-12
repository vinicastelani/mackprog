/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.mackenzie.projeto.db;
import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * 
 */
public class ConexaoJavaDB {
    private Connection conn;
    private String usuario;
    private String senha;
    private String url;
    
    public ConexaoJavaDB(String usuario, String senha, String host, int porta, String banco) {
        this.usuario = usuario;
        this.senha = senha;
        this.url = host + ":" + porta + "/" + banco;
    }

    /**
     * @return the conn
     */
    public Connection getConexao() {
        if (conn != null)
            return conn;
        
        try {
            Class.forName("org.apache.derby.jdbc.ClientDriver");
            conn = DriverManager.getConnection(url, usuario, senha);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return conn;
    }
    
    public void close() {
        if (conn != null) {
            try {
                conn.close();
            } catch(Exception e) {
                e.printStackTrace();
            }
            conn = null;
        }
    }
}
