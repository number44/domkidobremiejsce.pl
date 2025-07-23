<?php

$unique_id = wp_unique_id('p-');

$theme_url = get_template_directory_uri(); // Correct way to get theme URL in PHP

$hero_logo = [
	'media_id' => $attributes["logo"]["media_id"],
	'size_prefix' => "hero_logo",
];

$instagram_icon_url = $theme_url . "/assets/icons/instagram.svg";
$facebook_icon_url = $theme_url . "/assets/icons/facebook.svg";
// Adds the global state.
$links = isset($attributes['links']) ? $attributes['links'] : [];
$reservation = isset($attributes['reservation']) ? $attributes['reservation'] : ['url' => '#', 'text' => ''];
$phone = isset($attributes['phone']) ? $attributes['phone'] : ['url' => '', 'text' => ''];
$carousel = isset($attributes['carousel']) ? $attributes['carousel'] : false;

$loop = $carousel["loop"] ? "true" : "false";

?>

<section <?php echo get_block_wrapper_attributes(); ?> data-wp-interactive="domki-hero" <?php echo wp_interactivity_data_wp_context(
		[
			'isOpen' => false
		]
	);
	?>>

	<div class="container hide-on-small">
		<svg class="mouse " width="32" height="90" viewBox="0 0 32 90">

			<g id="Warstwa_2" data-name="Warstwa 2">
				<g id="Warstwa_1-2" data-name="Warstwa 1">
					<path class="cls-1" d="M10.39,0V50.91"></path>
					<path class="cls-1 kr" d="M10.39,66.7v5.82"></path>
					<rect class="cls-1 kropka" x="1" y="61" width="18.79" height="28" rx="9.39"></rect>
				</g>
			</g>
		</svg>
		<div class="left">

			<div class="hero-logo">
				<?php echo my_lazy_load_image($hero_logo['media_id'], $hero_logo['size_prefix'], "rounded"); ?>
			</div>
			<div class="menu">
				<ul class="menu-fixed-ul">
					<?php foreach ($attributes['links'] as $link): ?>
						<?php
						$linkUrl = $link['url'];
						if (!is_front_page()):
							$linkUrl = home_url() . $linkUrl;
						endif;
						?>
						<li><a class="active" href="<?php echo esc_url($linkUrl); ?>"><?= $link['text']; ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
		<div class="right">
			<div class="right-top flex justify-between">

				<section class="hero-buttons  btn-grp gap-4">
					<a title="Zarezerwuj" href="<?php echo esc_url($reservation['url']); ?>"
						class="reset-reservation cp btn-fix btn btn-d btn-primary">
						<?= $reservation['text']; ?>
					</a>
					<a title="Zadzwoń" href="tel:<?php echo esc_attr($phone['url']); ?>" class="btn cp btn-l
					btn-secondary">
						<svg width="18" height="22" viewBox="0 0 18 22" fill="none">
							<path
								d="M18 16.4022V20.724C18.0001 21.0334 17.9042 21.3314 17.7316 21.5578C17.559 21.7842 17.3225 21.9221 17.07 21.9438C16.633 21.9804 16.276 22 16 22C7.16299 22 0 13.2452 0 2.44444C0 2.10711 0.015 1.67078 0.0459999 1.13667C0.0637223 0.827987 0.176581 0.539013 0.361803 0.328055C0.547025 0.117097 0.790822 -0.000139863 1.044 3.13597e-07H4.57999C4.70403 -0.000153187 4.82369 0.0560499 4.91572 0.157692C5.00775 0.259333 5.06559 0.399157 5.07799 0.55C5.10099 0.831111 5.12199 1.05478 5.14199 1.22467C5.34073 2.9198 5.748 4.56846 6.34999 6.11478C6.44499 6.35922 6.38299 6.65133 6.20299 6.80778L4.04499 8.69245C5.36445 12.4501 7.81454 15.4447 10.889 17.0573L12.429 14.4247C12.4919 14.3171 12.5838 14.24 12.6885 14.2067C12.7932 14.1734 12.9041 14.1861 13.002 14.2426C14.267 14.9769 15.6156 15.4735 17.002 15.7153C17.141 15.7398 17.324 15.7667 17.552 15.7936C17.6752 15.809 17.7894 15.8798 17.8723 15.9923C17.9553 16.1047 18.0011 16.2508 18.001 16.4022H18Z"
								fill="black">
							</path>
						</svg>
						<span>
							<?= $attributes['phone']['text']; ?>
						</span>
					</a>

				</section>
				<section class="hero-socials flex gap-2 align-center px-2">
					<a title="facebook link"
						href="https://www.facebook.com/<?php echo esc_attr($attributes['facebook']); ?>"
						data-wp-on--click="actions.redirectToSocial" data-social="facebook"
						data-wp-context='<?php echo wp_json_encode(['socialType' => 'facebook'], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>'
						class="c">
						<img src="<?php echo esc_url($facebook_icon_url); ?>" alt="facebook-icon" />
					</a>
					<a title="instagram link"
						href="https://www.instagram.com/<?php echo esc_attr($attributes['instagram']); ?>"
						data-wp-on--click="actions.redirectToSocial" data-social="instagram" class="c instm"
						data-wp-context='<?php echo wp_json_encode(['socialType' => 'instagram'], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>'>
						<img src="<?php echo esc_url($instagram_icon_url); ?>" alt="instagram-icon" />
					</a>

				</section>
			</div>
			<section class="right-content">
				<div class="carousel-box">
					<div class="embla" data-carousel-autoplay="<?php echo esc_attr($carousel['autoplay']); ?>"
						data-carousel-loop="<?php echo esc_attr($loop); ?>" data-carousel-dots="false"
						data-carousel-arrows="true" data-carousel-initial="1" data-wp-watch="callbacks.initCarousel">
						<div class="embla__viewport">
							<div class="embla__container">
								<?php foreach ($attributes['images'] as $image): ?>
									<div class="embla__slide">
										<?php echo my_lazy_load_image($image['media_id'], "carousel"); ?>
										<h1 class="embla__slide-text">
											<?php echo $image['text']; ?>
										</h1>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
						<div class="embla__buttons">
							<button class="embla__button embla__button--prev" type="button">
								<img src="<?php echo esc_url($theme_url); ?>/assets/icons/arrow-icon.svg" alt="">
							</button>
							<button class="embla__button embla__button--next" type="button">
								<img src="<?php echo esc_url($theme_url); ?>/assets/icons/arrow-icon.svg" alt="">
							</button>
						</div>
						<div class="embla__dots"></div>
					</div>
				</div>
			</section>
		</div>
	</div>
	<section class="carousel-mobile hide-on-large">
		<div class="carousel-box">
			<div class="embla" data-carousel-autoplay="<?php echo esc_attr($carousel['autoplay']); ?>"
				data-carousel-loop="<?php echo esc_attr($loop); ?>" data-wp-watch="callbacks.initCarousel">
				<div class="embla__viewport">
					<div class="embla__container">
						<?php foreach ($attributes['images'] as $key => $image): ?>
							<div class="embla__slide">
								<?php echo my_lazy_load_image($image['media_id'], "carousel_mobile"); ?>
								<h1 class="embla__slide-text">
									<?php echo $image['text']; ?>
								</h1>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
				<div class="embla__buttons hide">
					<button class="embla__button embla__button--prev" type="button">
						<img src="<?php echo esc_url($theme_url); ?>/assets/icons/arrow-icon.svg" alt="">
					</button>
					<button class="embla__button embla__button--next" type="button">
						<img src="<?php echo esc_url($theme_url); ?>/assets/icons/arrow-icon.svg" alt="">
					</button>
				</div>
				<div class="embla__dots"></div>
			</div>

		</div>
	</section>
</section>