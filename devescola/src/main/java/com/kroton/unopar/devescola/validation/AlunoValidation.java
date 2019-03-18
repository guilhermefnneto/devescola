package com.kroton.unopar.devescola.validation;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.kroton.unopar.devescola.model.Aluno;

/**
 * Validação do aluno.
 */
public class AlunoValidation implements Validator {

	
	@Override
	public boolean supports(Class<?> clazz) {
		return Aluno.class.isAssignableFrom(clazz);
	}
	
	
	@Override
	public void validate(Object target, Errors errors) {
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "nome", "field.required", "O nome do aluno deve ser informado!");
		
	}
	
}
