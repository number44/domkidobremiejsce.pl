<?php


if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

function add_gtm_and_consent_mode_to_header()
{
    ?>
    <!-- Google Tag Manager -->
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-WSRMS42');
    </script>
    <!-- End Google Tag Manager -->
    <!-- Google Consent Mode -->
    <script>
        (function (w, d, s, g) {
            var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
            j.async = true; j.src = g; f.parentNode.insertBefore(j, f);
        })
            (window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=G-ZRV8KK6WEY');
    </script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('consent', 'default', {
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
        });
        gtag('js', new Date());
        gtag('config', 'G-ZRV8KK6WEY');
    </script>
    <?php
}
add_action('wp_head', 'add_gtm_and_consent_mode_to_header');

// Add consent banner HTML and JavaScript
function add_consent_banner()
{

    ?>
    <div id="consent-banner">
        <p>W ramach świadczonych przez nas usług staramy się wyświetlać reklamy odpowiadające Twoim zainteresowaniom, które
            dotyczą naszych produktów oraz produktów klientów korzystających z naszych usług reklamowych (marketing
            bezpośredni). W tym celu wykorzystujemy informacje zapisywane w plikach cookies, które otrzymujemy podczas
            korzystania z naszych stron. </p>
        <p>Więcej informacji uzyskasz odwiedzając naszą stronę. <a href="/privacy-policy">Polityka Prywatności</a></p>
        <div class="button-group">
            <button class="consent-btn" id="decline-consent">Odrzuć</button>
            <button class="consent-btn" id="accept-consent">Akceptuj wszystko</button>
        </div>
    </div>
    <style>
        .button-group {
            margin-block: 1rem;
            display: flex;
            gap: 1rem;
            justify-content: space-between;
            align-items: center;
            max-width: 60rem;
            padding-right: 2rem;
        }

        #consent-banner :is(p, a) {
            font-size: .8rem;
        }

        #consent-banner :is(a) {
            color: #fff;
            text-decoration: underline;
        }

        #consent-banner {
            border-radius: .5rem;
            position: fixed;
            inset-block-end: 0rem;
            inset-inline-start: 0rem;
            /* background-color: #144E2B; */
            color: white;
            width: min(100%, 60rem);
            background-color: #144E2B;
            padding: 20px;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        @media (min-width : 75rem) {
            #consent-banner {


                inset-block-end: 1rem;
                inset-inline-start: 1rem;
            }
        }

        #accept-consent {
            border: solid #144E2B 2px;
            padding-inline: 2rem;
            font-weight: 700;
            background-color: white;
            color: #144E2B;
        }

        .consent-btn {
            cursor: pointer;
            all: unset;
            font-size: .8rem;
            padding-inline: 1rem;
            padding-block: .3rem;
            /* background-color: #144E2B; */

            border-radius: 50px;
        }

        #decline-consent {
            text-decoration: underline;
        }
    </style>
    <script>
        function updateConsent(adUserData, adPersonalization, adStorage, analyticsStorage) {
            gtag('consent', 'update', {
                'ad_user_data': adUserData,
                'ad_personalization': adPersonalization,
                'ad_storage': adStorage,
                'analytics_storage': analyticsStorage,
                'wait_for_update': 500
            });
            document.cookie = "ad_user_data=" + adUserData + "; path=/; max-age=" + (365 * 24 * 60 * 60);
            document.cookie = "ad_personalization=" + adPersonalization + "; path=/; max-age=" + (365 * 24 * 60 * 60);
            document.cookie = "ad_storage=" + adStorage + "; path=/; max-age=" + (365 * 24 * 60 * 60);
            document.cookie = "analytics_storage=" + analyticsStorage + "; path=/; max-age=" + (365 * 24 * 60 * 60);
        }

        function getCookie(name) {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        document.getElementById('accept-consent').onclick = function () {
            updateConsent('granted', 'granted', 'granted', 'granted');
            document.getElementById('consent-banner').style.display = 'none';
        };

        document.getElementById('decline-consent').onclick = function () {
            updateConsent('denied', 'denied', 'denied', 'denied');
            document.getElementById('consent-banner').style.display = 'none';
        };

        window.onload = function () {
            var adUserData = getCookie('ad_user_data');
            var adPersonalization = getCookie('ad_personalization');
            var adStorage = getCookie('ad_storage');
            var analyticsStorage = getCookie('analytics_storage');
            if (adUserData && adPersonalization && adStorage && analyticsStorage) {
                updateConsent(adUserData, adPersonalization, adStorage, analyticsStorage);
                document.getElementById('consent-banner').style.display = 'none';
            }
        };
    </script>
    <?php
}
add_action('wp_footer', 'add_consent_banner');
