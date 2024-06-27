import { all, delay, put, takeEvery } from "redux-saga/effects";

export function* helloSaga() {
  console.log("Hello Saga!");
}

export function* incrementAsync() {
  yield delay(1000);
  yield put({
    type: "INCREMENT",
  });
}

function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
