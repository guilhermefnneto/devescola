/** 
 * Objeto que representa os serviços relacionados ao aluno do lado do servidor.
 * Este objeto faz a conexão com o servidor.
 */

var alunoApi = {

	/** Host de conexão com o servidor. */
	host: "http://localhost:9000/escola/aluno",


	/** Aciona o serviço que recupera todos os alunos. */
	obterTodosOsAlunos: function obterTodosOsAlunos(_processarDados, _processarErro) {
		$.ajax({
			url: this.host,
			method: 'GET',
			data: null,
			success: function(response) {
				_processarDados(response);
			},
			error: function(response) {
				_processarErro(response);
			}
		});
	},

 	/** Aciona o serviço que recupera um aluno identificado pelo seu RA. */
	obterAlunoByRa: function obterAlunoByRa(ra, _processarDados, _processarErro) {
		$.ajax({
			url: this.host + '/' + ra,
			method: 'GET',
			data: null,
			success: function(response) {
				_processarDados(response);
			},
			error: function(response) {
				_processarErro(response);
			}
		});
	},

	/** Aciona o serviço que inclui um aluno. */
	incluirAluno: function incluirAluno(aluno, _processarResposta) {
		$.ajax({
			url: this.host,
			method: 'POST',
			data: aluno,
			success: function(response) {
				_processarResposta(response);
			},
			error: function(response) {
				_processarResposta(response);
			}
		});
	},

	/** Aciona o serviço que atualiza os dados do aluno */
	atualizarAluno: function atualizarAluno(aluno, _processarResposta) {
		console.log('ra/atualizar: ', ra, aluno);


		$.ajax({
			url: this.host + "/" + aluno.ra,
			method: 'PUT',
			contentType: "application/json; charset=utf-8",
			data: aluno,
			success: function(response) {
				_processarResposta(response);
			},
			error: function(response) {
				_processarResposta(response);
			}
		});
	},

	/** Aciona o serviço que remove o aluno identificado pelo seu RA. */
	removerAluno: function removerAluno(ra, _processarResposta) {
		$.ajax({
			url: this.host + "/" + ra,
			method: 'DELETE',
			data: null,
			success: function(response) {
				_processarResposta(response);
			},
			error: function(response) {
				_processarResposta(response);
			}
		});
	}

}