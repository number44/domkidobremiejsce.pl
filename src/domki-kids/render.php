<?php
use App\Services\GalleryService;
$galleryDbService = new GalleryService();
$title = [
	"text" => $attributes["title"]["text"] ?? "Atrakcje dla dzieci",
	"show" => $attributes["title"]["show"] ?? true
];

$gallery = $attributes["gallery"];

$galleryIds = [];

foreach ($gallery["images"] as $image) {
	$galleryIds[] = $image["media_id"];
}

$galleryApi = $galleryDbService->getOneWhere(["id" => $gallery["gallery_id"]]);
$galleryIdsArray = array_map('intval', explode(',', implode(",", $galleryIds)));
$apiMediaIdsArray = [];
if (!empty($galleryApi->media_ids)) {
	$apiMediaIdsArray = array_map('intval', explode(',', $galleryApi->media_ids));
}
$api_diff = array_diff($apiMediaIdsArray, $galleryIdsArray);

$apiGalleryUniqueIds = array_unique($api_diff);
$concatedArr = array_merge($galleryIdsArray, $apiGalleryUniqueIds);
$combinedMediaIds = array_values(array_merge($apiMediaIdsArray, $galleryIdsArray));
$arrNoDuplicates = array_keys(array_flip($concatedArr));

$slidingGallery = [
	"title" => $gallery["title"],
	"order_by" => $gallery["order_by"],
	"images" => implode(",", $galleryIds), // Keeping this as a comma-separated string as per your original output
	"api" => $galleryApi->media_ids, // Keeping this as is
	"media_ids" => $concatedArr
];

$showButton = $attributes["button"]["show"] ?? true;
$buttonText = $attributes["button"]["text"] ?? "Zobacz Więcej";
$buttonLink = $attributes["button"]["link"] ?? "#";
$pattern = $attributes["pattern"]["media_id"] ? $attributes["pattern"]["media_id"] : 0;
$pattern_url = wp_get_attachment_url(attachment_id: $pattern);
$inline_style = '';
if ($pattern_url) {
	$inline_style = "--domki-kids-pattern-url: url('" . esc_url($pattern_url) . "');";
}
?>

<div <?php echo get_block_wrapper_attributes(); ?> data-wp-interactive="domki-kids" <?php echo wp_interactivity_data_wp_context([
		"imageSelected" => 1,
		"showCarousel" => false,
		"slidingGallery" => $slidingGallery,
		"moreList" => [],
		"per_page" => $attributes["per_page"] ?? 3,
		"page" => 0,
		"showButton" => $showButton
	]); ?>
	data-wp-on-document--keyup="callbacks.detectKeys" data-wp-watch="callbacks.handleMore"
	id="<?php echo esc_attr($attributes["identifier"]) ?>" style="<?php echo $inline_style; ?>">
	<div class="container">
		<?php if ($title["show"]): ?>
			<h2 class="text-center"><?= $title["text"] ?></h2>
		<?php endif; ?>

		<div class="grid grid-3-2 gap-2 mt-2 elements">
			<?php foreach ($attributes["images"] as $key => $element): ?>
				<div class="flex gap-3 items-center">
					<?php echo my_lazy_load_image($element["media_id"], "element_icon"); ?>
					<h4 class="contrast no-wrap"><?= $element["text"]; ?></h4>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="grid-3 gap-3 my-2">
			<?php foreach ($gallery["images"] as $key => $image): ?>
				<div data-wp-context='{"image" : { "selected" : <?php echo $key + 1; ?> } }' class="show-image"
					data-wp-on--click="actions.openCarousel" data-media_id="<?= $image["media_id"] ?>">
					<?php echo my_lazy_load_image($image["media_id"], "inventory-16/9") ?>
				</div>
			<?php endforeach; ?>
		</div>

		<!-- Load More Images Section -->
		<div class="grid-3 gap-3 my-4">
			<template data-wp-each--moreimg="context.moreList">
				<div data-wp-init="callbacks.initMoreImg" data-wp-on--click="actions.openCarousel"
					data-wp-bind--data-media_id="context.moreimg" class="show-image">
				</div>
			</template>
		</div>

		<?php if ($showButton): ?>
			<div class="flex justify-center items-center" data-wp-class--hide="!callbacks.showButton">
				<button data-wp-on--click="actions.handleMore" title="<?php echo esc_attr($buttonText); ?>"
					class="button-md"><span><?= $buttonText ?></span></button>
			</div>
		<?php endif; ?>
	</div>

	<section class="gallery-modal" data-wp-class--is-active="context.showCarousel">
		<div class="close-gallery" data-wp-on--click="actions.closeCarousel">
			<span class="line-one"></span><span class="line-two"></span>
		</div>
		<section class="gallery_slider"
			data-wp-context='{"gallery" : { "order_by" : <?php echo $slidingGallery["order_by"]; ?> } }'>
			<div class="embla" data-carousel-keyboard-nav="true" data-wp-watch="callbacks.initCarousel"
				data-carousel-loop="true" data-carousel-dots="false" data-carousel-arrows="false"
				data-wp-bind--data-carousel-initial="context.imageSelected">
				<div class="embla__viewport">
					<div class="embla__container">
						<?php foreach ($slidingGallery["media_ids"] as $key => $value): ?>
							<div class="embla__slide">
								<?php echo my_lazy_load_image($value, "gallery"); ?>
							</div>
						<?php endforeach ?>
					</div>
				</div>
			</div>
		</section>
	</section>
</div>