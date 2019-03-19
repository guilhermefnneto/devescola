/* Objeto que representa o cadastro do aluno. */

var aluno = function() {
	"use strict";


	var $tabAlunos       = $('#tabAlunos'),
		$modalFormAluno  = $('#modalFormAluno'),
	    $formAluno       = $('#formAluno'),
	    modo             = null;


	_init();


	/** Inicializa a página, carregando os alunos previamente cadastrados. */
	function _init () {
		$tabAlunos.find('thead th div a').click(function() {
			novo();
		});

		$modalFormAluno.find('#actSalvar').click(function() {
			salvar();
		});

		alunoApi.obterTodosOsAlunos(preencherTabelaDeAlunos, processarErro);
	}


	/** Preenche a grid que representa os alunos. */
	function preencherTabelaDeAlunos(alunos) {
		var $tbody = $tabAlunos.find('tbody');

		if (!Array.isArray(alunos)) {
			alunos = [alunos];
		}

		$.each(alunos, function(i, aluno) {
			var $tr = $('<tr>').append(
				$('<td>').text(aluno.ra).css("text-align","right"),
				$('<td>').text(aluno.nome),
				$('<td>').text(aluno.sexo).css("text-align","center"),
				$('<td>').text(_dataFormatter(aluno.dataNascimento)).css("text-align","center").attr("data-formatter", "dataFormatter")
			);

			var $iconEdit = $('<i>').addClass("fa fa-pencil").css("cursor", "pointer");
			var $aEdit = $('<a>').attr("title", "Editar").append($iconEdit);
			$aEdit.click(function(){
				editar(aluno.ra);
			});

			var $iconRemove = $('<i>').addClass("fa fa-trash").css("cursor", "pointer");
			var $aRemove = $('<a>').attr("title", "Remover").append($iconRemove);
			$aRemove.click(function() {
				remover(aluno.ra);
			});

			var $divAct = $('<div>').css("display", "inline").css("margin-right", "5px");
			$divAct.append($aEdit);
			$divAct.append($aRemove);

			var $tdAct = $('<td>').css("text-align", "center");
			$tdAct.append($divAct);

			$tr.append($tdAct);

			$tbody.append($tr);
		});

	}

	/** Formata uma data para a máscara DD/MM/YYYY. */
	function _dataFormatter(value) {
		return moment(value).format('DD/MM/YYYY');
	}

	/** Abre o formulário para o registro de um novo aluno. */
	function novo() {
		limparForm();

		modo = 'novo';
		
		$modalFormAluno.modal();
	}

	/** Carrega o formulário com os dados do aluno a ser atualizado, identificado pelo seu ra. */
	function editar(ra) {
		modo = 'edição';

		alunoApi.obterAlunoByRa(ra, preencherFormulario, processarErro);
	}

	/** Solicita a remoção de um aluno do quadro de alunos. */
	function remover(ra) {
		console.log('remove: ', ra);
	}


	/** Limpa o formulário. */
	function limparForm() {
		$formAluno[0].reset();
	}


	/** Salva o aluno editado ou o novo aluno informado. */
	function salvar() {
		var metodo = modo === 'edição' ?'PUT' :'POST';

		var aluno = {
			ra: $formAluno.find('input[name="ra"]').val(),
			nome: $formAluno.find('input[name="nome"]').val(),
			sexo: $formAluno.find('input[name="sexo"]:checked').val(),
			dataNascimento: $formAluno.find('input[name="dataNascimento"]').val(),
		};

		if (modo === 'edição') {
			alunoApi.atualizarAluno(aluno, _processarGravacaoDoFormulario);
		} else {
			alunoApi.incluirAluno(aluno, _processarGravacaoDoFormulario);
		}

	}


	/** Preenche o formulário com os dados do aluno passado como argumento. */
	function preencherFormulario(aluno) {
		$formAluno.find('input[name="ra"]').val(aluno.ra);
		$formAluno.find('input[name="nome"]').val(aluno.nome);
		$formAluno.find('input[name="sexo"][value="'+aluno.sexo+'"]').prop("checked", true);
		$formAluno.find('input[name="dataNascimento"]').val(aluno.dataNascimento);

		$modalFormAluno.modal();
	}


	/** Processa a resposta  */
	function _processarGravacaoDoFormulario(response) {
		console.log('dados refletidos: ',response);
	}

	/** Emite uma mensagem de sucesso. */
	function processarSucesso(data) {
		console.log('Sucesso na operação!');
		console.log('sucesso: ', data);
	}

	/** Emite uma mensagem de erro. */
	function processarErro(error) {
		console.log('Erro na operação!');
		console.log('erro: ', error);
	}


	return {
		editar: editar,
		remover: remover,
		novo: novo
	}

};

$(document).ready(aluno);