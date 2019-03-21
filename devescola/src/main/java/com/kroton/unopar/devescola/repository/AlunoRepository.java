package com.kroton.unopar.devescola.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.kroton.unopar.devescola.model.Aluno;


/**
 * Repositório padrão do cadastro do aluno.
 */
@Transactional
public interface AlunoRepository extends CrudRepository<Aluno, Long> {

	@Query("SELECT a FROM aluno a ORDER BY a.ra ASC")
	Iterable<Aluno> findAllOrderById();
	
}
