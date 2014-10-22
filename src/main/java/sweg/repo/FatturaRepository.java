package sweg.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import sweg.entity.TestataFattura;

@RepositoryRestResource(collectionResourceRel = "fatture", path = "fatture")
@Transactional
public interface FatturaRepository extends PagingAndSortingRepository<TestataFattura, Long> {
	Page<TestataFattura> findByIntestatarioContainingAllIgnoringCase(@Param("text") String text, Pageable pageable);
	
	TestataFattura findByNumero(@Param("numero") String numero);
}
