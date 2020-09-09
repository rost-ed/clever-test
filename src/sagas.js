import 'regenerator-runtime/runtime'
import { put, all, takeEvery} from 'redux-saga/effects'
import { loadFormMetaSucceeded, sendFormSucceeded } from './actions'
import fetchWithWorker from './utils/fetchWithWorker'


function* fetchFormMeta() {
  try {
    const formMeta = yield fetchWithWorker(
      'http://test.clevertec.ru/tt/meta',
    )

    yield put(loadFormMetaSucceeded(formMeta))
  } catch (error) {
    console.log(error)
  }
}

function* watchFormMeta() {
  yield takeEvery('LOAD_FORM_META', fetchFormMeta)
}

function* sendForm({ payload }) {
  try {
    const resp = yield fetchWithWorker(
      // '/form-submit',
      'http://test.clevertec.ru/tt/data',
      {
        method: 'POST',
        body: JSON.stringify({ form: payload })
      }
    )

    yield put(sendFormSucceeded(resp.result))
  } catch (error) {
    console.log(error)
  }
}

function* watchSendForm() {
  yield takeEvery('SEND_FORM', sendForm)
}

function* rootSaga() {
  yield all([
    watchFormMeta(),
    watchSendForm(),
  ])
}

export default rootSaga