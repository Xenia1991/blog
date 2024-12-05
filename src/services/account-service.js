/* eslint-disable quote-props */
/* eslint-disable key-spacing */
/* eslint-disable prettier/prettier */
export const apiBase = 'https://blog-platform.kata.academy/api';

export const createAccount = async (userInfo, rejected) => {
  const user = { user: { username: userInfo.username, email: userInfo.email, password: userInfo.password } };
  try {
    const singUpRequest = await fetch(`${apiBase}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!singUpRequest.ok) {
      throw new Error('error in signUpRequest');
    }
    const succesSignUp = await singUpRequest.json();
    return succesSignUp;
  } catch (error) {
    return rejected(error);
  }
};

export const enterAccount = async (userInfo, rejected) => {
  const user = { user: { email: userInfo.email, password: userInfo.password } };
  try {
    const signInRequest = await fetch(`${apiBase}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!signInRequest.ok) {
      throw new Error('error in signInRequest');
    }
    const successSignIn = await signInRequest.json();
    return successSignIn;
  } catch (error) {
    return rejected(error);
  }
};

export const editProfile = async (userInfo, rejected) => {
  try {
    const user = {
      user: {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        image: userInfo.avatar,
        token: userInfo.token,
      },
    };
    const editProfileRequest = await fetch(`${apiBase}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${userInfo.token}` },
      body: JSON.stringify(user),
    });
    if (!editProfileRequest.ok) {
      throw new Error('error in editProfileRequest');
    }
    const successEditing = editProfileRequest.json();
    return successEditing;
  } catch (error) {
    return rejected(error);
  }
};
