// Authentication api for endPoint
export const authenticationApiEndPoint = {
  LOGIN_API: '/api/user/auth',
  FORGOTPASSWORD_API: '/auth/forgot-password',
  RESETPASSWORD_API: '/auth/reset-password?token=',
  GET_COUNTRY_CODE: '/country-code/list',
  CHANGE_BLOCKED_PASSWORD_API: '/auth/change-expired-password?token',
};

// Admin panel api for endPoint
export const adminPanelApiEndPoint = {
  GET_ROLE_API: '/employee/role/list',
  SEND_INVITATION_FOR_ADD_EMP: '/employee/send-invitation',
  GET_EMPLOYEE_LIST: '/employee/list',
  GET_REQUEST_LIST: '/request/list',
  PATCH_UPDATE_STATUS_REQUEST: '/request/update-status',
  UPDATE_USER_DETAILS: '/employee/edit-role',
  GET_TEMPLATE_EXPORT_DATA: '/employee/template-export',
  GET_EXPORT_DATA: '/employee/export',
  IMPORT_USER_DATA: '/employee/import',
  DELETE_EMPLOYEE_DATA: '/employee/delete',
  RESETPASSWORD_API: '/employee/multiple-reset-password',
  REORDER_EMPLOYEE_API: '/employee/reorder',
  INSERT_ROLE: '/employee/role/add',
  DELETE_ROLE: '/employee/role/delete',
  EXPORT_ROLE: '/employee/role/export',
  UPDATE_ROLE: '/employee/role/edit',
  REORDER_ROLE: '/employee/role/reorder',
  ROLE_MODULE_LIST_API: '/employee/role-permission/list',
  ROLE_MODULE_DELETE_API_CALL: '/role-permission/delete',
  ROLE_MODULE_EXPORT: '/employee/role-permission/export',
  ROLE_MODULE_UPDATE: '/employee/role-permission/edit',
  REORDER_ROLE_MODULES: 'employee/role-permission/reorder',
  INSERT_ROLE_VERSION: '/employee/role-version/add',
  ROLE_VERSION_LIST: '/employee/role-version/list',
  DELETE_ROLE_VERSION: '/employee/role-version/delete',
  EXPORT_ROLE_VERSION: '/employee/role-version/export',
  EDIT_ROLE_VERSION: '/employee/role-version/edit',
  REORDER_ROLE_VERSION: '/employee/role-version/reorder',
  ROLE_ACTION_LIST: '/employee/role-actions/list',
  EDIT_ROLE_ACTION: '/employee/role-actions/edit',
  EXPORT_ROLE_ACTION: '/employee/role-actions/export',
  ROLE_LIST: '/employee/role-list/get',
  EXPORT_ROLE_LIST: '/employee/role-list/export',
  EDIT_ROLE_LIST: '/employee/role-list/edit',
};

// Employee panel api for endPoint
export const employeePanelApiEndPoint = {
  ADD_EMPLOYEE_DETAILS: '/auth/add-employee?token=',
}

// Common api for endPoint
export const CommonApiEndPoint = {
  CHANGE_PASSWORD_API: '/auth/change-password',
  GET_PROFILE_DETAILS: '/auth/get-profile',
  UPDATE_PROFILE_DETAILS: '/auth/edit',
}

// unblock user details api for endpoint
export const unblockUserApiEndPoint = {
  UNBLOCK_USER_API: '/auth/send-unblock-request?token=',
}

// Company onboard api for endPoint
export const companyOnboardApiEndPoint = {
  GET_COMPANY_ONBOARD_DATA: '/company/list',
  GET_COMPANY_BY_ID: '/company/get',
  ADD_COMPANY_ONBOARD_DATA: '/company/add',
  UPDATE_STATUS_COMPANY_ONBOARD: '/company/edit-status',
  UPDATE_DETAILS_COMPANY_ONBOARD: '/company/edit',
  UPDATE_DETAILS_EMPLOYEE: '/employee/update-status',
}

// Company onboard api for endPoint
export const versionApiEndPoint = {
  GET_VERSION: '/version/get',
  INSERT_VERSION: '/version/add',
  EXPORT_VERSION: '/version/export',
  DELETE_VERSION: '/version/delete',
  REORDER_VERSION: '/version/reorder',
  EDIT_VERSION: '/version/edit',
  IMPORT_VERSION: '/version/import',
  IMPORT_VERSION_SAVE: '/version/save',
  GET_TEMPLATE_VERSION: '/version/export-template',
}

// notification api endpoint
export const notificationApiEndPoint = {
  NOTIFICATION_API: '/notifications/list',
  UPDATE_NOTIFICATION_API: '/notifications/edit',
}

// Action api for endPoint
export const actionApiEndPoint = {
  GET_ACTION: '/actions/get',
  DELETE_ACTION: '/actions/delete',
  REORDER_ACTION: '/actions/reorder',
  EDIT_ACTION: '/actions/edit',
  ADD_ACTION: '/actions/add',
  ADD_ACTION_PROCESSES: '/actions/add?action_type=processes',
  ADD_ACTION_ORDER_LIST: '/actions/add?action_type=order_list',
  CREATE_ACTION: '/actions/add?action_type=other_actions',
}
