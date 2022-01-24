<?php if (session()->has('message')) : ?>
	<div class="alert alert-success alert-dismissible fade show" role="alert">
		<?= session('message') ?>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>
<?php endif ?>

<?php if (session()->has('error')) : ?>
	<div class="alert alert-danger alert-dismissible fade show" role="alert">
		<?= session('error') ?>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>
<?php endif ?>

<?php if (session()->has('errors')) : ?>
	<?php foreach (session('errors') as $error) : ?>
		<div class="alert alert-danger alert-dismissible fade show" role="alert">
			<?= $error ?>
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		</div>
	<?php endforeach ?>
	</ul>
<?php endif ?>