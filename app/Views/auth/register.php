<?= $this->extend('layouts/auth-master') ?>

<?= $this->section('content') ?>

<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
                <div class="col-lg-4 mx-auto">
                    <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                        <h6 class="fw-light">Register Pasien Baru.</h6>
                        <form class="pt-3" action="<?= route_to('register') ?>" method="post">

                            <?= $this->include('layouts/partials/_message-block') ?>

                            <?= csrf_field() ?>

                            <div class="form-group">
                                <input type="text" class="form-control form-control-lg" id="name" name="name" placeholder="Nama" value="<?= old('name') ?>">
                                <?php if (session('errors.name')) : ?>
                                    <div class="invalid-feedback" style="display: block;">
                                        <?= session('errors.name') ?>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="form-group">
                                <input type="email" class="form-control form-control-lg" id="email" name="email" placeholder="Email" value="<?= old('email') ?>">
                                <?php if (session('errors.email')) : ?>
                                    <div class="invalid-feedback" style="display: block;">
                                        <?= session('errors.email') ?>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="form-group">
                                <input type="text" class="form-control form-control-lg" id="phone" name="phone" placeholder="Nomor HP" value="<?= old('phone') ?>">
                                <?php if (session('errors.phone')) : ?>
                                    <div class="invalid-feedback" style="display: block;">
                                        <?= session('errors.phone') ?>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="form-group">
                                <input type="text" class="form-control form-control-lg" id="hpht" name="hpht" placeholder="Tanggal HPHT (cth : 21/02/2022)" value="<?= old('hpht') ?>">
                                <?php if (session('errors.hpht')) : ?>
                                    <div class="invalid-feedback" style="display: block;">
                                        <?= session('errors.hpht') ?>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="form-group">
                                <input type="password" class="form-control form-control-lg" id="password" name="password" placeholder="Password">
                                <?php if (session('errors.password')) : ?>
                                    <div class="invalid-feedback" style="display: block;">
                                        <?= session('errors.password') ?>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="form-group">
                                <input type="password" class="form-control form-control-lg" id="pass_confirm" name="pass_confirm" placeholder="Ulangi Password">
                                <?php if (session('errors.pass_confirm')) : ?>
                                    <div class="invalid-feedback" style="display: block;">
                                        <?= session('errors.pass_confirm') ?>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="mt-3">
                                <button type="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Register</a>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
</div>

<?= $this->endSection() ?>