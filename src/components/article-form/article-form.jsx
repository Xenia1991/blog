/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unknown-property */
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { createArticleThunk, editArticleThunk } from '../../redux/my-article-reducer';
import Loader from '../loader';

import classes from './article-form.module.scss';
import schema from './schema';

const ArticleForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.myArticle.isCreatingLoading);
  const createdArticle = useSelector((state) => state.myArticle.article);
  const editedArticle = useSelector((state) => state.articles.article);
  const { slug } = useParams();
  console.log(editedArticle);
  const navigation = useNavigate();
  let userToken;
  let defaultTags;

  if (editedArticle) {
    defaultTags = editedArticle.tagList.map((tag) => {
      return { name: tag };
    });
  }

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
      tagList: editedArticle ? defaultTags : [{ name: '' }],
    },
  });

  if (localStorage.getItem('token') !== null) {
    userToken = JSON.parse(localStorage.getItem('token'));
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const handleCreate = (evt) => {
    const tagsList = [];
    evt.tagList.forEach((tag) => {
      tagsList.push(tag.name);
    });
    const article = {
      title: evt.title,
      description: evt.description,
      body: evt.text,
      tagList: tagsList,
      token: userToken,
    };
    dispatch(createArticleThunk(article));
    reset();
    navigation('/articles');
  };

  const handleEdit = (evt) => {
    const tagsList = [];
    evt.tagList.forEach((tag) => {
      tagsList.push(tag.name);
    });
    const articleInfo = {
      title: evt.title,
      description: evt.description,
      body: evt.text,
      tagList: tagsList,
      token: userToken,
      slug,
    };
    dispatch(editArticleThunk(articleInfo));
    reset();
    navigation('/articles');
  };

  if (isLoading) {
    return <Loader />;
  }
  console.log(createdArticle);
  return (
    <div className={classes['article-form-container']}>
      <form
        className={classes['article-form']}
        onSubmit={editedArticle ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
      >
        <h5 className={classes['article-form__header']}>{editedArticle ? 'Edit article' : 'Create new article'}</h5>
        <label className={classes['article-from__article-title']}>
          <p className={classes['article-form__title']}>Title</p>
          {editedArticle ? (
            <input
              {...register('title')}
              className={classes['article-form__input']}
              defaultValue={editedArticle?.title}
              type="text"
            />
          ) : (
            <input {...register('title')} className={classes['article-form__input']} placeholder="Title" type="text" />
          )}
          <div className={classes['article-form__validation-error']}>{errors?.title?.message}</div>
        </label>
        <label className={classes['article-from__article-description']}>
          <p className={classes['article-form__title']}>Short description</p>
          {editedArticle ? (
            <input
              {...register('description')}
              className={classes['article-form__input']}
              defaultValue={editedArticle?.description}
              type="text"
            />
          ) : (
            <input
              {...register('description')}
              className={classes['article-form__input']}
              placeholder="Description"
              type="text"
            />
          )}
          <div className={classes['article-form__validation-error']}>{errors?.description?.message}</div>
        </label>
        <label className={classes['article-from__article-body']}>
          <p className={classes['article-form__title']}>Text</p>
          {editedArticle ? (
            <textarea
              {...register('text')}
              className={classes['article-form__textarea']}
              defaultValue={editedArticle?.body}
              type="text"
            />
          ) : (
            <textarea
              {...register('text')}
              className={classes['article-form__textarea']}
              placeholder="Text"
              type="text"
            />
          )}

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
                      {...register(`tagList.${index}.name`)}
                      className={classes['article-form__tag-input']}
                      {...field}
                      defaultValue={editedArticle ? field.name : null}
                    />
                  )}
                  name={`tagList.${index}.name`}
                  control={control}
                />
                {fields.length !== 1 ? (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={classes['article-form__delete-button']}
                  >
                    Delete
                  </button>
                ) : null}
                {fields.length - 1 === index ? (
                  <button
                    className={classes['article-form__add-button']}
                    type="button"
                    onClick={() => append({ name: '' })}
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
