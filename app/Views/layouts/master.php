<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <?= csrf_meta() ?>
  <title>Manage Pasien</title>
  <!-- plugins:css -->
  <link rel="stylesheet" href="/assets/vendors/feather/feather.css">
  <link rel="stylesheet" href="/assets/vendors/mdi/css/materialdesignicons.min.css">
  <link rel="stylesheet" href="/assets/vendors/ti-icons/css/themify-icons.css">
  <link rel="stylesheet" href="/assets/vendors/typicons/typicons.css">
  <link rel="stylesheet" href="/assets/vendors/simple-line-icons/css/simple-line-icons.css">
  <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.base.css">
  <link rel="stylesheet" href="/assets/vendors/izitoast/css/izitoast.min.css">
  <style>
    .content-wrapper {
      padding-top: .5rem !important;
    }

    .modal-backdrop {
      display: none !important;
    }

    .fixed-top {
      z-index: 800 !important;
    }

    .icon-delete {
      color: red;
    }

    @media (max-width: 991px) {
      .navbar .navbar-menu-wrapper {
        width: calc(100% - 120px) !important;
      }

      .navbar .navbar-brand-wrapper {
        width: 120px !important;
      }

      .navbar .navbar-brand-wrapper .brand-logo-mini img {
        width: 100% !important;
        margin-bottom: 10px !important;
      }
    }
  </style>
  <?= $this->renderSection('page-module-css') ?>
  <!-- endinject -->
  <!-- Plugin css for this page -->
  <link rel="stylesheet" href="/assets/js/select.dataTables.min.css">
  <!-- End plugin css for this page -->
  <!-- inject:css -->
  <link rel="stylesheet" href="/assets/css/vertical-layout-light/style.css">
  <!-- endinject -->
  <link rel="shortcut icon" href="/assets/images/neodrive.png" />

</head>

<body>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <?= $this->include('layouts/partials/_navbar') ?>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- partial -->
      <!-- partial:partials/_sidebar.html -->
      <?= $this->include('layouts/partials/_sidebar') ?>
      <!-- partial -->
      <div class="main-panel">
        <?= $this->renderSection('content') ?>
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <?= $this->include('layouts/partials/_footer') ?>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->

  <?= $this->renderSection('modal') ?>
  <!-- plugins:js -->
  <!-- <script src="/assets/vendors/js/vendor.bundle.base.js"></script> -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.5.0/perfect-scrollbar.min.js" integrity="sha512-yUNtg0k40IvRQNR20bJ4oH6QeQ/mgs9Lsa6V+3qxTj58u2r+JiAYOhOW0o+ijuMmqCtCEg7LZRA+T4t84/ayVA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <?= $this->renderSection('page-module-script') ?>
  <!-- endinject -->
  <!-- Plugin js for this page -->
  <script src="/assets/vendors/chart.js/Chart.min.js"></script>
  <script src="/assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
  <script src="/assets/vendors/progressbar.js/progressbar.min.js"></script>

  <!-- End plugin js for this page -->
  <!-- inject:js -->
  <script src="/assets/js/off-canvas.js"></script>
  <script src="/assets/js/hoverable-collapse.js"></script>
  <script src="/assets/js/template.js"></script>
  <script src="/assets/js/settings.js"></script>
  <script src="/assets/js/todolist.js"></script>
  <!-- endinject -->
  <!-- Custom js for this page-->
  <script src="/assets/js/dashboard.js"></script>
  <script src="/assets/js/Chart.roundedBarCharts.js"></script>
  <!-- End custom js for this page-->
  <script src="/assets/vendors/izitoast/js/izitoast.min.js"></script>
  <?= $this->renderSection('page-custom-script') ?>

</body>

</html>