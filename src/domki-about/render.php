<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$image_one = [
	'media_id' => $attributes["image_one"]["media_id"],
	'size_prefix' => "about_one",
];
$image_two = [
	'media_id' => $attributes["image_two"]["media_id"],
	'size_prefix' => "about_two",
];
$pattern = [
	'media_id' => $attributes["pattern"]["media_id"],
	'size_prefix' => "pattern",
];
?>
<div <?php echo get_block_wrapper_attributes(); ?> id="<?php echo esc_attr($attributes["identifier"]) ?>"
	class="sections">
	<div class="container">
		<div class="left">
			<div class="img-about_one">
				<?php echo my_lazy_load_image($pattern['media_id'], $pattern['size_prefix'], "pattern"); ?>
				<?php echo my_lazy_load_image($image_one['media_id'], $image_one['size_prefix'], "sticky"); ?>
			</div>

		</div>
		<div class="right">
			<?php echo $content; ?>
			<div class="img-about_two">
				<?php echo my_lazy_load_image($image_two['media_id'], $image_two['size_prefix']); ?>
			</div>
		</div>
	</div>
</div>