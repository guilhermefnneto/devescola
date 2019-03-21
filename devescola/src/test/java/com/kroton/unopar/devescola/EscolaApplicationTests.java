package com.kroton.unopar.devescola;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.kroton.unopar.devescola.model.Aluno;
import com.kroton.unopar.devescola.model.Sexo;


/**
 * Classe responsável por realizar todos os testes da aplicação. 
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes={EscolaApplicationTests.class})
public class EscolaApplicationTests {
	
	
	private final String host = "http://localhost:9000/escola";
	
	
	/**
	 * Teste para inserir um aluno.
	 * @throws URISyntaxException 
	 * @throws RestClientException 
	 * @throws ParseException 
	 */
	@Test
	public void inserirAluno() throws RestClientException, URISyntaxException, ParseException {
		
		RestTemplate restTemplate = new RestTemplate();
				
		Aluno aluno = new Aluno();
		aluno.setNome("Luca del Toro");
		aluno.setDataNascimento(new SimpleDateFormat("dd/MM/yyyy").parse("04/05/1981"));
		aluno.setSexo(Sexo.MASCULINO);
		
		ResponseEntity<Aluno> responseEntity = restTemplate.postForEntity(new URI(host + "/aluno"), aluno, Aluno.class);
		
		Assert.assertNotEquals(null, responseEntity);
		Assert.assertEquals("Luca del Toro", aluno.getNome());
		
	}
	
    
	/**
	 * Teste para recuperar todos os alunos cadastrados.
	 * @throws RestClientException
	 * @throws URISyntaxException
	 */
	@Test
	public void obterTodosOsAlunos() throws RestClientException, URISyntaxException {
		
		RestTemplate restTemplate = new RestTemplate();
		
		ResponseEntity<Iterable> responseEntity = restTemplate.getForEntity(new URI(host + "/aluno"), Iterable.class);
		
		Assert.assertEquals(true, responseEntity.getBody().iterator().hasNext());
		
	}
	
	
	/**
	 * Teste para recuperar um aluno cadastrado identificado pelo seu RA. 
	 * @throws URISyntaxException 
	 * @throws RestClientException 
	 */
	@Test
	public void obterAluno() throws RestClientException, URISyntaxException {
		
		RestTemplate restTemplate = new RestTemplate();
		
		ResponseEntity<Aluno> responseEntity = restTemplate.getForEntity(new URI(host + "/aluno/" + 4), Aluno.class);
		
		Assert.assertNotEquals(null, responseEntity.getBody());
		Assert.assertEquals("João da Silva", responseEntity.getBody().getNome());
		
	}
	
	
	/**
	 * Teste para atualizar os dados do aluno identificado pelo seu RA.
	 * @throws URISyntaxException 
	 * @throws RestClientException 
	 * @throws ParseException 
	 */
	@Test
	public void atualizarAluno() throws RestClientException, URISyntaxException, ParseException {
		
		RestTemplate restTemplate = new RestTemplate();
		
		Aluno aluno = new Aluno();
		aluno.setDataNascimento(new SimpleDateFormat("dd/MM/yyyy").parse("12/10/1942"));
		
		restTemplate.put(new URI(host + "/aluno/" + 5), aluno);
		
	}
	
	
	/**
	 * Teste para remover um aluno identificado pelo seu RA.
	 * @throws URISyntaxException 
	 * @throws RestClientException 
	 */
	@Test
	public void removerAluno() throws RestClientException, URISyntaxException {
		
		RestTemplate restTemplate = new RestTemplate();
		
		restTemplate.delete(new URI(host + "/aluno/" + 9));
		
	}
	
}
