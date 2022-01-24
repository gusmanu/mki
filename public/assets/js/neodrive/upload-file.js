$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$("#form-upload-link").on("submit", function (form) {
  form.preventDefault();
  uploadFormLinkOrTeam("#urls", "#upload-link", "link");
});

$("#form-upload-team").on("submit", function (form) {
  form.preventDefault();
  uploadFormLinkOrTeam("#urls-team", "#upload-link-team", "team");
});

$("#form-upload-folder").on("submit", function (form) {
  form.preventDefault();
  uploadFromFolder();
});

function uploadFromFolder() {
  let button = $("#upload-link-folder");
  button.prop("disabled", true);
  let input = $("#folder_url").val();
  $("#folder_url").val("");
  let csrf = $("meta[name=X-CSRF-TOKEN]").attr("content");
  let account = parseInt($("#google-account").val());
  let backup_account = $("#backup-google-account").val();
  if (backup_account.length < 1) {
    backup_account = null;
  }
  if (account == backup_account) {
    toastWarning("used account and backup account must be different");
    $(buttonId).prop("disabled", false);
    return;
  }
  if (input.length < 8) {
    toastWarning("input valid url");
    button.prop("disabled", false);
    return;
  }
  button.prop("disabled", false);
  toastInfo("reading files from folder please wait..");
  let dataPost = {
    account: account,
    folder_url: input,
  };
  dataPost[CSRF_NAME] = csrf;
  $.ajax({
    url: LIST_FILES_FROM_FOLDER_URL,
    type: "POST",
    dataType: "json",
    data: dataPost,
    success: function (a) {
      if (a.result.length < 1) {
        toastWarning(
          "found 0 file, make sure your url is valid and your current selected account has access to the folder"
        );
        return;
      }
      resetCounter("folder");
      addCounter("folder", "valid", a.result.length);
      a.result.forEach((url) => {
        uploadFileUrl(csrf, null, account, backup_account, url, "folder");
      });
    },
    error: function (a, b, c) {
      console.log(a);
      if (a.hasOwnProperty("responseJSON")) {
        if (a.responseJSON.hasOwnProperty("messages")) {
          toastError(a.responseJSON.messages.error);
        }
      }
      if (a.status == 403) {
        toastInfo(
          "try to refresh this page, maybe csrf-token expired or has been updated"
        );
      }
    },
  });
}

function uploadFormLinkOrTeam(inputId, buttonId, uploadType) {
  $(buttonId).prop("disabled", true);
  let input = $(inputId).val();
  let csrf = $("meta[name=X-CSRF-TOKEN]").attr("content");
  if (input.length < 10) {
    toastWarning("input valid url first");
    $(buttonId).prop("disabled", false);
    return;
  }
  let account = parseInt($("#google-account").val());
  let backup_account = $("#backup-google-account").val();
  if (backup_account.length < 1) {
    backup_account = null;
  }
  if (account == backup_account) {
    toastWarning("used account and backup account must be different");
    $(buttonId).prop("disabled", false);
    return;
  }
  let urls = input.split(/\r?\n/).filter((url) => url.length >= 10);
  if (urls.length < 1) {
    toastWarning("please input each line valid url");
    $(buttonId).prop("disabled", false);
    return;
  }
  resetCounter(uploadType);
  addCounter(uploadType, "valid", urls.length);
  toastInfo(`found ${urls.length} valid url(s)`);
  toastInfo(
    `processing please wait, do not close this tab until upload process finished`
  );
  $(inputId).val("");
  $(buttonId).prop("disabled", false);
  urls.forEach((url) => {
    uploadFileUrl(csrf, inputId, account, backup_account, url, uploadType);
  });
}

