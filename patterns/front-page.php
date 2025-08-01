<?php
/**
 * Title: front-page
 * Slug: domki-dobre-miejsce/front-page
 * Inserter: no
 */
?>
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:domki-hero/domki-hero {"identifier":"hero","links":[{"text":"O nas","url":"#onas","order_by":1},{"text":"Video","url":"#video","order_by":2},{"text":"galeria","url":"#galeria","order_by":3},{"text":"Atrakcje dla dzieci","url":"#atrakcjedladzieci","order_by":4},{"text":"Atrakcje w okolicy","url":"#atrakcjewokolicy","order_by":5},{"text":"Oferta","url":"#oferta","order_by":6},{"text":"Kontakt","url":"#kontakt","order_by":7}],"logo":{"media_id":361,"alt":""},"images":[{"media_id":635,"text":"Atrakcjes","alt":"","order_by":1},{"media_id":25,"text":"Atrakcjesssss","alt":"","order_by":2},{"media_id":31,"text":"ddddddddddd","alt":"","order_by":3}],"carousel":{"autoplay":"3000","loop":true}} /-->

<!-- wp:domki-about/domki-about {"image_one":{"media_id":33,"alt":""},"image_two":{"media_id":371,"alt":""},"pattern":{"media_id":43,"alt":""},"className":"section"} -->
<div><!-- wp:heading {"textAlign":"left","level":1,"style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary"} -->
<h1 class="wp-block-heading has-text-align-left has-primary-color has-text-color has-link-color"><?php /* Translators: 1. is the start of a 'strong' HTML element, 2. is the end of a 'strong' HTML element */ 
echo sprintf( esc_html__( '%1$sO NAS%2$s', 'domki-dobre-miejsce' ), '<strong>', '</strong>' ); ?></h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php /* Translators: 1. is the start of a 'strong' HTML element, 2. is the end of a 'strong' HTML element */ 
echo sprintf( esc_html__( 'Witaj w Dobrym  Miejscu. To bezpieczna przystań dla ciebie i Twojej rodziny w  malowniczej miejscowości %1$sRabka Zdrój%2$s. ', 'domki-dobre-miejsce' ), '<strong>', '</strong>' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e('Z dala od tłumów i zgiełku. U nasz złapiesz oddech od codziennych spraw i miło spędzisz czas z najbliższymi.', 'domki-dobre-miejsce');?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php /* Translators: 1. is the start of a 'strong' HTML element, 2. is the end of a 'strong' HTML element */ 
echo sprintf( esc_html__( '%1$sDomki Dobre Miejsce%2$s to nie tylko spokój i piękne widoki, to także ogrom zabawy dla całej rodziny. Dzieci nie będą narzekać na nudę! Czeka na Was:', 'domki-dobre-miejsce' ), '<strong>', '</strong>' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:list {"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"fontSize":"medium","fontFamily":"montserrat"} -->
<ul style="font-style:normal;font-weight:700" class="wp-block-list has-montserrat-font-family has-medium-font-size"><!-- wp:list-item {"style":{"typography":{"fontStyle":"normal","fontWeight":"600","lineHeight":"1.6"}},"fontSize":"medium"} -->
<li class="has-medium-font-size" style="font-style:normal;font-weight:600;line-height:1.6"><?php esc_html_e('kryty plac zabaw o pow. 400m²', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"fontSize":"medium"} -->
<li class="has-medium-font-size" style="font-style:normal;font-weight:600"><?php esc_html_e('suchy basen z kulkami,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"fontSize":"medium"} -->
<li class="has-medium-font-size" style="font-style:normal;font-weight:600"><?php esc_html_e('boisko i tyrolka,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"fontSize":"medium"} -->
<li class="has-medium-font-size" style="font-style:normal;font-weight:600"><?php /* Translators: 1. is the start of a 'strong' HTML element, 2. is the end of a 'strong' HTML element */ 
echo sprintf( esc_html__( 'interaktywny projektor%1$s %2$sdla dzieci', 'domki-dobre-miejsce' ), '<strong>', '</strong>' ); ?></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph --></div>
<!-- /wp:domki-about/domki-about -->

<!-- wp:domki-empty/domki-empty {"className":"section","style":{"background":{"backgroundImage":{"url":"http://localhost/wp-content/uploads/2025/07/pattern.png","id":43,"source":"file","title":"pattern"},"backgroundSize":"auto","backgroundPosition":"50% 0"},"elements":{"heading":{"color":{"text":"var:preset|color|primary"}}}},"layout":{"type":"constrained","contentSize":"30rem","justifyContent":"center"}} -->
<div><!-- wp:embed {"url":"https://www.youtube.com/shorts/JsNLi3ntOdo?feature=share","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-9-16 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-9-16 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://www.youtube.com/shorts/JsNLi3ntOdo?feature=share
</div></figure>
<!-- /wp:embed --></div>
<!-- /wp:domki-empty/domki-empty -->

<!-- wp:domki-galleries/domki-galleries {"className":"section","galleries":[{"id":0,"title":"Domki","order_by":1,"gallery_id":15,"images":[{"media_id":23,"order_by":1},{"media_id":24,"order_by":2},{"media_id":26,"order_by":3},{"media_id":371,"order_by":4}],"index":1},{"title":"Atrakcje dla dzieci","order_by":2,"gallery_id":12,"images":[{"media_id":23,"order_by":1},{"media_id":371,"order_by":2},{"media_id":31,"order_by":3},{"media_id":30,"order_by":4},{"media_id":29,"order_by":5}],"index":2},{"title":"Atrakcje w okolicy","order_by":3,"gallery_id":16,"images":[{"media_id":32,"order_by":1},{"media_id":31,"order_by":2},{"media_id":30,"order_by":3},{"media_id":25,"order_by":4},{"media_id":28,"order_by":5},{"media_id":26,"order_by":6}],"index":3}],"style":{"elements":{"heading":{"color":{"text":"var:preset|color|primary"}}}}} /-->

<!-- wp:domki-kids/domki-kids {"images":[{"media_id":508,"text":"Kryty plac zabaw (400m²)","alt":"","order_by":1},{"media_id":511,"text":"Trampolina","alt":"","order_by":2},{"media_id":503,"text":"Basen z kulkami","alt":"","order_by":3},{"media_id":514,"text":"Zjeżdżalnia","alt":"","order_by":4},{"media_id":507,"text":"Ping-Pong","alt":"","order_by":5},{"media_id":506,"text":"Piłkarzyki","alt":"","order_by":6},{"media_id":504,"text":"Huśtawki","alt":"","order_by":7},{"media_id":512,"text":"Tyrolka dla dzieci (25m)","alt":"","order_by":8},{"media_id":510,"text":"Boisko do piłki nożnej","alt":"","order_by":9},{"media_id":513,"text":"Siatkówka","alt":"","order_by":10},{"media_id":505,"text":"Piaskownica","alt":"","order_by":11},{"media_id":509,"text":"Zimą górka i sanki","alt":"","order_by":12}],"button":{"text":"Zobacz więcej","link":"galeria","show":true},"apiGallery":{"id":12,"title":"Atrakcje dla dzieci","media_ids":""},"gallery":{"order_by":0,"title":"","gallery_id":12,"images":[{"media_id":33,"order_by":1},{"media_id":32,"order_by":2},{"media_id":31,"order_by":3}]},"pattern":{"media_id":43,"alt":""},"className":"section","style":{"elements":{"heading":{"color":{"text":"var:preset|color|primary"}}},"background":{"backgroundImage":{"url":"http://localhost/wp-content/uploads/2025/07/pattern.png","id":43,"source":"file","title":"pattern"},"backgroundSize":"auto","backgroundPosition":"48% 44%"}}} /-->

<!-- wp:domki-area/domki-area {"elements":[{"text":"1","unit":"km","url":"Rabkoland","order_by":1},{"text":"2","unit":"km","url":"Park Zdrojowy i Tężnia Solankowa","order_by":2},{"text":"10","unit":"km","url":"Kompleks narciarski BESKID","order_by":3},{"text":"1","unit":"km","url":"Teatr Lalek Rabcio","order_by":4},{"text":"5","unit":"km","url":"Bacówka PTTK na Maciejowej","order_by":5},{"text":"4","unit":"km","url":"Wyciąg do nauki u ZURA","order_by":6},{"text":"2,4","unit":"km","url":"Leśna Ścieżka Edukacyjna","order_by":7},{"text":"1.8","unit":"km","url":"Skansen Taboru Kolejowego w Chabówce","order_by":8},{"text":"1,4","unit":"km","url":"Muzeum Górali i Zbójników","order_by":9}],"gallery":{"order_by":0,"title":"","gallery_id":0,"images":[{"media_id":33,"order_by":1},{"media_id":31,"order_by":2},{"media_id":32,"order_by":3}]},"className":"section","style":{"elements":{"heading":{"color":{"text":"var:preset|color|primary"}}}}} /-->

<!-- wp:domki-inventory/domki-inventory {"className":"section","identifier":"domki","image_one":{"media_id":33,"alt":"","aspect_ratio":"4/3"},"image_two":{"media_id":24,"alt":"","aspect_ratio":"16/9"},"image_three":{"media_id":33,"alt":"","aspect_ratio":"16/9"},"pattern":{"media_id":43,"url":"","alt":""},"style":{"background":{"backgroundImage":{"url":"http://localhost/wp-content/uploads/2025/07/pattern.png","id":43,"source":"file","title":"pattern"},"backgroundSize":"auto","backgroundPosition":"48% 49%"}},"backgroundColor":"pale"} -->
<div><!-- wp:heading {"style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary"} -->
<h2 class="wp-block-heading has-primary-color has-text-color has-link-color"><?php esc_html_e('Domki', 'domki-dobre-miejsce');?></h2>
<!-- /wp:heading -->

<!-- wp:list {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"fontSize":"medium"} -->
<ul style="font-style:normal;font-weight:600" class="wp-block-list has-medium-font-size"><!-- wp:list-item -->
<li><?php esc_html_e('komfortowy&nbsp; dla 4-7 osób (65m²),', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('zmieszczą się dwie rodziny z dziećmi,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('na górze 2 osobne sypialnie,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('na dole salon z TV i wypoczynkiem,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('interaktywny projektor sterowany gestami,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('łazienka z prysznicem,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('wyposażona kuchnia,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('śniadania na zamówienie,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('dla maluchów łóżeczko, krzesełko i wanienka,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('taras z grillem gazowym,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('stabilne Wi-Fi,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('spokojna i bezpieczna okolica,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('kryty plac zabaw obok,', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><?php esc_html_e('domki są identyczne.', 'domki-dobre-miejsce');?></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:domki-inventory/domki-inventory -->

<!-- wp:domki-empty/domki-empty {"title":{"text":"Zaufali nam","show":true},"style":{"elements":{"heading":{"color":{"text":"var:preset|color|primary"}}}}} -->
<div><!-- wp:shortcode -->
[trustindex no-registration=google]
<!-- /wp:shortcode --></div>
<!-- /wp:domki-empty/domki-empty -->

<!-- wp:domki-reservation/domki-reservation {"identifier":"oferta","promotion_text":"Jesienny rabat -20% przy pobycie min. 5 dni","reservation_text":"\u003cstrong\u003eJeżeli potrzebujesz pomocy lub chcesz przyjechać na krócej napisz, lub zadzwoń 534 478 005\u003c/strong\u003e\u003cbr\u003eJesteśmy na  Slowhop\u003cbr\u003e\u003cstrong\u003e20% zadatku przy rezerwacji a 80% dopiero na miejscu\u003c/strong\u003e\u003cbr\u003eNie przyjmujemy zwierząt","promo_1":{"id":0,"alt":"","from":"2025-09-02","to":"2025-09-09","url":"http://localhost/wp-content/uploads/2025/07/walizki.png","img_id":620,"line_1":"Jesień -20%","line_2":"min. 5 dni","price_1":"504 zł","price_2":"740 zł"},"promo_2":{"id":0,"alt":"","from":"2025-09-03","to":"2025-09-07","url":"http://localhost/wp-content/uploads/2025/07/walizki.png","img_id":620,"line_1":"Wrzesień","line_2":"min. 4 dni","price_1":"630 zł","price_2":"840 zł"},"promo_3":{"id":0,"alt":"","from":"2025-10-02","to":"2025-10-02","url":"http://localhost/wp-content/uploads/2025/07/walizki.png","img_id":620,"line_1":"Październik","line_2":"min. 3 dni","price_1":"630 zł","price_2":"840 zł"},"promo_4":{"id":0,"alt":"","from":"2025-01-17","to":"2025-01-23","url":"http://localhost/wp-content/uploads/2025/07/walizki.png","img_id":620,"line_1":"Ferie 2026","line_2":"min. 6 dni","price_1":"650 zł","price_2":"860 zł"}} /-->

<!-- wp:domki-instagram/domki-instagram {"title":"DomkiDobreMiejsce"} -->
<section class="wp-block-domki-instagram-domki-instagram alignwide"><section class="insta"><div class="insta-head"><svg width="24" height="24" fill="none"><path d="M11.99 5.818A6.167 6.167 0 007.634 7.62a6.148 6.148 0 000 8.701 6.168 6.168 0 008.715 0 6.148 6.148 0 000-8.701 6.167 6.167 0 00-4.357-1.802zm0 10.149a4.007 4.007 0 01-2.83-1.171 3.994 3.994 0 012.83-6.824c1.063 0 2.08.421 2.832 1.17a3.994 3.994 0 010 5.654c-.751.75-1.77 1.17-2.831 1.17zM18.397 7.026a1.436 1.436 0 10-1.437-1.434c0 .792.644 1.434 1.437 1.434z" fill="#144D29"></path><path d="M23.364 4.133A6.126 6.126 0 0019.855.631a8.816 8.816 0 00-2.913-.56C15.658.017 15.252 0 11.997 0 8.743 0 8.326 0 7.053.072c-.995.02-1.98.208-2.91.559a6.132 6.132 0 00-3.51 3.502 8.75 8.75 0 00-.558 2.909C.017 8.322 0 8.728 0 11.979c0 3.25 0 3.663.075 4.937.02.995.208 1.977.558 2.91a6.134 6.134 0 003.51 3.502c.93.364 1.915.566 2.913.599C8.339 23.983 8.746 24 12 24c3.255 0 3.672 0 4.945-.073a8.827 8.827 0 002.913-.558 6.15 6.15 0 003.509-3.503c.35-.932.538-1.914.558-2.91.058-1.28.075-1.685.075-4.936 0-3.25 0-3.663-.075-4.937a8.746 8.746 0 00-.56-2.95zm-1.623 12.684a6.702 6.702 0 01-.415 2.246 3.972 3.972 0 01-2.281 2.277 6.653 6.653 0 01-2.226.414c-1.266.058-1.623.073-4.87.073-3.249 0-3.58 0-4.87-.073a6.621 6.621 0 01-2.225-.414 3.979 3.979 0 01-2.291-2.277 6.75 6.75 0 01-.415-2.22c-.057-1.265-.07-1.621-.07-4.863 0-3.243 0-3.574.07-4.864a6.695 6.695 0 01.415-2.244 3.977 3.977 0 012.29-2.279 6.686 6.686 0 012.225-.413c1.268-.058 1.623-.074 4.871-.074s3.581 0 4.87.074c.76.009 1.513.149 2.226.413a3.987 3.987 0 012.281 2.279 6.75 6.75 0 01.415 2.22c.057 1.266.072 1.621.072 4.864 0 3.242 0 3.59-.057 4.862h-.015v-.001z" fill="#144D29"></path></svg><h1 id="hashtag">#DomkiDobreMiejsce</h1></div><div class="container text-center d-block"><!-- wp:sbi/sbi-feed-block /--></div></section></section>
<!-- /wp:domki-instagram/domki-instagram -->

<!-- wp:domki-form/domki-form {"className":"section","identifier":"kontakt","title":{"text":"Kontakt","show":true},"style":{"elements":{"heading":{"color":{"text":"var:preset|color|primary"}}}}} -->
<div><!-- wp:paragraph -->
<p><?php /* Translators: 1. is the start of a 'strong' HTML element, 2. is the end of a 'strong' HTML element, 3. is a 'br' HTML element */ 
echo sprintf( esc_html__( '%1$sDomki Dobre Miejsce%2$s %3$sKarolina i Bartłomiej Sarka', 'domki-dobre-miejsce' ), '<strong>', '</strong>', '<br>' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php /* Translators: 1. is the start of a 'a' HTML element, 2. is a 'br' HTML element, 3. is the end of a 'a' HTML element, 4. is a 'br' HTML element, 5. is the start of a 'a' HTML element, 6. is the end of a 'a' HTML element, 7. is a 'br' HTML element, 8. is the start of a 'a' HTML element, 9. is the end of a 'a' HTML element */ 
echo sprintf( esc_html__( '%1$sul. Bystra 18a%2$s34-700 Rabka-Zdrój%3$s%4$s%5$s+48 534 478 005%6$s%7$s%8$skontakt@domkidobremiejsce.pl%9$s', 'domki-dobre-miejsce' ), '<a href="' . esc_url( 'https://www.google.com/maps?cid=15360951946574660165' ) . '">', '<br>', '</a>', '<br>', '<a href="' . esc_url( 'tel:%20+48%20534%20478%20005' ) . '">', '</a>', '<br>', '<a href="' . esc_url( 'mailto:kontakt@domkidobremiejsce.pl' ) . '">', '</a>' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"spacing":{"padding":{"top":"0","bottom":"0"},"margin":{"top":"0","bottom":"0"}}}} -->
<p style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0"><?php /* Translators: 1. is a 'br' HTML element */ 
echo sprintf( esc_html__( 'Konto bankowe:%1$s14 1050 1445 1000 0097 2146 2498', 'domki-dobre-miejsce' ), '<br>' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php /* Translators: 1. is a 'br' HTML element, 2. is a 'br' HTML element, 3. is a 'br' HTML element, 4. is a 'br' HTML element, 5. is the start of a 'a' HTML element, 6. is the end of a 'a' HTML element */ 
echo sprintf( esc_html__( 'Współpracujemy blisko%1$sz Willą Hanusia do której%2$srównież serdecznie%3$szapraszamy rodziny z dziećmi  :%4$s%5$swww.hanusia-rabka.pl%6$s', 'domki-dobre-miejsce' ), '<br>', '<br>', '<br>', '<br>', '<a href="' . esc_url( 'https://www.hanusia-rabka.pl' ) . '">', '</a>' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:domki-form/domki-form -->

<!-- wp:template-part {"slug":"footer","area":"footer"} /-->