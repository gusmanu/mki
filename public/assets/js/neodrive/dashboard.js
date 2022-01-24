$(document).ready(function () {
  updateStatistics("weekly");
});

var downloadPerformanceCanvas = document
  .getElementById("download-pf-canvas")
  .getContext("2d");
var downloadPerformanceCanvas2 = document
  .getElementById("download-pf-canvas")
  .getContext("2d");

//gradient1 (current)
var dlGradientBg = downloadPerformanceCanvas.createLinearGradient(5, 0, 5, 100);
dlGradientBg.addColorStop(0, "rgba(26, 115, 232, 0.18)");
dlGradientBg.addColorStop(1, "rgba(26, 115, 232, 0.02)");

// gradient 2 (last)
var dlGradientBg2 = downloadPerformanceCanvas2.createLinearGradient(
  100,
  0,
  50,
  150
);
dlGradientBg2.addColorStop(0, "rgba(0, 208, 255, 0.19)");
dlGradientBg2.addColorStop(1, "rgba(0, 208, 255, 0.03)");

var defaultDlPerformanceData = {
  labels: [
    "2021-11-15",
    "2021-11-16",
    "2021-11-17",
    "2021-11-18",
    "2021-11-19",
    "2021-11-20",
    "2021-11-21",
  ],
  datasets: [
    {
      label: "This week",
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: dlGradientBg,
      borderColor: ["#1F3BB3"],
      borderWidth: 1.5,
      fill: true,
      pointBorderWidth: 1,
    },
    {
      label: "Last week",
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: dlGradientBg2,
      borderColor: ["#52CDFF"],
      borderWidth: 1.5,
      fill: true,
      pointBorderWidth: 1,
    },
  ],
};

var defaultDlChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          drawBorder: false,
          color: "#F0F0F0",
          zeroLineColor: "#F0F0F0",
        },
        ticks: {
          beginAtZero: false,
          autoSkip: true,
          maxTicksLimit: 5,
          fontSize: 10,
          color: "#6B778C",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          beginAtZero: false,
          autoSkip: true,
          maxTicksLimit: 9,
          fontSize: 10,
          color: "#6B778C",
        },
      },
    ],
  },
  legend: false,
  legendCallback: function (chart) {
    var text = [];
    text.push('<div class="chartjs-legend"><ul>');
    for (var i = 0; i < chart.data.datasets.length; i++) {
      text.push("<li>");
      text.push(
        '<span style="background-color:' +
        chart.data.datasets[i].borderColor +
        '">' +
        "</span>"
      );
      text.push(chart.data.datasets[i].label);
      text.push("</li>");
    }
    text.push("</ul></div>");
    return text.join("");
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  tooltips: {
    backgroundColor: "rgba(31, 59, 179, 1)",
  },
};

var brokenFilesSummaryChartCanvas = document
  .getElementById("broken-summary")
  .getContext("2d");
var defaultBrokenFilesData = {
  labels: ["1", "2", "3", "4", "5", "6", "7"],
  datasets: [
    {
      label: "broken files",
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "#ffcc00",
      borderColor: ["#01B6A0"],
      borderWidth: 2,
      fill: false,
      pointBorderWidth: 0,
      pointRadius: [0, 0, 0, 0, 0, 0],
      pointHoverRadius: [0, 0, 0, 0, 0, 0],
    },
  ],
};

var brokenFilesChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        display: false,
        gridLines: {
          display: false,
          drawBorder: false,
          color: "#F0F0F0",
        },
        ticks: {
          beginAtZero: false,
          autoSkip: true,
          maxTicksLimit: 4,
          fontSize: 10,
          color: "#6B778C",
        },
      },
    ],
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          beginAtZero: false,
          autoSkip: true,
          maxTicksLimit: 7,
          fontSize: 10,
          color: "#6B778C",
        },
      },
    ],
  },
  legend: false,
  elements: {
    line: {
      tension: 0.4,
    },
  },
  tooltips: {
    backgroundColor: "rgba(31, 59, 179, 1)",
  },
};

