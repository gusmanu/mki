<!DOCTYPE html>
<html lang="en">
<?= $this->include('layouts/partials/_auth-header') ?>
<?= $this->renderSection('page-module-css') ?>

<body>
    <?= $this->renderSection('content') ?>
    <?= $this->include('layouts/partials/_auth-header') ?>
</body>
<?= $this->renderSection('page-module-script') ?>
<?= $this->renderSection('page-custom-script') ?>

</html>