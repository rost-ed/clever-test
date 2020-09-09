import 'regenerator-runtime/runtime'
import { put, all, takeEvery } from 'redux-saga/effects'
import { loadFormMetaSucceeded, sendFormSucceeded } from './actions'

const fallback = { "title": "Форма тестового задания", "image": "http://test.clevertec.ru/tt/image.png", "fields": [{ "title": "Текстовое поле", "name": "text", "type": "TEXT" }, { "title": "Числовое поле", "name": "numeric", "type": "NUMERIC" }, { "title": "Поле выбора одного значения из списка", "name": "list", "type": "LIST", "values": { "none": "Не выбрано", "v1": "Первое значение", "v2": "Второе значение", "v3": "Третье значение" } }] };

function* fetchFormMeta() {
  try {
    const formMeta = yield fetch(
      'http://test.clevertec.ru/tt/meta',
      {
        method: 'POST',
      }
    )
      .then(resp => resp.json())
      .catch(() => fallback)

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
    const resp = yield fetch(
      'http://test.clevertec.ru/tt/data',
      {
        method: 'POST',
        body: JSON.stringify({ form: payload })
      }
    )
      .then(resp => resp.json())
      .catch(() => ({ result: 'JHJHJHju' }))

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