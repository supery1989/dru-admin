function parseJSON(response: any) {
  return response.json()
}

function checkStatus(response: any) {
  if(response.status >= 200 && response.status < 500){
    return response
  }
  const error: any = new Error(response.statusText)
  error.response = response
  throw error
}

export default function request(options: any = {}) {
  const { data,url } = options
  options = {...options}
  options.mode = 'cors'//跨域
  delete options.url
  if(data){
    delete options.data
    options.body = JSON.stringify(data)
  }
  options.headers={
    'Content-Type':'application/json'
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err=>({err}))
}
