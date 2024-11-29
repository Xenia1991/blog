import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './article-form.module.scss';
import schema from './schema';

const ArticleForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (evt) => {
    console.log(evt);
  };

  return (
    <div className={classes['article-form-container']}>
      <form className={classes['article-form']} onSubmit={handleSubmit(onSubmit)}>
        <h5 className={classes['article-form__header']}>Create new article</h5>
        <label className={classes['article-from__article-title']}>
          <p className={classes['article-form__title']}>Title</p>
          <input {...register('title')} className={classes['article-form__input']} placeholder="Title" type="text" />
          <div className={classes['article-form__validation-error']}>{errors?.title?.message}</div>
        </label>
        <label className={classes['article-from__article-description']}>
          <p className={classes['article-form__title']}>Short description</p>
          <input
            {...register('description')}
            className={classes['article-form__input']}
            placeholder="Description"
            type="text"
          />
          <div className={classes['article-form__validation-error']}>{errors?.description?.message}</div>
        </label>
        <label className={classes['article-from__article-body']}>
          <p className={classes['article-form__title']}>Text</p>
          <textarea
            {...register('text')}
            className={classes['article-form__textarea']}
            placeholder="Text"
            type="text"
          />
          <div className={classes['article-form__validation-error']}>{errors?.text?.message}</div>
        </label>
        <div className={classes['article-form__tags-area']}>
          <p className={classes['article-form__title']}>Tags</p>
          <div className={classes['article-form__single-tag']}>
            <input className={classes['article-form__tag-input']} type="text" />
            <button className={classes['article-form__delete-button']} type="submit">
              Delete
            </button>
            <button className={classes['article-form__add-button']} type="submit">
              Add tag
            </button>
          </div>
        </div>
        <button type="submit" className={classes['article-form__button']}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
