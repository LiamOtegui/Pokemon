import { toTitleCase } from "./helpers";

export const validateCreate = (inputs) => {
  const errors = {};

  const formFields = Object.keys(inputs);
  for (const field of formFields) {
    if (!inputs[field]) {
      errors[field] = `${toTitleCase(field)} is required`;
    }

    if (field === 'name' || field === 'type' || field === 'subType') {
      console.log(field, 'field')
      if (!/^[a-zA-Z]+$/.test(inputs[field])) { // El regex valida que sean letras.
        errors[field] = `${toTitleCase(field)} must contain only letters.`;
      }
    }
  }
  console.log(errors, "ERRORS")
  return errors;
};