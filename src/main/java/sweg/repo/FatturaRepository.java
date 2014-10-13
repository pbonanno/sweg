package sweg.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import sweg.entity.TestataFattura;

@RepositoryRestResource(collectionResourceRel = "fattureRel", path = "fatturePath")
public interface FatturaRepository extends CrudRepository<TestataFattura, Long> {

}
