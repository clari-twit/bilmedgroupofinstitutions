const INIT_STATE = {
  sidebarData: true
};

export const sidebarReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'USER_SIDEBAR_OPEN':
      return {
        ...state,
        sidebarData: action.payload
      }
    default:
      return state
  }
}
