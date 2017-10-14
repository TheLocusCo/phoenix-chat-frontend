import * as http from "./http"
import * as sync from "./sync"

export function userAuth() {
  return async dispatch => {
    const response = await http.userAuth()
    if (response.status !== 200) {
      dispatch(sync.userAuthFailure())
    } else {
      const result = await response.json()
      dispatch(sync.userAuthSuccess(result.data))
    }
  }
}

export function organizationNew(organization) {
  return async dispatch => {
    const response = await http.organizationNew(organization)
    if (response.status !== 200) {
      dispatch(sync.organizationNewFailure())
    } else {
      const result = await response.json()
      dispatch(sync.organizationNewSuccess(result.data))
      dispatch(userAuth())
    }
  }
}

export function userNew(user) {
  return async dispatch => {
    const response = await http.userNew()
    if (response.status !== 200) {
      dispatch(sync.userNewFailure(user))
    } else {
      const result = await response.json()
      localStorage.token = res.data.token
      dispatch(sync.userNewSuccess(result.data))
      dispatch(userAuth())
    }
  }
}

export function userLogin(user) {
  return async dispatch => {
    const response = await http.userLogin()
    if (response.status !== 200) {
      dispatch(sync.userLoginFailure())
    } else {
      const result = await response.json()
      localStorage.token = res.data.token
      dispatch(sync.userLoginSuccess(result.data))
      dispatch(userAuth())
    }
  }
}
