package sweg;

import java.math.BigDecimal;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import sweg.entity.RigaFattura;
import sweg.entity.TestataFattura;
import sweg.repo.FatturaRepository;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@Import(RestMvcConfiguration.class)
@EnableJpaRepositories
public class Application {
	@Autowired
	FatturaRepository fatturaRepository;
	
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    
    
    @PostConstruct
    public void init() {
    	for (int i = 0; i < 50; i++) {
			TestataFattura f = new TestataFattura(
					"emittente "+i,
					"intestatario "+i,
					i+"/2014",
					new Date()
			);
			
			for (int j = 0; j < 5; j++) {
				f.addRiga(new RigaFattura(j, "Riga "+j, j * 10, BigDecimal.TEN, new BigDecimal("22.0")));
				
			}
			
			fatturaRepository.save(f);
		}
    }
}
