const INIT_STATE = {
  tableRowSelect: null
};

export const selectedTableRowReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SELCTED_ROW_DATA':
      return {
        ...state,
        tableRowSelect: action.payload
      }
    default:
      return state
  }
}
