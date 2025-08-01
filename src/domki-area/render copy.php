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
if ($galleryApi && !empty($galleryApi->media_ids)) { // Modified line
	$apiMediaIdsArray = array_map('intval', explode(',', $galleryApi->media_ids));
}
$api_diff = array_diff($apiMediaIdsArray, $galleryIdsArray);

$apiGalleryUniqueIds = array_unique($api_diff);

$apiGalleryUniqueIds = array_unique($api_diff);
$concatedArr = array_merge($galleryIdsArray, $apiGalleryUniqueIds);
$combinedMediaIds = array_values(array_merge($apiMediaIdsArray, $galleryIdsArray));
$arrNoDuplicates = array_keys(array_flip($concatedArr));

$slidingGallery = [
	"title" => $gallery["title"],
	"order_by" => $gallery["order_by"],
	"images" => implode(",", $galleryIds), // Keeping this as a comma-separated string as per your original output
	"api" => ($galleryApi && $galleryApi->media_ids) ? $galleryApi->media_ids : [], // Added check here too

	"media_ids" => $concatedArr ? $concatedArr : [],
];
$showButton = $attributes["button"]["show"] ?? true;
$buttonText = $attributes["button"]["text"] ?? "Zobacz Więcej";
$buttonLink = $attributes["button"]["link"] ?? "#";


?>

<div <?php echo get_block_wrapper_attributes(); ?> data-wp-interactive="domki-area" <?php echo wp_interactivity_data_wp_context(array(
		"imageSelected" => 1,
		"showCarousel" => false,
	)); ?>
	id="<?php echo esc_attr($attributes["identifier"]) ?>" data-wp-on-document--keyup="callbacks.detectKeys">
	<?php if ($title["show"]): ?>
		<h2 class="text-center"><?= $title["text"] ?></h2>
	<?php endif; ?>
	<div class="grid-3 gap-4 py-2 elements container">
		<?php foreach ($attributes["elements"] as $key => $element): ?>
			<div class="area-item">
				<h3><?php echo $element["text"]; ?><small class="unit"><?php echo $element["unit"]; ?></small>
				</h3>
				<h4 class="contrast"><?= $element["url"]; ?></h4>
			</div>
		<?php endforeach; ?>
	</div>
	<div class="container">

		<div class=" grid-3 gap-3 my-4">
			<?php foreach ($gallery["images"] as $key => $image): ?>
				<div data-wp-context='{"image" : { "selected" : <?php echo $key + 1; ?> } }' class="show-image"
					data-wp-on--click="actions.openCarousel" data-media_id="<?= $image["media_id"] ?>">
					<?php echo my_lazy_load_image($image["media_id"], "inventory-16/9") ?>
				</div>
			<?php endforeach; ?>
		</div>
		<?php if ($showButton): ?>
			<div class="flex justify-center items-center">
				<a href="<?php echo esc_attr($buttonLink); ?>" class="button-md"><?= $buttonText ?></a>
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