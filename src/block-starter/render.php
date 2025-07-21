<?php

$unique_id = wp_unique_id('p-');

wp_interactivity_state(
	'domki-navbar',
	array(
		'isDark' => false,
		'darkText' => esc_html__('Switch to Light', 'domki-navbar'),
		'lightText' => esc_html__('Switch to Dark', 'domki-navbar'),
		'themeText' => esc_html__('Switch to Dark', 'domki-navbar'),
	)
);
?>
<div <?php echo get_block_wrapper_attributes(); ?> data-wp-interactive="domki-navbar" <?php echo wp_interactivity_data_wp_context(array('isOpen' => false)); ?> data-wp-watch="callbacks.logIsOpen"
	data-wp-class--dark-theme="state.isDark">
	<button data-wp-on--click="actions.toggleTheme" data-wp-text="state.themeText"></button>

	<button data-wp-on--click="actions.toggleOpen" data-wp-bind--aria-expanded="context.isOpen"
		aria-controls="<?php echo esc_attr($unique_id); ?>">
		<?php esc_html_e('Toggle', 'domki-navbar'); ?>
	</button>

	<p id="<?php echo esc_attr($unique_id); ?>" data-wp-bind--hidden="!context.isOpen">
		<?php
		esc_html_e('Menu górne - hello from an interactive block!', 'domki-navbar');
		?>
	</p>
</div>