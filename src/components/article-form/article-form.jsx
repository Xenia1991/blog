import classes from './article-form.module.scss';

const ArticleForm = () => {
  return (
    <div className={classes['article-form-container']}>
      <form className={classes['article-form']}>
        <h5 className={classes['article-form__header']}>Create new article</h5>
        <label className={classes['article-from__article-title']}>
          <p className={classes['article-form__title']}>Title</p>
          <input className={classes['article-form__input']} placeholder="Title" />
        </label>
        <label className={classes['article-from__article-description']}>
          <p className={classes['article-form__title']}>Short description</p>
          <input className={classes['article-form__input']} placeholder="Description" />
        </label>
        <label className={classes['article-from__article-body']}>
          <p className={classes['article-form__title']}>Text</p>
          <textarea className={classes['article-form__textarea']} placeholder="Text" />
        </label>
        <div className={classes['article-form__tags-area']}>
          <p className={classes['article-form__title']}>Tags</p>
          <div className={classes['article-form__single-tag']}>
            <input className={classes['article-form__tag-input']} />
            <button className={classes['article-form__delete-button']} type="submit">
              Delete
            </button>
          </div>
          <div className={classes['article-form__single-tag']}>
            <input className={classes['article-form__tag-input']} />
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
