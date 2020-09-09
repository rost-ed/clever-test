import FetchWorker from '../fetch.worker.js'

const fetchWithWorker = (url, requestData) => {
  const worker = new FetchWorker()
  return new Promise(
    (res, rej) => {
      const workerMessageHandler = ({
        data: { response, error }
      }) => {
        worker.terminate()
        if (response) res(response)
        rej(error)
      }

      worker.addEventListener('message', workerMessageHandler)
      worker.postMessage({ url, requestData })
    }
  )
}

export default fetchWithWorker
