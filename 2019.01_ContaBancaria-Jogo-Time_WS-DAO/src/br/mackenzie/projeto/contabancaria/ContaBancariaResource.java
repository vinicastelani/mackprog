/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.mackenzie.projeto.contabancaria;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import io.dropwizard.jersey.params.*;
import java.util.*;

@Path("/conta-bancaria")
@Produces(MediaType.APPLICATION_JSON)
public class ContaBancariaResource {
    
    private ContaBancariaDAO dao;
    
    public ContaBancariaResource(ContaBancariaDAO dao) {
        this.dao = dao;
    }
    
    @POST
    public ContaBancaria create(ContaBancaria c) {
        ContaBancaria conta = dao.criar(c);
        return conta;
    }
    
    @GET
    public List<ContaBancaria> read() {
        return dao.lerTodos();
    }
    
    @GET
    @Path("/maior-saldo")
    public List<ContaBancaria> readMaS() {
        return dao.maiorSaldo();
    }
    
    @GET
    @Path("/menor-saldo")
    public List<ContaBancaria> readMeS() {
        return dao.menorSaldo();
    }
    
    @GET
    @Path("/{id}")
    public ContaBancaria readID(@PathParam("id") LongParam idParam) {
        return dao.lerPorID(idParam.get());
    }
    
    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") LongParam idParam, ContaBancaria prof) {
        prof.setId(idParam.get());
        if (dao.atualizar(prof)) {
            return Response.ok().build();
        }
        
        throw new WebApplicationException("Bank account with the ID=" + idParam.get()
                                          + " not found!", 404);
    }
    
    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") LongParam idParam) {
        long id = idParam.get();
        
        if (dao.apagar(id)) {
            return Response.ok().build();
        }
        
        throw new WebApplicationException("Professor com id=" + id 
                                          + " não encontrado!", 404);
    }
    
}
