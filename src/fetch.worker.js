onmessage = function ({
  data: {
    url, requestData
  }
}) {
  fetch(url, requestData)
    .then(resp => resp.json())
    .then(data => {
      postMessage({ response: data })
    })
    .catch(reason => {
      postMessage({ error: reason })
    })
}