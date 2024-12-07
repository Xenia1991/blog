import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Required filed').trim(),
  description: yup.string().required('Required field').trim(),
  text: yup.string().required('Required field').trim(),
  tagList: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Tag is required'),
    })
  ),
});

export default schema;
