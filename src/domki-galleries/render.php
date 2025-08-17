<?php

use App\Services\GalleryService;
$unique_id = wp_unique_id('p-');

$galleryDbService = new GalleryService();

$slidingGalleries = [];
$galleries = $attributes["galleries"] ?? [];

foreach ($galleries as $key => $gallery) {
	$galleryIds = [];

	foreach ($gallery["images"] as $image) {
		$galleryIds[] = $image["media_id"];
	}

	$galleryApi = $galleryDbService->getOneWhere(["id" => $gallery["gallery_id"]]);

	// Convert comma-separated strings to arrays of integers
	$galleryIdsArray = array_map('intval', explode(',', implode(",", $galleryIds)));
	$apiMediaIdsArray = [];
	if (!empty($galleryApi->media_ids)) {
		$apiMediaIdsArray = array_map('intval', explode(',', $galleryApi->media_ids));
	}


	$api_diff = array_diff($apiMediaIdsArray, $galleryIdsArray);


	$apiGalleryUniqueIds = array_unique($api_diff);

	$concatedArr = array_merge($galleryIdsArray, $apiGalleryUniqueIds);
	// Concatenate and get unique values
	$combinedMediaIds = array_values(array_merge($apiMediaIdsArray, $galleryIdsArray));

	$arrNoDuplicates = array_keys(array_flip($concatedArr));
	$slidingGalleries[] = [
		"title" => $gallery["title"],
		"order_by" => $gallery["order_by"],
		"images" => implode(",", $galleryIds), // Keeping this as a comma-separated string as per your original output
		"api" => $galleryApi->media_ids, // Keeping this as is
		"media_ids" => $concatedArr
	];
}

$title = [
	"text" => $attributes["title"]["text"] ?? "Galeria",
	"show" => $attributes["title"]["show"] ?? true
];
$gallery_active = isset($_COOKIE['gallery_active']) ? intval($_COOKIE['gallery_active']) : 1;


$showButton = $attributes["button"]["show"] ?? true;
$buttonText = $attributes["button"]["text"] ?? "Zobacz WiÄ™cej";
$buttonLink = $attributes["button"]["link"] ?? "#";


// Adds the global state.



?>
<div <?php echo get_block_wrapper_attributes(); ?> data-wp-interactive="domki-galleries" <?php echo wp_interactivity_data_wp_context([
		"active" => $gallery_active,
		"showCarousel" => false,
		"imageSelected" => 1,
		"slidingGalleries" => $slidingGalleries,
		"moreList" => [],
		"per_page" => $attributes["per_page"],
		"page" => 0,
		"loading" => false,
		"showButton" => $showButton
	]); ?> data-wp-on-document--keyup="callbacks.detectKeys"
	id="<?php echo esc_attr($attributes["identifier"]) ?>" class="section" data-wp-watch="callbacks.handleMore">
	<div class="container">
		<?php if ($title["show"]): ?>
			<h2 class="text-center mb-4"><?= $title["text"] ?></h2>
		<?php endif; ?>
		<div class="flex justify-center items-center gap-3 my-2 flex-wrap gallery-buttons">
			<?php foreach ($galleries as $key => $gallery): ?>
				<div data-wp-on--click="actions.handleSwitch"
					data-wp-context='{"switcher" : {"active" : <?= $gallery["order_by"] ?>}}' class="button-small"
					data-wp-class--button-small_active="callbacks.isActive">
					<?= $gallery["title"] ?>
				</div>
			<?php endforeach; ?>
		</div>
		<div>
			<?php foreach ($galleries as $key => $gallery): ?>
				<section class="grid-3 gap-3 my-4"
					data-wp-context='{"gallery" : { "order_by" : <?php echo $gallery["order_by"]; ?> } }'
					data-wp-class--hide="!callbacks.showGallery" class="show-image">
					<?php foreach ($gallery["images"] as $key => $image): ?>
						<div title="<?= $image["media_id"] ?>"
							data-wp-context='{"image" : { "selected" : <?php echo $key + 1; ?> } }'
							data-wp-class--hide="!callbacks.showGallery" class="show-image"
							data-wp-on--click="actions.openCarousel" data-media_id="<?= $image["media_id"] ?>">
							<?php echo my_lazy_load_image($image["media_id"], "inventory-16/9") ?>
						</div>
					<?php endforeach; ?>

				</section>
			<?php endforeach; ?>
			<div class="grid-3 gap-3 my-4">
				<template data-wp-each--moreimg="context.moreList">
					<div data-wp-init="callbacks.initMoreImg" data-wp-on--click="actions.openCarousel"
						data-wp-bind--data-media_id="context.moreimg" class="show-image">
					</div>
				</template>
			</div>
		</div>
		<?php if ($showButton): ?>
			<div class="flex justify-center items-center" data-wp-class--hide="!callbacks.showButton">
				<button data-wp-on--click="actions.handleMore" title="<?php echo esc_attr($buttonText); ?>"
					class="button-md">
					<span data-wp-class--hide="context.loading"><?= $buttonText ?></span>
					<span data-wp-class--hide="!context.loading" class="loader"></span>
				</button>
			</div>
		<?php endif; ?>
	</div>
	<section class="gallery-modal" data-wp-class--is-active="context.showCarousel">
		<div class="close-gallery" data-wp-on--click="actions.closeCarousel">
			<span class="line-one"></span><span class="line-two"></span>
		</div>
		<?php foreach ($slidingGalleries as $gallery): ?>
			<section class="gallery_slider"
				data-wp-context='{"gallery" : { "order_by" : <?php echo $gallery["order_by"]; ?> } }'
				data-wp-class--hide="!callbacks.showGallery">
				<div class="embla" data-carousel-keyboard-nav="true" data-wp-watch="callbacks.initCarousel"
					data-carousel-loop="true" data-carousel-dots="false" data-carousel-arrows="false"
					data-wp-bind--data-carousel-initial="context.imageSelected">
					<div class="embla__viewport">
						<div class="embla__container">
							<?php foreach ($gallery["media_ids"] as $key => $value): ?>
								<div class="embla__slide">
									<?php echo my_lazy_load_image($value, "gallery"); ?>
								</div>
							<?php endforeach ?>
						</div>
					</div>
				</div>
			</section>
		<?php endforeach; ?>
	</section>
</div>