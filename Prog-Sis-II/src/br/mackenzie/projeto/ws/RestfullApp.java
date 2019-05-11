
package br.mackenzie.projeto.ws;
import br.mackenzie.projeto.db.ConexaoJavaDB;
import br.mackenzie.projeto.time.TimeDAO;
import br.mackenzie.projeto.time.TimeResource;
import br.mackenzie.projeto.contabancaria.ContaBancariaDAO;
import br.mackenzie.projeto.contabancaria.ContaBancariaResource;
import br.mackenzie.projeto.jogo.JogoDAO;
import br.mackenzie.projeto.jogo.JogoResource;
import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class RestfullApp extends Application<Configuration> {
    public static void main(String[] args) throws Exception {
        new RestfullApp().run(new String[] { "server" });
    }
    
    @Override
    public void initialize(final Bootstrap<Configuration> bootstrap) {
        bootstrap.addBundle(new AssetsBundle("/html", "/", "index.html"));
    }

    @Override
    public void run(Configuration configuration, Environment environment) {
        ConexaoJavaDB conexao = new ConexaoJavaDB("mackadmin", "mackadmin", "jdbc:derby://localhost", 1527, "Projeto");
        TimeDAO timeDao = new TimeDAO(conexao);
        ContaBancariaDAO contaDao = new ContaBancariaDAO(conexao);
        JogoDAO jogoDao = new JogoDAO(conexao);
        environment.jersey().register(new TimeResource(timeDao));
        environment.jersey().register(new ContaBancariaResource(contaDao));
        environment.jersey().register(new JogoResource(jogoDao));
        environment.jersey().setUrlPattern("/api/*");
    }
}
