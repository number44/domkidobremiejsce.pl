<?php

$logo_desktop = [
	'media_id' => $attributes["logo"]["media_id"],
	'size_prefix' => "logo_desktop",
];
$logo_mobile = [
	'media_id' => $attributes["logo"]["media_id"],
	'size_prefix' => "logo_mobile",
];

$pattern = [
	'media_id' => $attributes["pattern"]["media_id"],
	'size_prefix' => "pattern",
];

$logo_desktop_url = isset($attributes["logo"]["url"]) ? $attributes["logo"]["url"] : '';
$logo_mobile_url = isset($attributes["logo"]["url"]) ? $attributes["logo"]["url"] : ''; // Assuming same logo for now, but could be separate attributes
$pattern_url = isset($attributes["pattern"]["url"]) ? $attributes["pattern"]["url"] : '';

$theme_url = get_template_directory_uri(); // Correct way to get theme URL in PHP
$page_url = home_url(); // Correct way to get home URL in PHP

$links = isset($attributes['links']) ? $attributes['links'] : [];
$reservation = isset($attributes['reservation']) ? $attributes['reservation'] : ['url' => '#', 'text' => ''];
$phone = isset($attributes['phone']) ? $attributes['phone'] : ['url' => '', 'text' => ''];
$facebook = isset($attributes['facebook']) ? $attributes['facebook'] : '';
$instagram = isset($attributes['instagram']) ? $attributes['instagram'] : '';
$mobile_attrs = isset($attributes['mobile']) ? $attributes['mobile'] : ['line_1' => '', 'line_2' => '', 'reservation_text' => ''];

