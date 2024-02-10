export const setNotificationCount = (data) => {
  return {
    type: 'USER_NOTIFICATION_COUNT',
    payload: data
  }
}

export const setUpdateUserData = (data) => {
  return {
    type: 'UPDATE_USERDATA',
    payload: data
  }
}
