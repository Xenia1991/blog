/* eslint-disable prefer-regex-literals */
import * as yup from 'yup';

const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const schema = yup.object().shape({
  email: yup.string().required('Обязательное поле').matches(regExpEmail, 'Wrong email format'),
  password: yup.string().required('Обязательное поле').min(3, 'Your password needs to be at least 3 characters'),
});