$menu_desktop_icon_url = $theme_url . "/assets/icons/menu-desktop.svg";
$instagram_icon_url = $theme_url . "/assets/icons/instagram.svg";
$facebook_icon_url = $theme_url . "/assets/icons/facebook.svg";
$close_icon_url = $theme_url . "/assets/icons/close-icon.svg";
?>
<div <?php echo get_block_wrapper_attributes(); ?> data-wp-interactive="domki-navbar" <?php echo wp_interactivity_data_wp_context([
		"isOpen" => false,
		"instagram" => $instagram,
		"facebook" => $facebook,
		"isMobileMenuOpen" => false
	]); ?> data-wp-on-document--scroll="callbacks.handleScroll"
	data-wp-watch="callbacks.watchMobileMenu">
	<div class="indicator-container">
		<div class="indicator" data-wp-on-document--keydown="callbacks.logKeydown"></div>
	</div>
	<div id="top-target" class="patt1">
		<?php echo my_lazy_load_image($pattern['media_id'], $pattern['size_prefix']); ?>
	</div>

	<div class="menu-fixed hide-on-small">
		<div class="menu-container">
			<section class="left">
				<div class="dropdown-menu-container">
					<button>
						<img class="menu-fixed-icon" src="<?php echo $menu_desktop_icon_url; ?>" alt="menu-icon" />
					</button>
					<div class="dropdown-menu" data-wp-class--show-menu-fixed-nav="context.isOpen">
						<?php foreach ($attributes['links'] as $link): ?>
							<?php
							$linkUrl = $link['url'];
							if (!is_front_page()):
								$linkUrl = home_url() . $linkUrl;
							endif;
							?>
							<a class="active" href="<?php echo esc_url($linkUrl); ?>"><?= $link['text']; ?></a>
						<?php endforeach; ?>
					</div>
				</div>
				<a title="Domki dobre miejsce - strona główna" href="<?php esc_url(home_url()) ?>"
					class="logo flex align-center justify-center px-1 py-1">
					<?php echo my_lazy_load_image($logo_desktop['media_id'], $logo_desktop['size_prefix'], "rounded"); ?>
				</a>
			</section>
			<section class="center btn-grp gap-4">
				<a title="Zarezerwuj" href="<?php echo esc_url($reservation['url']); ?>"
					class="reset-reservation cp btn-fix btn btn-d btn-primary"><?= $reservation['text']; ?></a>
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
			<section class="right">
				<div class="socials flex gap-2 px-2">
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
				</div>
			</section>
		</div>
	</div>

	<div id="mobile-header" class="hide-on-large">
		<div class="open-menu-icon cp" data-wp-on--click="actions.openMobileMenu">
			<img class="menu-fixed-icon" src="<?php echo $menu_desktop_icon_url; ?>" alt="menu-icon" />
		</div>
		<div class="mobile-socials ">
			<div class="socials flex gap-2 px-2">
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
			</div>
		</div>

	</div>



	<div class="mobile-logo hide-on-large rounded">
		<a href="<?php esc_url(home_url()) ?>" title="Domki dobre miejsce - strona główna">
			<?php echo my_lazy_load_image($logo_mobile['media_id'], $logo_mobile['size_prefix'], "rounded"); ?>
		</a>
	</div>

	<div class=" flex justify-center align-center flex-wrap gap-3 btn-grp hide-on-large">
		<a href="<?php echo esc_url($reservation['url']); ?>" class="reset-reservation btn btn-fix cp btn-primary">
			<?= $reservation['text']; ?>
		</a>
		<a title="Zadzwoń" href="tel:<?php echo esc_attr($phone['url']); ?>" class="btn cp btn-l
					btn-secondary gap-0">
			<svg width="18" height="22" viewBox="0 0 18 22" fill="none">
				<path
					d="M18 16.4022V20.724C18.0001 21.0334 17.9042 21.3314 17.7316 21.5578C17.559 21.7842 17.3225 21.9221 17.07 21.9438C16.633 21.9804 16.276 22 16 22C7.16299 22 0 13.2452 0 2.44444C0 2.10711 0.015 1.67078 0.0459999 1.13667C0.0637223 0.827987 0.176581 0.539013 0.361803 0.328055C0.547025 0.117097 0.790822 -0.000139863 1.044 3.13597e-07H4.57999C4.70403 -0.000153187 4.82369 0.0560499 4.91572 0.157692C5.00775 0.259333 5.06559 0.399157 5.07799 0.55C5.10099 0.831111 5.12199 1.05478 5.14199 1.22467C5.34073 2.9198 5.748 4.56846 6.34999 6.11478C6.44499 6.35922 6.38299 6.65133 6.20299 6.80778L4.04499 8.69245C5.36445 12.4501 7.81454 15.4447 10.889 17.0573L12.429 14.4247C12.4919 14.3171 12.5838 14.24 12.6885 14.2067C12.7932 14.1734 12.9041 14.1861 13.002 14.2426C14.267 14.9769 15.6156 15.4735 17.002 15.7153C17.141 15.7398 17.324 15.7667 17.552 15.7936C17.6752 15.809 17.7894 15.8798 17.8723 15.9923C17.9553 16.1047 18.0011 16.2508 18.001 16.4022H18Z"
					fill="#000000">
				</path>
			</svg>
			<span>
				<?= $attributes['phone']['text']; ?>
			</span>
		</a>
	</div>
	<div id="mobile-menu" class="hide-on-large" data-wp-class--show-mobile-menu="context.isMobileMenuOpen">
		<section class="mobile-menu_header flex justify-between align-center">
			<div class="left">
				<h5 class="no-wrap line-one"><?= $attributes['mobile']['line_1']; ?></h5>
				<h5 class="line-two"><?= $attributes['mobile']['line_2']; ?></h5>
			</div>
			<div class="right" data-wp-on--click="actions.closeMobileMenu">
				<div class="close-icon">
					<img src="<?php echo esc_url($close_icon_url); ?>" alt="close-icon" />
				</div>
			</div>

		</section>
		<section>
			<div class="mobile-menu_body">
				<ul>
					<?php foreach ($attributes['links'] as $link): ?>
						<li>
							<a class="no-wrap" href="<?php echo esc_url($link['url']); ?>"
								data-wp-on--click="actions.closeMobileMenu">
								<?= $link['text']; ?>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
				<a href="<?php echo esc_url($reservation['url']); ?>"
					class="reset-reservation btn btn-fix cp btn-primary">
					<?php echo $reservation['text']; ?>
				</a>
				<a href="tel:<?php echo esc_attr($phone['url']); ?>">
					<div class="btn btn-secondary"><?php echo $phone['text']; ?></div>
				</a>
			</div>
	</div>
	</section>
	<div class="mobile-menu_body hide">
		<ul>
			<?php foreach ($attributes['links'] as $link): ?>
				<li>
					<a class="no-wrap" href="<?php echo esc_url($link['url']); ?>"
						data-wp-on--click="actions.closeMobileMenu">
						<?= $link['text']; ?>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
		<a href="<?php echo esc_url($reservation['url']); ?>" class="reset-reservation btn btn-fix cp btn-primary">
			<?php echo $reservation['text']; ?>
		</a>
		<a href="tel:<?php echo esc_attr($phone['url']); ?>">
			<div class="btn btn-secondary"><?php echo $phone['text']; ?></div>
		</a>
	</div>

</div>
</div>