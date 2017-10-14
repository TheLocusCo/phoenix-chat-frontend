export const userAuthSuccess = user => ({
  type: "USER_AUTH",
  payload: {
    user
  }
})

export const userAuthFailure = () => ({
  type: "USER_AUTH_FAILURE"
})

export const organizationNewSuccess = () => ({
  type: "ORGANIZATION_NEW"
})

export const organizationNewFailure = () => ({
  type: "ORGANIZATION_NEW_ERROR"
})

export const userNewSuccess = user => ({
  type: "USER_NEW",
  payload: {
    user
  }
})

export const userLoginSuccess = user => ({
  type: "USER_LOGIN",
  payload: {
    user
  }
})
