import Validator, { Rules } from 'validatorjs';

export function validateData(data: { [key: string | number]: string | number }, rules: Rules) {
  const validation = new Validator(data, rules);

  if (validation.fails()) throw { errorMessage: validation.errors.all() };
}

//user
export const userSignUpRules = {
  phone: 'string|required',
  password: 'string|required',
  name: 'string|required',
  lastName: 'string|required',
}

export const isUserExistsRules = {
  phone: 'string|required',
}

export const loginRules = {
  phone: 'string|required',
  password: 'string|required',
}

export const createCheckListRules = {
  title: 'string|required',
}