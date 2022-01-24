<nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <div class="me-3">
        </div>
        <div>
            <a class="navbar-brand brand-logo" href="<?= $authed ? route_to('file_manager') : route_to('landing') ?>">
                <img style="padding-bottom:3px;" src="/assets/landing/images/neodrive-bigger-removebg.png" alt="logo" />
            </a>
            <a class="navbar-brand brand-logo-mini" href="<?= $authed ? route_to('file_manager') : route_to('landing') ?>">
                <img src="/assets/landing/images/neodrive-bigger-removebg.png" alt="logo" />
            </a>
        </div>
    </div>
    <div style="justify-content: flex-end;" class="navbar-menu-wrapper d-flex">
        <?php if ($authed) : ?>
            <a style="text-decoration: none; margin-top: 5px;" href="<?= route_to('download_auth_logout') ?>">Logout</a>
        <?php endif; ?>
    </div>
</nav>