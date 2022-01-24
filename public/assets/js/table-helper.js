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

function getSelectedID() {
  checked = $('[data-checkboxes="mygroup"]:not([data-checkbox-role="dad"]):checked')
  if (checked.length < 1) {
    return { data: null }
  }
  let idArray = []
  checked.each(i => {
    let element = checked[i]
    idArray.push($(element).attr('data-id'))
  })
  return { data: idArray }
}

function myCheckFunction(e) {
  var me = $(e),
    group = me.data('checkboxes'),
    role = me.data('checkbox-role');
  var all = $('[data-checkboxes="' + group + '"]:not([data-checkbox-role="dad"])'),
    checked = $('[data-checkboxes="' + group + '"]:not([data-checkbox-role="dad"]):checked'),
    dad = $('[data-checkboxes="' + group + '"][data-checkbox-role="dad"]'),
    total = all.length,
    checked_length = checked.length;

  if (role == 'dad') {
    if (me.is(':checked')) {
      all.prop('checked', true);
    } else {
      all.prop('checked', false);
    }
  } else {
    if (checked_length >= total) {
      dad.prop('checked', true);
    } else {
      dad.prop('checked', false);
    }
  }
}

function myDeleteFunction() {
  let selectedID = getSelectedID();
  if (selectedID.data == null) {
    return toastWarning('please choose data')
  }
  iziToast.question({
    overlay: true,
    toastOnce: true,
    id: 'question',
    message: 'Are You Sure?',
    position: 'topRight',
    buttons: [
      ['<button><b>Yes</b></button>', function (instance, toast) {

        instance.hide({ transitionOut: 'fadeOut' }, toast);
        deleteData(selectedID.data)

      }, true],
      ['<button>No</button>', function (instance, toast) {

        instance.hide({ transitionOut: 'fadeOut' }, toast);

      }]
    ]
  });
}