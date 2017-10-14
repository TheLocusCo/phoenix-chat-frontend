const API_HOST = "http://192.168.195.158:4000"

export function userAuth() {
  return fetch(`${API_HOST}/auth/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
}

export function organizationNew(organization) {
  return fetch(`${API_HOST}/api/organizations`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ organization })
  })
}

export function userNew(user) {
  return fetch(`${API_HOST}/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  })
}

export function userLogin(user) {
  return fetch(`${API_HOST}/auth/identity/callback`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
}
