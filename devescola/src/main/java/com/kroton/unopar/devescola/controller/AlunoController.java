package com.kroton.unopar.devescola.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kroton.unopar.devescola.model.Aluno;
import com.kroton.unopar.devescola.service.AlunoService;
import com.kroton.unopar.devescola.validation.AlunoValidation;

/**
 * Gerenciador do cadastro de alunos. 
 */
@Controller
@RequestMapping("/aluno")
@CrossOrigin
public class AlunoController {

	
	@Autowired
	private AlunoService alunoService;
	
	
	/**
	 * Configura o objeto que validará o aluno passado nas requisições.
	 * @param dataBinder O objeto de configuração.
	 */
	@InitBinder
	protected void initBinder(WebDataBinder dataBinder) {
		dataBinder.setValidator(new AlunoValidation());
	}
	

	/**
	 * Insere um aluno.
	 * @param aluno O aluno a ser inserido.
	 * @return O aluno inserido.
	 */
	@PostMapping
	public ResponseEntity<Aluno> inserir(@RequestBody @Valid Aluno aluno) {
		return ResponseEntity.ok(alunoService.inserir(aluno));
	}
	
	/**
	 * Recupera todos os alunos.
	 * @return Envia a lista de alunos recuperados.
	 */
	@GetMapping
	public ResponseEntity<Iterable<Aluno>> obterTodos() {
		return ResponseEntity.ok(alunoService.obterTodos());
	}
	
	
	/**
	 * Recupera um aluno.
	 * @param ra O ra do aluno a ser recuperado.
	 * @return O aluno recuperado.
	 */
	@GetMapping(value="{ra}")
	public ResponseEntity<Aluno> obter(@PathVariable("ra") Long ra) {
		return ResponseEntity.ok(alunoService.obter(ra));
	}
	
	
	/**
	 * Atualiza o aluno.
	 * @param ra O RA do aluno a ser atualizado.
	 * @param aluno O aluno com os dados editados.
	 * @return true caso o aluno tenha sido atualizado, e false caso contrário.
	 */
	@PutMapping(value="{ra}")
	public ResponseEntity<Boolean> atualizar(@PathVariable("ra") Long ra, @RequestBody Aluno aluno) {
		return ResponseEntity.ok(alunoService.atualizar(ra, aluno));
	}
	
	
	/**
	 * Remove um aluno.
	 * @param ra O RA do aluno a ser removido.
	 * @return true caso o aluno tenha sido removido, e false caso contrário.
	 */
	@DeleteMapping(value="{ra}")
	public ResponseEntity<Boolean> remover(@PathVariable("ra") Long ra) {
		return ResponseEntity.ok(alunoService.remover(ra));
	}
	
	
}
