
package br.mackenzie.projeto.jogo;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import io.dropwizard.jersey.params.*;
import java.util.*;

@Path("/jogo")
@Produces(MediaType.APPLICATION_JSON)


public class JogoResource {
    
    private JogoDAO dao;
    
    public JogoResource(JogoDAO dao) {
        this.dao = dao;
    }
    
    @POST
    public Jogo create(Jogo time) {
        Jogo p = dao.criar(time);
        return p;
    }
    
    @GET
    public List<Jogo> read() {
        return dao.lerTodos();
    }
    
    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") LongParam idParam, Jogo jogo) {
        jogo.setId(idParam.get());
        if (dao.atualizar(jogo)) {
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
