import { api } from 'src/boot/axios'
import qs from 'qs'

export async function getAPI (url, opts = {}) {
  if (opts.params) {
    opts.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }

  return new Promise((resolve, reject) => {
    api.get(url, opts)
      .then(response => {
        resolve(response?.data)
      })
      .catch(err => {
        reject(err?.response)
      })
  })
}

export async function postAPI (url, data, opts = {}) {
  return new Promise((resolve, reject) => {
    api.post(url, data, opts)
      .then(response => {
        resolve(response?.data)
      })
      .catch(err => {
        reject(err?.response)
      })
  })
}

export async function putAPI (url, data, opts = {}) {
  return new Promise((resolve, reject) => {
    api.put(url, data, opts)
      .then(response => {
        resolve(response?.data)
      })
      .catch(err => {
        reject(err?.response)
      })
  })
}

export async function deleteAPI (url, opts = {}) {
  return new Promise((resolve, reject) => {
    api.delete(url, opts)
      .then(response => {
        resolve(response?.data)
      })
      .catch(err => {
        reject(err?.response)
      })
  })
}

