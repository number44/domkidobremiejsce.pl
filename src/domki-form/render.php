<?php
$title = [
	"text" => $attributes["title"]["text"] ?? "Galeria",
	"show" => $attributes["title"]["show"] ?? true
];

?>

<div <?php
echo get_block_wrapper_attributes(); ?> data-wp-interactive="domki-form" <?php echo wp_interactivity_data_wp_context(
   	[
   		'isOpen' => false,
   		"loading" => false,

   		"errorFirstname" => false,
   		"errorEmail" => false,
   		"errorMessage" => false,
   		"errorConsent" => false,
   		"success" => false
   	]
   ); ?>
	id="<?php echo esc_attr($attributes["identifier"]) ?>">
	<div class="container">
		<?php if ($title["show"]): ?>
			<h2 class="text-center mb-4"><?= $title["text"] ?></h2>
		<?php endif; ?>
		<div class="content">

			<section class="left">
				<?php echo $content; ?>
			</section>
			<section class="right">
				<form class="form grid gap-2" data-wp-on--submit="actions.handleSubmit" novalidate>
					<div class="loader-box" data-wp-class--loader-box__hide="!context.success">
						<div>Dziękujemy za wiadomość! <span>&#x2714;
							</span></div>
					</div>
					<div class="grid-3 gap-4 flex-wrap">
						<section class="grid">
							<label for="firstname">
								Imię
							</label>
							<input required type="text" name="firstname" id="firstname">
							<div data-wp-class--noerror="!context.errorFirstname" class="error">Uzupełnij Pole
							</div>
						</section>
						<section class="grid">
							<label for="email">
								Email
							</label>
							<input required type="email" name="email" id="email">
							<div data-wp-class--noerror="!context.errorEmail" class="error">Uzupełnij Pole</div>
						</section>
						<section class="grid">
							<label for="phone">Telefon (opcjonalne)</label>
							<input type="tel" id="phone" name="phone" pattern="[0-9]+">
							<div class="error"></div>
						</section>
					</div>
					<div class="grid">
						<label for="message">Wiadomość</label>
						<textarea id="message" name="message" placeholder="Wiadomość" rows="8" cols="10"></textarea>
						<div data-wp-class--noerror="!context.errorMessage" class="error">Uzupełnij Pole</div>

					</div>
					<div class="flex gap-2 flex-wrap">
						<input type="checkbox" name="consent" id="consent">
						<label for="consent">Oświadczam, że zapoznałem się i akceptuję treść <a href="#">Polityki
								Prywatności</a></label>
						<div data-wp-class--noerror="!context.errorConsent" class="error w-full grow">Uzupełnij Pole
						</div>
					</div>

					<div class="grid place-center">
						<button data-wp-bind--disabled="context.loading" type="submit" class="button cp">
							<span data-wp-class--hide="context.loading">Wyślij</span><span
								data-wp-class--hide="!context.loading" class="loader"></span>
						</button>
					</div>
				</form>
			</section>
		</div>
	</div>
</div>