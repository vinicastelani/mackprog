/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.mackenzie.projeto.time;
import br.mackenzie.projeto.db.ConexaoJavaDB;
import java.sql.Connection;

/**
 *
 * @author Vinicius
 */
public class Application {
    /* static void main(String[] args) {
        ConexaoJavaDB conexao = new ConexaoJavaDB("mackadmin", "mackadmin","jdbc:derby://localhost" ,1527 , "Projeto");
        Connection conn = conexao.getConexao();
        Time time = new Time(1, "São Paulo", "11021997","Santos", "São Paulo");
        TimeDAO dao = new TimeDAO(conexao);
        
        dao.criar(time);
        //dao.lerTodos();
        //dao.atualizar(time);
        //dao.apagar(9);
    }*/
}
