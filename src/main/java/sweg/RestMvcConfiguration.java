package sweg;

import java.net.URI;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
public class RestMvcConfiguration extends RepositoryRestMvcConfiguration {

	public RestMvcConfiguration() {
	}

	@Override
	public RepositoryRestConfiguration config() {
		RepositoryRestConfiguration config = super.config();
		config.setBaseUri(URI.create("/api"));
		return config;
	}
}
