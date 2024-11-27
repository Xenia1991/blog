export const createAccount = async (userinfo, rejected) => {
  const user = { user: { username: userinfo.username, email: userinfo.email, password: userinfo.password } };
  try {
    const singUpRequest = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!singUpRequest.ok) {
      throw new Error('error in signUpRequest');
    }
    const succesRegistration = await singUpRequest.json();
    return succesRegistration;
  } catch (error) {
    return rejected(error);
  }
};
