<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$title = [
	"text" => $attributes["title"]["text"] ?? "Video",
	"show" => $attributes["title"]["show"] ?? true
];
?>
<div <?php echo get_block_wrapper_attributes(
	[
		"class" => "section"
	]
); ?>
	id="<?php echo esc_attr($attributes["identifier"]) ?>">
	<div class="container">
		<?php if ($title["show"]): ?>
			<h2 class="text-center"><?= $title["text"] ?></h2>
		<?php endif; ?>
		<div class="content-block">
			<?php echo $content; ?>
		</div>
	</div>
</div>