var brokenFilesSummaryChart = new Chart(brokenFilesSummaryChartCanvas, {
  type: "line",
  data: defaultBrokenFilesData,
  options: brokenFilesChartOptions,
});

var downloadPerformanceChart = new Chart(downloadPerformanceCanvas, {
  type: "line",
  data: defaultDlPerformanceData,
  options: defaultDlChartOptions,
});
document.getElementById("performance-line-legend").innerHTML =
  downloadPerformanceChart.generateLegend();

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

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

async function updateStatistics(intval = "daily", pl = false) {
  if (pl) {
    toastInfo("please wait...", 1000);
  }
  try {
    let statisticsData = await fetchGet(
      DASHBOARD_STATISTIC_URL + "?intval=" + intval
    );
    let dataLabels;
    if (intval == "monthly") {
      dataLabels = statisticsData.chart_download_performance.current.data.map(
        function (v) {
          let dt = Date.parse(v.dt);
          var date = new Date(parseInt(dt));
          return date.getDate();
        }
      );
    } else if (intval == "weekly") {
      dataLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    } else {
      dataLabels = statisticsData.chart_download_performance.current.data.map(
        function (v) {
          let dt = Date.parse(v.dt);
          return prettyDate2(dt);
        }
      );
    }

    let dataCurrentLabel =
      statisticsData.chart_download_performance.current.label;
    $("#intval-chart").html(toUpperCaseStr(dataCurrentLabel));
    $("#intval-broken").html(toUpperCaseStr(dataCurrentLabel));
    $("#intval-head").html(toLowerCaseStr(dataCurrentLabel));

    let dataCurrent =
      statisticsData.chart_download_performance.current.data.map(function (v) {
        return v.downloads;
      });

    let dataLastLabel = statisticsData.chart_download_performance.last.label;
    let dataLast = statisticsData.chart_download_performance.last.data.map(
      function (v) {
        return v.downloads;
      }
    );

    let dataAdditionalBrokenFiles =
      statisticsData.chart_additional_broken_files.current.map(function (v) {
        return v.broken;
      });

    let newDlPerformanceData = defaultDlPerformanceData;
    newDlPerformanceData.labels = dataLabels;
    newDlPerformanceData.datasets[0].label = dataCurrentLabel;
    newDlPerformanceData.datasets[0].data = dataCurrent;
    newDlPerformanceData.datasets[1].label = dataLastLabel;
    newDlPerformanceData.datasets[1].data = dataLast;
    downloadPerformanceChart.data = newDlPerformanceData;
    downloadPerformanceChart.update();
    document.getElementById("performance-line-legend").innerHTML =
      downloadPerformanceChart.generateLegend();
    updateWidgets(statisticsData);

    let newBrokenData = defaultBrokenFilesData;
    newBrokenData.datasets[0].data = dataAdditionalBrokenFiles;
    brokenFilesSummaryChart.data = newBrokenData;
    brokenFilesSummaryChart.update();
  } catch (e) {
    console.log(e);
  }
}

var normalFilesBar = new ProgressBar.Circle("#normalfilesbar", {
  color: "#fff",
  strokeWidth: 15,
  trailWidth: 15,
  easing: "easeInOut",
  duration: 1400,
  text: {
    autoStyleContainer: false,
    style: {
      fontSize: "0rem",
    },
  },
  from: {
    color: "#52CDFF",
    width: 15,
  },
  to: {
    color: "#677ae4",
    width: 15,
  },
  step: function (state, circle) {
    circle.path.setAttribute("stroke", state.color);
    circle.path.setAttribute("stroke-width", state.width);
    var value = Math.round(circle.value() * 100);
    console.log(value);
    if (value === 0) {
      circle.setText("");
    } else {
      circle.setText(value);
    }
  },
});

