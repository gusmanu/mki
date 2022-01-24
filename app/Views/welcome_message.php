<?= $this->extend('layouts/auth-master') ?>

<?= $this->section('content') ?>

<div class="container-scroller">
	<div class="container-fluid page-body-wrapper full-page-wrapper">
		<div class="content-wrapper d-flex align-items-center auth px-0">
			<div class="row w-100 mx-0">
				<div class="col-lg-4 mx-auto">
					<div class="auth-form-light text-left py-5 px-4 px-sm-5">
						<h3 class="fw-light">Halo, <?= $user->name ?></h3>
						<br>
						<a href="/logout">logout</a>
					</div>
				</div>
			</div>
		</div>
		<!-- content-wrapper ends -->
	</div>
	<!-- page-body-wrapper ends -->
</div>

<?= $this->endSection() ?>