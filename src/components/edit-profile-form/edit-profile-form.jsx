import classes from './edit-profile-form.module.scss';

const EditProfileForm = () => {
  return (
    <div className={classes['edit-form-container']}>
      <form method="put" className={classes['edit-form']}>
        <h5 className={classes['edit-form__header']}>Edit Profile</h5>
        <label className={classes['edit-form__username-label']}>
          <p className={classes['edit-form__text']}>Username</p>
          <input className={classes['edit-form__input']} />
        </label>
        <label className={classes['edit-form__email-label']}>
          <p className={classes['edit-form__text']}>Email address</p>
          <input className={classes['edit-form__input']} />
        </label>
        <label className={classes['edit-form__password-label']}>
          <p className={classes['edit-form__text']}>New password</p>
          <input className={classes['edit-form__input']} />
        </label>
        <label className={classes['edit-form__avatar-label']}>
          <p className={classes['edit-form__text']}>Avatar image (url)</p>
          <input className={classes['edit-form__input']} />
        </label>
        <button type="submit" className={classes['edit-form__button']}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
