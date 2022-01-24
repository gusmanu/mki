<?= $this->extend('layouts/auth-master') ?>

<?= $this->section('content') ?>

<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
                <div class="col-lg-4 mx-auto">
                    <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div class="brand-logo">
                            <img src="/assets/landing/images/neodrive-bigger-removebg.png" alt="logo">
                        </div>
                        <h6 class="fw-light">Sign in to continue.</h6>
                        <form class="pt-3" action="<?= route_to('login') ?>" method="post">
                            <?= $this->include('layouts/partials/_message-block') ?>
                            <?= csrf_field() ?>
                            <?php if ($config->validFields === ['email']) : ?>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" id="email" name="login" placeholder="Email">
                                    <?php if (session('errors.login')) : ?>
                                        <div class="invalid-feedback" style="display: block;">
                                            <?= session('errors.login') ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php else : ?>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="user" name="login" placeholder="Username or Email">
                                    <?php if (session('errors.login')) : ?>
                                        <div class="invalid-feedback" style="display: block;">
                                            <?= session('errors.login') ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>
                            <div class="form-group">
                                <input type="password" class="form-control form-control-lg" id="password" name="password" placeholder="Password">
                                <?php if (session('errors.password')) : ?>
                                    <div class="invalid-feedback" style="display: block;">
                                        <?= session('errors.password') ?>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="mt-3">
                                <button type="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Sign In</a>
                            </div>
                            <div class="my-2 d-flex justify-content-between align-items-center">
                                <?php if ($config->allowRemembering) : ?>
                                    <div class="form-check">
                                        <label class="form-check-label text-muted">
                                            <input type="checkbox" name="remember" class="form-check-input">
                                            Keep me signed in
                                            <i class="input-helper"></i></label>
                                    </div>
                                <?php endif; ?>
                                <a href="<?= route_to('forgot') ?>" class="auth-link text-black">Forgot password?</a>
                            </div>
                            <div class="text-center mt-4 fw-light">
                                Don't have an account? <a href="<?= route_to('register') ?>" class="text-primary">Create</a>
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