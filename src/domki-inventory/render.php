<?php

$unique_id = wp_unique_id('p-');
$aspect_ratio_placeholder = "16/9";



$image_one_aspect = $attributes["image_one"]["aspect_ratio"] ? $attributes["image_one"]["aspect_ratio"] : $aspect_ratio_placeholder;

$image_one = [
    'media_id' => $attributes["image_one"]["media_id"],
    'size_prefix' => "inventory-" . $image_one_aspect,
];

$image_two_aspect = $attributes["image_two"]["aspect_ratio"] ? $attributes["image_two"]["aspect_ratio"] : $aspect_ratio_placeholder;

$image_two = [
    'media_id' => $attributes["image_two"]["media_id"],
    'size_prefix' => "inventory-" . $image_two_aspect,
];


$image_three_aspect = $attributes["image_three"]["aspect_ratio"] ? $attributes["image_three"]["aspect_ratio"] : $aspect_ratio_placeholder;

$image_three = [
    'media_id' => $attributes["image_three"]["media_id"],
    'size_prefix' => "inventory-" . $image_three_aspect,
];

$pattern = [
    'media_id' => $attributes["pattern"]["media_id"],
    'size_prefix' => "pattern",
];

?>
<div <?php echo get_block_wrapper_attributes(); ?> data-wp-interactive="domki-navbar"
    id="<?php echo esc_attr($attributes["identifier"]) ?>" <?php echo wp_interactivity_data_wp_context(array('isOpen' => false)); ?> data-wp-watch="callbacks.logIsOpen" data-wp-class--dark-theme="state.isDark">
    <?php echo my_lazy_load_image($pattern['media_id'], $pattern['size_prefix'], "inv-pattern-1"); ?>
    <div class="container">
        <section class="left"><?php echo $content; ?></section>
        <section class="center">
            <?php echo my_lazy_load_image($pattern['media_id'], $pattern['size_prefix'], "inv-pattern-2"); ?>
            <?php echo my_lazy_load_image($image_one['media_id'], $image_one['size_prefix'], "sticky"); ?>
        </section>
        <section class="right">
            <?php echo my_lazy_load_image($image_two['media_id'], $image_two['size_prefix']); ?>
            <?php echo my_lazy_load_image($image_three['media_id'], $image_three['size_prefix']); ?>
        </section>
    </div>
</div>