function uploadFileUrl(
  csrf,
  inputId = null,
  account,
  backup_account = null,
  url,
  uploadType
) {
  let dataPost = {
    account: account,
    url: url,
    backup_account: backup_account,
  };
  dataPost[CSRF_NAME] = csrf;
  if (inputId == "#urls-team") {
    dataPost.teamdrive = true;
  }
  $.ajax({
    url: UPLOAD_FILE_URL,
    type: "POST",
    dataType: "json",
    data: dataPost,
    success: function (a) {
      console.log(a);
      if (a.success) {
        toastSuccess("upload success " + a.name);
        let itemEl = `<div class="uploaded-item"><div>${a.name}</div><div><a href="${a.result}">Link</a> | <span class="copy-url" onclick="copyURL(this)"><i class="mdi mdi-content-copy">copy</i></span> | Request Backup : ${a.request_backup} [${a.backup_status}]</div></div>`;
        $(".uploaded-item-wrapper").append(itemEl);
        addCounter(uploadType, "success");
      } else {
        toastError("upload failed " + a.from_url);
        let itemEl = `<div class="uploaded-item"><div>${a.from_url}</div><div>Fail Reason : ${a.message}</div></div>`;
        $(".uploaded-item-wrapper").append(itemEl);
        addCounter(uploadType, "failed");
      }
    },
    error: function (a, b, c) {
      console.log(a);
      if (a.hasOwnProperty("responseJSON")) {
        if (a.responseJSON.hasOwnProperty("messages")) {
          toastError(a.responseJSON.messages.error);
        }
      }
      if (a.status == 403) {
        toastInfo(
          "try to refresh this page, maybe csrf-token expired or has been updated"
        );
      }
      if (a.status == 401) {
        toastInfo("Try to relogin google drive account");
      }
      addCounter(uploadType, "failed");
    },
  });
}

