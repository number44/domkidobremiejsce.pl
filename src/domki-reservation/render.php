<?php
$theme_url = get_template_directory_uri(); // Correct way to get theme URL in PHP


$six_people_icon_url = $theme_url . "/assets/icons/6x_ludzikow.svg";
$eight_people_icon_url = $theme_url . "/assets/icons/8x_ludzikow.svg";
?>
<div <?php echo get_block_wrapper_attributes(); ?> id="<?php echo esc_attr($attributes["identifier"]) ?>">
    <section class="oferta-section" id=<?php echo esc_attr($attributes["identifier"]); ?>>
        <div class="container">
            <h1 id="oferta-target"><?= $attributes['title']; ?></h1>
            <div class="of">
                <p class="oferta"><?= $attributes['promotion_text']; ?></p>
            </div>

            <div class="btns">
                <div class="btn cp btn-left oferta6 btn-oferta btn--active">
                    <div class="circle"></div>
                    <div>DO 6 OSÓB</div>
                    <img src="<?php echo esc_url($six_people_icon_url); ?>" alt="oferta 6 osób" />
                </div>
                <div class="btn cp btn-right oferta8 btn-oferta">
                    <div class="circle"></div>
                    <div>DO 8 OSÓB</div>
                    <img loading="lazy" src="<?php echo esc_url($eight_people_icon_url); ?>" alt="oferta 8 osób" />
                </div>
            </div>
            <div class="oferty">
                <div class="oferta-1 promocja">
                    <h4><?php echo $attributes['promo_1']['line_1']; ?></h4>
                    <p><?php echo $attributes['promo_1']['line_2']; ?></p>
                    <div class="icona over-hidden">
                        <img loading="lazy" src="<?php echo esc_url($attributes['promo_1']['url']); ?>"
                            alt="promo 1 icon" />
                    </div>
                    <div class="cena" data-cena-1=<?php echo esc_attr($attributes['promo_1']['price_1']); ?>
                        data-cena-2=<?php echo esc_attr($attributes['promo_1']['price_2']); ?>>
                        <?php echo esc_attr($attributes['promo_1']['price_1']); ?>
                    </div>
                    <div data-start="<?php echo esc_attr($attributes['promo_1']['from']); ?>"
                        data-finish="<?php echo esc_attr($attributes['promo_1']['to']); ?>"
                        class="btn ucase cp btn-g-fix">
                        Rezerwuj
                    </div>
                </div>
                <div class="oferta-2 promocja">
                    <h4><?php echo $attributes['promo_2']['line_1']; ?></h4>
                    <p><?php echo $attributes['promo_2']['line_2']; ?></p>
                    <div class="icona over-hidden">
                        <img loading="lazy" data-aos="fade-up" data-aos-delay="100"
                            src="<?php echo esc_url($attributes['promo_2']['url']); ?>" alt="promo 1 icon" />
                    </div>
                    <div class="cena" data-cena-1="<?php echo esc_attr($attributes['promo_2']['price_1']); ?>"
                        data-cena-2="<?php echo esc_attr($attributes['promo_2']['price_2']); ?>">
                        <?php echo esc_attr($attributes['promo_2']['price_1']); ?>
                    </div>
                    <div data-start="<?php echo esc_attr($attributes['promo_2']['from']); ?>"
                        data-finish="<?php echo esc_attr($attributes['promo_2']['to']); ?>"
                        class="btn ucase cp btn-g-fix">
                        Rezerwuj
                    </div>
                </div>
                <div class="oferta-3 promocja">
                    <h4><?php echo $attributes['promo_3']['line_1']; ?></h4>
                    <p><?php echo $attributes['promo_3']['line_2']; ?></p>
                    <div class="icona over-hidden">
                        <img loading="lazy" data-aos="fade-up" data-aos-delay="200"
                            src="<?php echo esc_url($attributes['promo_3']['url']); ?>" alt="promo 1 icon" />
                    </div>
                    <div class="cena" data-cena-1="<?php echo esc_attr($attributes['promo_3']['price_1']); ?>"
                        data-cena-2="<?php echo esc_attr($attributes['promo_3']['price_2']); ?>">
                        <?php echo esc_attr($attributes['promo_3']['price_1']); ?>
                    </div>
                    <div data-start="<?php echo esc_attr($attributes['promo_3']['from']); ?>"
                        data-finish="<?php echo esc_attr($attributes['promo_3']['to']); ?>"
                        class="btn ucase cp btn-g-fix">
                        Rezerwuj
                    </div>
                </div>
                <div class="oferta-4 promocja">
                    <h4><?php echo $attributes['promo_4']['line_1']; ?></h4>
                    <p><?php echo $attributes['promo_4']['line_2']; ?></p>
                    <div class="icona over-hidden">
                        <img loading="lazy" data-aos="fade-up" data-aos-delay="300"
                            src="<?php echo esc_url($attributes['promo_4']['url']); ?>" alt="promo 1 icon" />
                    </div>
                    <div class="cena" data-cena-1="<?php echo esc_attr($attributes['promo_4']['price_1']); ?>"
                        data-cena-2="<?php echo esc_attr($attributes['promo_4']['price_2']); ?>">
                        <?php echo esc_attr($attributes['promo_4']['price_1']); ?>
                    </div>
                    <div data-start="<?php echo esc_attr($attributes['promo_4']['from']); ?>"
                        data-finish="<?php echo esc_attr($attributes['promo_4']['to']); ?>"
                        class="btn ucase cp btn-g-fix">
                        Rezerwuj
                    </div>
                </div>
            </div>
            <div class="content text-center" dangerouslySetInnerHTML={{ __html: attributes.reservation_text }}>
                <?php echo $attributes['reservation_text']; ?>
            </div>
            <br />
            <div data-href="<?php echo esc_attr($attributes['button']["url"]); ?>"
                class="btn-text button button-reservation-clear no-wrap">
                <?= $attributes['button']['text']; ?>
            </div>
        </div>
    </section>
</div>