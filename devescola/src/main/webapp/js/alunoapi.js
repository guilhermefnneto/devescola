/** 
 * Objeto que representa os serviços relacionados ao aluno do lado do servidor.
 * Este objeto faz a conexão com o servidor.
 */

var alunoApi = {

	/** Host de conexão com o servidor. */
	host: "http://localhost:9000/escola/aluno",


	/** Aciona o serviço que recupera todos os alunos. */
	obterTodosOsAlunos: function obterTodosOsAlunos(_processarDados) {
		$.getJSON(this.host, function(response) {
			_processarDados(response);
		});
	},

 	/** Aciona o serviço que recupera um aluno identificado pelo seu RA. */
	obterAlunoByRa: function obterAlunoByRa(ra, _processarDados) {
		$.getJSON(this.host+"/"+ra, function(response) {
			_processarDados(response);
		});
	},

	/** Aciona o serviço que inclui um aluno. */
	incluirAluno: function incluirAluno(aluno, _processarResposta) {

	},

	/** Aciona o serviço que atualiza os dados do aluno */
	atualizarAluno: function atualizarAluno(aluno, _processarResposta) {

	},

	/** Aciona o serviço que remove o aluno identificado pelo seu RA. */
	removerAluno: function removerAluno(ra, _processarResposta) {

	}

}