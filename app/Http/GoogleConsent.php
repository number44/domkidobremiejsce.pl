<?php
namespace App\Http;

/**
 * Class GoogleConsent
 *
 * Manages the cookie consent banner, including front-end display and
 * back-end settings.
 */
class GoogleConsent
{

    /**
     * GoogleConsent constructor.
     * Registers all the necessary hooks.
     */
    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_banner_html'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_menu', array($this, 'add_settings_page'));
    }

    /**
     * Enqueues the necessary scripts for the banner.
     * Note: No separate CSS file is enqueued as styles are inlined in the HTML.
     */
    public function enqueue_scripts()
    {
        // Enqueue the compiled JavaScript file.
        wp_enqueue_script(
            'google-consent-ts',
            plugin_dir_url(__FILE__) . 'js/google-consent.js',
            array(), // No dependencies
            '1.0',
            true
        );

        // Pass PHP variables to the JavaScript file using wp_localize_script.
        wp_localize_script(
            'google-consent-ts',
            'googleConsentData',
            array(
                'cookieName' => 'google_consent_accepted',
                'cookieDuration' => 30 // Days
            )
        );
    }

    /**
     * Renders the HTML and inline CSS for the consent banner on the front end.
     * The banner is not displayed if the consent cookie is already set.
     */
    public function render_banner_html()
    {
        // Check if the cookie is set. If so, don't display the banner.
        if (isset($_COOKIE['google_consent_accepted'])) {
            return;
        }

        // Get the settings from the WordPress options.
        $options = get_option('google_consent_options');

        // Define default values if options are not set.
        $banner_text_p1 = !empty($options['banner_text_p1']) ? $options['banner_text_p1'] : __('W ramach świadczonych przez nas usług staramy się wyświetlać reklamy odpowiadające Twoim zainteresowaniom, które dotyczą naszych produktów oraz produktów klientów korzystających z naszych usług reklamowych (marketing bezpośredni). W tym celu wykorzystujemy informacje zapisywane w plikach cookies, które otrzymujemy podczas korzystania z naszych stron.', 'your-text-domain');
        $banner_text_p2 = !empty($options['banner_text_p2']) ? $options['banner_text_p2'] : __('Więcej informacji uzyskasz odwiedzając naszą stronę.', 'your-text-domain');
        $link_text = !empty($options['link_text']) ? $options['link_text'] : __('Polityka Prywatności', 'your-text-domain');
        $link_url = !empty($options['link_url']) ? $options['link_url'] : '/privacy-policy';
        $accept_button_text = !empty($options['accept_button_text']) ? $options['accept_button_text'] : __('Akceptuj wszystko', 'your-text-domain');
        $decline_button_text = !empty($options['decline_button_text']) ? $options['decline_button_text'] : __('Odrzuć', 'your-text-domain');

        // Output the banner HTML with inline CSS.
        ?>
        <div id="consent-banner">
            <p><?php echo wp_kses_post($banner_text_p1); ?></p>
            <p><?php echo wp_kses_post($banner_text_p2); ?> <a
                    href="<?php echo esc_url($link_url); ?>"><?php echo esc_html($link_text); ?></a></p>
            <div class="button-group">
                <button class="consent-btn" id="decline-consent"><?php echo esc_html($decline_button_text); ?></button>
                <button class="consent-btn" id="accept-consent"><?php echo esc_html($accept_button_text); ?></button>
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
                border-radius: 50px;
            }

            #decline-consent {
                text-decoration: underline;
            }
        </style>
        <?php
    }

    // --- Settings Panel Methods ---
    // The settings panel is modified to handle two paragraphs and a new decline button.

    /**
     * Registers the settings fields and sections for the plugin's admin page.
     */
    public function register_settings()
    {
        register_setting('google_consent_settings_group', 'google_consent_options');

        add_settings_section(
            'google_consent_main_section',
            'Banner Content',
            array($this, 'settings_section_callback'),
            'google-consent'
        );

        add_settings_field(
            'banner_text_p1',
            'Banner Text (Paragraph 1)',
            array($this, 'banner_text_p1_callback'),
            'google-consent',
            'google_consent_main_section'
        );

        add_settings_field(
            'banner_text_p2',
            'Banner Text (Paragraph 2)',
            array($this, 'banner_text_p2_callback'),
            'google-consent',
            'google_consent_main_section'
        );

        add_settings_field(
            'link_text',
            'Link Text',
            array($this, 'link_text_callback'),
            'google-consent',
            'google_consent_main_section'
        );

        add_settings_field(
            'link_url',
            'Link URL',
            array($this, 'link_url_callback'),
            'google-consent',
            'google_consent_main_section'
        );

        add_settings_field(
            'accept_button_text',
            'Accept Button Text',
            array($this, 'accept_button_text_callback'),
            'google-consent',
            'google_consent_main_section'
        );

        add_settings_field(
            'decline_button_text',
            'Decline Button Text',
            array($this, 'decline_button_text_callback'),
            'google-consent',
            'google_consent_main_section'
        );
    }

    /**
     * Adds the settings page to the WordPress admin menu under 'Settings'.
     */
    public function add_settings_page()
    {
        add_options_page(
            'Google Consent Settings',
            'Google Consent',
            'manage_options',
            'google-consent',
            array($this, 'settings_page_html')
        );
    }

    /**
     * Renders the HTML for the plugin's settings page.
     */
    public function settings_page_html()
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('google_consent_settings_group');
                do_settings_sections('google-consent');
                submit_button('Save Settings');
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Renders the content for the settings section.
     */
    public function settings_section_callback()
    {
        echo '<p>Edit the content of your cookie consent banner.</p>';
    }

    /**
     * Renders the input field for the first paragraph of banner text.
     */
    public function banner_text_p1_callback()
    {
        $options = get_option('google_consent_options');
        $value = !empty($options['banner_text_p1']) ? $options['banner_text_p1'] : '';
        echo '<textarea name="google_consent_options[banner_text_p1]" rows="5" cols="50" class="large-text">' . esc_textarea($value) . '</textarea>';
    }

    /**
     * Renders the input field for the second paragraph of banner text.
     */
    public function banner_text_p2_callback()
    {
        $options = get_option('google_consent_options');
        $value = !empty($options['banner_text_p2']) ? $options['banner_text_p2'] : '';
        echo '<textarea name="google_consent_options[banner_text_p2]" rows="5" cols="50" class="large-text">' . esc_textarea($value) . '</textarea>';
    }

    /**
     * Renders the input field for the link text.
     */
    public function link_text_callback()
    {
        $options = get_option('google_consent_options');
        $value = !empty($options['link_text']) ? $options['link_text'] : '';
        echo '<input type="text" name="google_consent_options[link_text]" value="' . esc_attr($value) . '" class="regular-text">';
    }

    /**
     * Renders the input field for the link URL.
     */
    public function link_url_callback()
    {
        $options = get_option('google_consent_options');
        $value = !empty($options['link_url']) ? $options['link_url'] : '';
        echo '<input type="url" name="google_consent_options[link_url]" value="' . esc_attr($value) . '" class="regular-text">';
    }

    /**
     * Renders the input field for the accept button text.
     */
    public function accept_button_text_callback()
    {
        $options = get_option('google_consent_options');
        $value = !empty($options['accept_button_text']) ? $options['accept_button_text'] : '';
        echo '<input type="text" name="google_consent_options[accept_button_text]" value="' . esc_attr($value) . '" class="regular-text">';
    }

    /**
     * Renders the input field for the decline button text.
     */
    public function decline_button_text_callback()
    {
        $options = get_option('google_consent_options');
        $value = !empty($options['decline_button_text']) ? $options['decline_button_text'] : '';
        echo '<input type="text" name="google_consent_options[decline_button_text]" value="' . esc_attr($value) . '" class="regular-text">';
    }
}