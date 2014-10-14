package sweg.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import sweg.entity.TestataFattura;

@RepositoryRestResource(collectionResourceRel = "fattura", path = "fattura")
@Transactional
public interface FatturaRepository extends CrudRepository<TestataFattura, Long> {

}
