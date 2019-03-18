/* Objeto que representa o cadastro do aluno. */

var aluno = function() {
	"use strict";


	var tabAlunos = $('#tab-alunos');


	_init();


	function _init () {
		alunoApi.obterTodosOsAlunos(_preencherTabelaDeAlunos);
	}


	function _preencherTabelaDeAlunos(alunos) {
		var $tbody = tabAlunos.find('tbody');

		if (!Array.isArray(alunos)) {
			alunos = [alunos];
		}

		$.each(alunos, function(i, item) {
			var $tr = $('<tr>').append(
				$('<td>').css("text-align","right").text(item.ra),
				$('<td>').text(item.nome),
				$('<td>').css("text-align","center").text(item.sexo),
				$('<td>').css("text-align","center").text(item.dataNascimento)
			);

			$tbody.append($tr);
		});
	}

};

$(document).ready(aluno);