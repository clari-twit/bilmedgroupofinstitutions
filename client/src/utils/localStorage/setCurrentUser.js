export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  } catch (error) {
    console.log(error);
  }
};
