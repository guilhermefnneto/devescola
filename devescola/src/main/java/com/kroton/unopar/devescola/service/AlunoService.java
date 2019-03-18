package com.kroton.unopar.devescola.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kroton.unopar.devescola.model.Aluno;
import com.kroton.unopar.devescola.repository.AlunoRepository;


/**
 * Serviços referentes ao aluno.
 */
@Service
public class AlunoService {

	@Autowired
	private AlunoRepository alunoRepository;
	

	/**
	 * Insere o aluno no repositório.
	 * @param aluno O aluno a ser inserido.
	 * @return O aluno inserido.
	 */
	public Aluno inserir(Aluno aluno) {
		return alunoRepository.save(aluno);
	}

	
	/**
	 * Recupera todos os alunos do repositório.
	 * @return Retorna a lista de alunos.
	 */
	public Iterable<Aluno> obterTodos() {
		return alunoRepository.findAll();
	}
	
	
	/**
	 * Recupera um aluno do repositório.
	 * @param ra O RA do aluno a ser recuperado.
	 * @return O aluno encontrado ou null caso contrário.
	 */
	public Aluno obter(Long ra) {
		Optional<Aluno> optionalAluno = alunoRepository.findById(ra);
		
		return optionalAluno.isPresent() ?optionalAluno.get() :null;
	}
	
	
	/**
	 * Atualiza os dados de um aluno no repositório
	 * @param ra O RA do aluno a ser recuperado.
	 * @param aluno O aluno a ser atualizado.
	 * @return true para caso o aluno tenha sido encontrado e atualizado, e false caso contrário.
	 */
	public boolean atualizar(Long ra, Aluno aluno) {
		Aluno alunoRecuperado = obter(ra);
		
		if (alunoRecuperado != null) {
			copiarDePara(aluno, alunoRecuperado);
			return alunoRepository.save(alunoRecuperado) != null;
		}

		return false;
	}
	
	
	/**
	 * Remove um aluno do repositório.
	 * @param ra O RA do aluno a ser removido.
	 * @return true.
	 */
	public boolean remover(Long ra) {
		alunoRepository.deleteById(ra);
		return true;
	}
	
	
	/**
	 * Copia os dados do aluno origem para o aluno destino.
	 * Para cada informação a ser copiada, antes verifica-se se o aluno origem detém aquela informação como sendo diferente de null,
	 *  sendo esta a condição para copiar a informação para o aluno destino.
	 * @param alunoFrom Representação do aluno origem.
	 * @param alunoTo Representação do aluno destino.
	 * @return O aluno destino atualizado.
	 */
	private Aluno copiarDePara(Aluno alunoFrom, Aluno alunoTo) {
		if (alunoFrom.getNome()            != null) alunoTo.setNome           (alunoFrom.getNome());
		if (alunoFrom.getDataNascimento()  != null) alunoTo.setDataNascimento (alunoFrom.getDataNascimento());
		if (alunoFrom.getSexo()            != null) alunoTo.setSexo           (alunoFrom.getSexo());
		
		return alunoTo;
	}
	
}
