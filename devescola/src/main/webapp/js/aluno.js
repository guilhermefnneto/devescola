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
				$('<td>').text(item.ra).css("text-align","right"),
				$('<td>').text(item.nome),
				$('<td>').text(item.sexo).css("text-align","center"),
				$('<td>').text(item.dataNascimento).css("text-align","center").attr("data-formatter", "dataFormatter")
			);

			$tbody.append($tr);
		});

		$tbody.find('td[data-formatter="dataFormatter"]').each(function(i, item) {
			var $item = $(item);
			var value = _dataFormatter($item.text());
			$item.text(value);
		});
	}

	function _dataFormatter(value) {
		return moment(value).format('DD/MM/YYYY');
	}

};

$(document).ready(aluno);