async function fetchGet(url) {
  let options = {
    headers: {
      "Content-type": "application/json",
      "X-Request-With": "XMLHttpRequest",
      Accept: "application/json",
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = `An error has occured: ${response.status} (${response.statusText})`;

    throw new Error(message);
  }
  const data = await response.json();
  return data;
}
var clientId = "<?= $neodriveConfig->googleDriveApi['drive_client_id'] ?>";

var pickerApiLoaded = false;

function loadPicker() {
  gapi.load("picker", {
    callback: onPickerApiLoad,
  });
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
}

$("#open-picker").on("click", async function () {
  if (!pickerApiLoaded) {
    toastWarning("please wait while loading picker api");
  }
  let account = parseInt($("#google-account").val());
  try {
    let token = await fetchGet(GET_TOKEN_URL + "?id=" + account);
    createPicker(token.access_token);
  } catch (e) {
    console.log(e);
    toastError(e);
    return;
  }
  return;
});

function createPicker(oauthToken) {
  var docsView = new google.picker.DocsView();
  var picker = new google.picker.PickerBuilder()
    .addView(docsView)
    .enableFeature(google.picker.Feature.NAV_HIDDEN)
    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    .setOAuthToken(oauthToken)
    .setCallback(pickerCallback)
    .build();
  picker.setVisible(true);
  return;
}

function pickerCallback(data) {
  if (data.action == google.picker.Action.PICKED) {
    var files = data.docs;
    files.forEach((file) => {
      $("#selected-files").append(`
                <div class="file-item"><small><a data-group="picker-item" data-inprocess="no" data-id='${file.id}'>${file.name}</a> <i class="ti ti-trash icon-delete" onclick="deleteItemPicker(this)"></i></small>
            `);
    });
  }
}

function deleteItemPicker(item) {
  $(item).parents("div[class=file-item]").remove();
}

$("#form-picker").on("submit", function (form) {
  form.preventDefault();
  uploadItemPicker();
});

async function uploadItemPicker() {
  let csrf = $("meta[name=X-CSRF-TOKEN]").attr("content");
  let items = $('a[data-group="picker-item"]:not([data-inprocess="yes"])');
  let account = parseInt($("#google-account").val());
  let backup_account = $("#backup-google-account").val();
  if (backup_account.length < 1) {
    backup_account = null;
  }
  if (items.length < 1) {
    toastWarning("please select file first");
    return;
  }
  if (account == backup_account) {
    toastWarning("used account and backup account must be different");
    return;
  }
  toastInfo("processing please wait...");
  let itemLength = items.length - 1;
  resetCounter("picker");
  addCounter("picker", "valid", items.length);
  $("#upload-picker").prop("disabled", true);
  items.each((i) => {
    let element = $(items[i]);
    element.attr("data-inprocess", "yes");
    let urlId = element.attr("data-id");
    let dataPost = {
      url: urlId,
      account: account,
      backup_account: backup_account,
    };
    dataPost[CSRF_NAME] = csrf;
    $.ajax({
      url: UPLOAD_FILE_URL,
      type: "POST",
      dataType: "json",
      data: dataPost,
      success: function (a) {
        console.log(a);
        if (a.success) {
          toastSuccess("upload success " + a.name);
          deleteItemPicker(element);
          let itemEl = `<div class="uploaded-item"><div>${a.name}</div><div><a href="${a.result}">Link</a> | <span class="copy-url" onclick="copyURL(this)"><i class="mdi mdi-content-copy">copy</i></span> | Request Backup : ${a.request_backup} [${a.backup_status}]</div></div>`;
          $(".uploaded-item-wrapper").append(itemEl);
          addCounter("picker", "success");
        } else {
          toastError("upload failed " + a.from_url);
          let itemEl = `<div class="uploaded-item"><div>${a.from_url}</div><div>Fail Reason : ${a.message}</div></div>`;
          $(".uploaded-item-wrapper").append(itemEl);
          addCounter("picker", "failed");
        }
      },
      error: function (a, b, c) {
        console.log(a);
        if (a.hasOwnProperty("responseJSON")) {
          if (a.responseJSON.hasOwnProperty("messages")) {
            toastError(a.responseJSON.messages.error);
          }
        }
        if (a.status == 403) {
          toastInfo(
            "try to refresh this page, maybe csrf-token expired or has been updated"
          );
        }
        if (a.status == 401) {
          toastInfo("Try to relogin google drive account");
        }
        addCounter("picker", "failed");
      },
    });

    if (i === itemLength) {
      $("#upload-picker").prop("disabled", false);
    }
  });
}

function addCounter(uploadType, type, num = 0) {
  let validCounter = $("#count-filtered-valid-" + uploadType);
  let uploadedCounter = $("#count-uploaded-" + uploadType);
  let successCounter = $("#count-success-" + uploadType);
  let errorCounter = $("#count-failed-" + uploadType);
  if (type == "valid") {
    validCounter.html(num);
  } else if (type == "success") {
    let currentUploaded = parseInt(uploadedCounter.html());
    uploadedCounter.html(currentUploaded + 1);
    let currentSuccess = parseInt(successCounter.html());
    successCounter.html(currentSuccess + 1);
  } else if (type == "failed") {
    let currentUploaded = parseInt(uploadedCounter.html());
    uploadedCounter.html(currentUploaded + 1);
    let currentFailed = parseInt(errorCounter.html());
    errorCounter.html(currentFailed + 1);
  }
  return;
}

function resetCounter(uploadType) {
  let wrapper = $("#counter-wrapper-" + uploadType);
  let validCounter = $("#count-filtered-valid-" + uploadType);
  let uploadedCounter = $("#count-uploaded-" + uploadType);
  let successCounter = $("#count-success-" + uploadType);
  let errorCounter = $("#count-failed" + uploadType);
  wrapper.hide();
  validCounter.html("0");
  uploadedCounter.html("0");
  successCounter.html("0");
  errorCounter.html("0");
  wrapper.show();
  return;
}

function copyURL(e) {
  let url = $(e).parent().find("a").attr("href");
  navigator.clipboard.writeText(url);
  toastInfo("url copied");
}