var brokenFilesBar = new ProgressBar.Circle("#brokenfilesbar", {
  color: "#fff",
  strokeWidth: 15,
  trailWidth: 15,
  easing: "easeInOut",
  duration: 1400,
  text: {
    autoStyleContainer: false,
    style: {
      fontSize: "0rem",
    },
  },
  from: {
    color: "#52CDFF",
    width: 15,
  },
  to: {
    color: "#677ae4",
    width: 15,
  },
  step: function (state, circle) {
    circle.path.setAttribute("stroke", state.color);
    circle.path.setAttribute("stroke-width", state.width);
    var value = Math.round(circle.value() * 100);
    console.log(value);
    if (value === 0) {
      circle.setText("");
    } else {
      circle.setText(value);
    }
  },
});

normalFilesBar.animate(".0");
brokenFilesBar.animate(".0");

function updateWidgets(data) {
  updateWidgetsById(
    "download-rate",
    data.download_rate.current,
    data.download_rate.percentage,
    true,
    true
  );
  updateWidgetsById(
    "page-views",
    data.views.current,
    data.views.percentage,
    false,
    true
  );
  updateWidgetsById(
    "downloads",
    data.downloads.current,
    data.downloads.percentage,
    false,
    true
  );
  updateWidgetsById("accounts", data.google_accounts, null, false, false);
  updateWidgetsById("broken", data.broken_files, null, false, false);
  updateWidgetsById("reported", data.reported_files, null, false, false);
  updateWidgetsById(
    "normal_percentage",
    data.normal_files_percentage,
    null,
    true,
    false
  );
  updateWidgetsById(
    "broken_percentage",
    data.broken_files_percentage,
    null,
    true,
    false
  );
  updateWidgetsById(
    "additional-broken-files",
    data.additional_broken_files,
    null,
    false,
    false
  );
  if (data.normal_files_percentage == 100) {
    normalFilesBar.animate('1');
  } else {
    normalFilesBar.animate(`.${Math.round(data.normal_files_percentage)}`);
  }
  if (data.broken_files_percentage) {
    brokenFilesBar.animate('1');
  } else {
    brokenFilesBar.animate(`.${Math.round(data.broken_files_percentage)}`);
  }

}

function updateWidgetsById(
  id = "download-rate",
  data,
  dataPercentage = null,
  dataIsPercent = false,
  withPercentage = true
) {
  if (dataIsPercent) {
    $(`#${id}`).html(nFormatter(Math.abs(data)) + "%");
  } else {
    $(`#${id}`).html(nFormatter(Math.abs(data)));
  }

  if (withPercentage) {
    let p = $(`#${id}-percentage`);
    let span = p.find("span")[0];
    let icon = p.find("i")[0];
    $(span).html(nFormatter(Math.abs(dataPercentage)) + "%");
    changeUpOrDown(dataPercentage, icon, p);
  }
}

function changeUpOrDown(data_percentage, icon, p) {
  if (data_percentage < 0) {
    $(icon).attr("class", "mdi mdi-menu-down");
    p.attr("class", "text-danger d-flex");
  } else {
    $(icon).attr("class", "mdi mdi-menu-up");
    p.attr("class", "text-success d-flex");
  }
}

function nFormatter(num, digits = 1) {
  const lookup = [
    {
      value: 1,
      symbol: "",
    },
    {
      value: 1e3,
      symbol: "k",
    },
    {
      value: 1e6,
      symbol: "M",
    },
    {
      value: 1e9,
      symbol: "G",
    },
    {
      value: 1e12,
      symbol: "T",
    },
    {
      value: 1e15,
      symbol: "P",
    },
    {
      value: 1e18,
      symbol: "E",
    },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

function prettyDate2(time) {
  var date = new Date(parseInt(time));
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toUpperCaseStr(str) {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}

function toLowerCaseStr(str) {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toLowerCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}
