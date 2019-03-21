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

		_refreshAlunos();
	}


	/** Atualiza a grid de alunos. */
	function _refreshAlunos() {
		$tabAlunos.find('tbody').text('');

		alunoApi.obterTodosOsAlunos(_preencherTabelaDeAlunos, _processarErro);
	}


	/** Preenche a grid que representa os alunos. */
	function _preencherTabelaDeAlunos(alunos) {
		$modalFormAluno.modal('hide');

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

		_processarSucesso();

	}

	/** Formata uma data para a máscara DD/MM/YYYY. */
	function _dataFormatter(value) {
		return value ?moment(value).format('DD/MM/YYYY') :"";
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

		alunoApi.obterAlunoByRa(ra, _preencherFormulario, _processarErro);
	}

	/** Solicita a remoção de um aluno do quadro de alunos. */
	function remover(ra) {
		$.confirm({
			title: '',
			content: '<div style="text-align: center;">Remover o aluno?</div>',
			buttons: {
				Sim: {
					btnClass: 'btn-primary center-block',

					action: function() {
						alunoApi.removerAluno(ra, _refreshAlunos, _processarErro);
					}
				},
				Nao: {
					text: 'N&atilde;o',
					btnClass: 'center-block',
					action: function() {
					
					}
				}
			}
      	});
	}


	/** Limpa o formulário. */
	function limparForm() {
		$formAluno[0].reset();
	}


	/** Salva o aluno editado ou o novo aluno informado. */
	function salvar() {
		if (!_validarAluno()) {
			return ;
		}

		var metodo = modo === 'edição' ?'PUT' :'POST';

		var aluno = {
			ra: $formAluno.find('input[name="ra"]').val(),
			nome: $formAluno.find('input[name="nome"]').val(),
			sexo: $formAluno.find('input[name="sexo"]:checked').val(),
			dataNascimento: $formAluno.find('input[name="dataNascimento"]').val(),
		};

		if (modo === 'edição') {
			alunoApi.atualizarAluno(aluno, _refreshAlunos, _processarErro);
		} else {
			alunoApi.incluirAluno(aluno, _refreshAlunos, _processarErro);
		}

	}


	/** Valida a obrigatoriedade dos dados do aluno. */
	function _validarAluno() {
		var validated = true;

		if (!$formAluno.find('input[name="nome"]').val()) {
			_processarErro('O nome precisa ser informado!');
			validated = false;
		}

		return validated;
	}


	/** Preenche o formulário com os dados do aluno passado como argumento. */
	function _preencherFormulario(aluno) {
		$formAluno.find('input[name="ra"]').val(aluno.ra);
		$formAluno.find('input[name="nome"]').val(aluno.nome);
		$formAluno.find('input[name="sexo"][value="'+aluno.sexo+'"]').prop("checked", true);
		$formAluno.find('input[name="dataNascimento"]').val(aluno.dataNascimento);

		$modalFormAluno.modal();
	}


	/** Processa o sucesso da operação. Emite uma mensagem. */
	function _processarSucesso(response) {
		$.notify({
			message: 'Sucesso' 
		},{
			type: 'success',
			delay: 2000,
			allow_dismiss: false,
			onShow: function() {
				this.css({'width':'auto', 'height':'auto'});
			}
		});
	}

	/** Processa o erro da operação. Emite uma mensagem*/
	function _processarErro(error) {
		$.notify({
			message: typeof error === 'string' ?error :'Erro' 
		},{
			type: 'danger',
			delay: 2000,
			allow_dismiss: false,
			onShow: function() {
				this.css({'width':'auto', 'height':'auto'});
			}
		});
	}


	return {
		editar: editar,
		remover: remover,
		novo: novo
	}

};

$(document).ready(aluno);