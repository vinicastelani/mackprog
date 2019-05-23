
package br.mackenzie.projeto.time;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import io.dropwizard.jersey.params.*;
import java.util.*;

@Path("/time")
@Produces(MediaType.APPLICATION_JSON)

public class TimeResource {
    private TimeDAO dao;
    
    public TimeResource(TimeDAO dao) {
        this.dao = dao;
    }
    
    @POST
    public Time create(Time time) {
        Time p = dao.criar(time);
        return p;
    }
    
    @GET
    public List<Time> read() {
        return dao.lerTodos();
    }
    
    @GET
    @Path("/ordem-alfabetica")
    public List<Time> readALF() {
        return dao.lerAlf();
    }
    
    @GET
    @Path("/mais-antigo")
    public List<Time> readMA() {
        return dao.lerTodos();
    }
    
    @GET
    @Path("/times-sp")
    public List<Time> readSP() {
        return dao.lerTodos();
    }
    
    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") LongParam idParam, Time time) {
        time.setId(idParam.get());
        if (dao.atualizar(time)) {
            return Response.ok().build();
        }
        
        throw new WebApplicationException("Time com id=" + idParam.get()
                                          + " não encontrado!", 404);
    }
    
    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") LongParam idParam) {
        long id = idParam.get();
        
        if (dao.apagar(id)) {
            return Response.ok().build();
        }
        
        throw new WebApplicationException("Time com id=" + id 
                                          + " não encontrado!", 404);
    }
}
