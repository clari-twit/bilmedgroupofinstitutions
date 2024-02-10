const INIT_STATE = {
  notificationCount: [{
    pageData: [],
    pageInformation: ''
  }]
};

export const headerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'USER_NOTIFICATION_COUNT':
      return {
        ...state,
        notificationCount: action.payload
      }
    default:
      return state
  }
}

export const sendUserDetailsReducer = (state = { userData: null }, action) => {
  switch (action.type) {
    case 'UPDATE_USERDATA':
      return {
        updateUserData: action.payload
      }
    default:
      return { updateUserData: state.userData }
  }
}
