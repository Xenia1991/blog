/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unknown-property */
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './article-form.module.scss';
import schema from './schema';

const ArticleForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      tagList: [{ tag: 'first' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (evt) => {
    console.log(evt);
  };

  console.log(fields);

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
        <form className={classes['article-form__tags-area']}>
          <p className={classes['article-form__title']}>Tags</p>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className={classes['article-form__single-tag']}>
                <Controller
                  render={({ field }) => (
                    <input
                      {...register(`tagList.${index}.tag`)}
                      className={classes['article-form__tag-input']}
                      {...field}
                    />
                  )}
                  name={`tagList.${index}.tag`}
                  control={control}
                />
                <button type="button" onClick={() => remove(index)} className={classes['article-form__delete-button']}>
                  Delete
                </button>
                {fields.length - 1 === index ? (
                  <button
                    className={classes['article-form__add-button']}
                    type="button"
                    onClick={() => append({ tag: 'first' })}
                  >
                    Add tag
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </form>
        <button type="submit" className={classes['article-form__button']} disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
