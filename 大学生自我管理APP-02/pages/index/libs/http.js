export function uniHttpGet(name) {
  return new Promise((resolve, reject) => {
    uniCloud.callFunction({
      name
    }).then(res => {
      resolve(res.result)
    }).catch((err) => {
      reject(err)
    })
  }).catch((e) => {})
}

export function uniHttpPost(name, body) {
  return new Promise((resolve, reject) => {
    uniCloud.callFunction({
      name,
      data: body
    }).then(res => {
      resolve(res.result)
    }).catch((err) => {
      reject(err)
    })
  }).catch((e) => {})
}
