<?php
$theme_url = get_template_directory_uri(); // Correct way to get theme URL in PHP
$logo_mobile = [
    'media_id' => $attributes["logo"]["media_id"],
    'size_prefix' => "footer_logo",
];

$up_icon_url = $theme_url . "/assets/icons/up-icon.svg";

$left = $attributes["left"] ?? "";
$center = $attributes["center"] ?? "";
$right = $attributes["right"] ?? "";




?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <section>
        <div class="footer">
            <a href="<?php echo home_url(); ?>">
                <?php echo my_lazy_load_image($logo_mobile['media_id'], $logo_mobile['size_prefix'], "footer__logo rounded"); ?>
            </a>
            <div class="footer-left flex-col footer__left footer__col">
                <?php echo $left; ?>
            </div>
            <div class="footer__col footer__center"><?php echo $center; ?></div>
            <div class="footer__col footer__right">
                <?php echo $right; ?>
            </div>
            <a title="Wróć na górę strony" class="up" href="#top">
                <img src="<?php echo esc_url($up_icon_url); ?>" alt="up-icon" />
            </a>
        </div>
    </section>
</div>