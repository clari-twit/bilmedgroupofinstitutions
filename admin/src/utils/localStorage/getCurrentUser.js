export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('current_user') != null
        ? JSON.parse(localStorage.getItem('current_user'))
        : null;
  } catch (error) {
    user = null;
  }
  return user;
};
