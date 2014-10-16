package sweg.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import sweg.entity.RigaFattura;

@RepositoryRestResource(path="righe", collectionResourceRel="righe")
@Transactional
public interface RigaFatturaRepository extends CrudRepository<RigaFattura, Long> {

}
