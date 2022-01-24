function toastWarning(message, timeout = 3000) {
  iziToast.warning({
    message: message,
    position: 'topRight',
    timeout: timeout,
  })
}

function toastInfo(message, timeout = 3000) {
  iziToast.info({
    message: message,
    position: 'topRight',
    timeout: timeout,
  })
}

function toastError(message, timeout = 3000) {
  iziToast.error({
    message: message,
    position: 'topRight',
    timeout: timeout,
  })
}

function toastSuccess(message, timeout = 3000) {
  iziToast.success({
    message: message,
    position: 'topRight',
    timeout: timeout,
  })
}