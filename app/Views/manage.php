<?= $this->extend('layouts/master') ?>
<?= $this->section('page-title') ?>
Broken Files
<?= $this->endSection() ?>
<?= $this->section('page-module-css') ?>
<link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/dataTables.bootstrap5.min.css" />
<style>
    .no-border-radius {
        border-radius: 0 !important;
    }

    .table-wrapper-button {
        margin: 10px 0px;
    }

    .copy-url {
        cursor: pointer;
    }

    .copy-url:hover {
        color: lightblue;
    }

    .dt-buttons {
        margin: 5px 0px !important;
    }

    .dt-button {
        margin-bottom: 5px !important;
    }
</style>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
<div class="content-wrapper">
    <div class="row">
        <div class="col-12 grid-margin stretch-card">
            <div class="card">
                <?= $this->include('layouts/partials/_message-block') ?>
                <div class="card-body">
                    <h4 class="card-title">Tabel Pasien</h4>
                    <div class="table-responsive">
                        <table id="pasien-table" class="table table-striped">

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?= $this->endSection() ?>


<?= $this->section('page-module-script') ?>
<script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.3/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.0.1/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.0.1/js/buttons.html5.min.js"></script>
<?= $this->endSection() ?>

<?= $this->section('page-custom-script') ?>
<script src="/assets/js/table-helper.js"></script>
<script src="/assets/js/neoToast.js"></script>
<script>
    var checkboxTitle = '<div class="custom-checkbox custom-control"><input type="checkbox" onChange="myCheckFunction(this)" data-checkboxes="mygroup" data-checkbox-role="dad" class="custom-control-input" id="checkbox-all"><label for="checkbox-all" class="custom-control-label">&nbsp;</label></div>'

    var pasienTable = $('#pasien-table').DataTable({
        processing: true,
        serverSide: true,
        dom: 'lBfrtip',
        ajax: {
            url: '/manage/json'
        },
        lengthMenu: [3, 5, 10, 25, 50],
        buttons: [{
            text: 'Delete Pasien',
            className: 'btn btn-inverse-danger btn-sm no-border-radius',
            action: function(e, dt, node, config) {
                myDeleteFunction();
            }
        }],
        columns: [{
                data: 'checkbox',
                name: 'checkbox',
                title: checkboxTitle,
                orderable: false,
                searchable: false

            },
            {
                data: 'name',
                name: 'name',
                title: 'nama'
            },
            {
                data: 'phone',
                name: 'phone',
                title: 'Nomor Hp',
            },
            {
                data: 'email',
                name: 'email',
                title: 'email',
            },
            {
                data: 'hpht',
                name: 'hpht',
                title: 'hpht'
            },
        ],
        order: [
            [1, 'desc']
        ]
    });

    function deleteData(ids) {
        let csrf = $('meta[name=X-CSRF-TOKEN]').attr('content')
        console.log(csrf)
        console.log(ids)
        $.ajax({
            url: "/manage/delete",
            type: "POST",
            dataType: "json",
            data: {
                "<?= csrf_token() ?>": csrf,
                "ids": ids
            },
            success: function(a) {
                toastSuccess(' deleted')
                pasienTable.draw()
            },
            error: function(a, b, c) {
                console.log(a)
                toastError("Failed:" + a.message + "Status: " + b + "\n" + c);
                if (a.status == 403) {
                    toastInfo('try to refresh this page, maybe csrf-token expired or has been updated');
                }
            }
        })
    }
</script>
<?= $this->endSection() ?>