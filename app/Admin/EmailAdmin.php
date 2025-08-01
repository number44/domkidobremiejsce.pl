<?php

namespace App\Admin;

class EmailAdmin
{
    private $option_group = 'smtp_settings';
    private $option_name = 'smtp_configuration';
    private $page_slug = 'smtp-configuration';

    public function __construct()
    {
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_init', [$this, 'init_settings']);
        add_action('wp_ajax_test_smtp_connection', [$this, 'test_smtp_connection']);
    }

    /**
     * Add admin menu page
     */
    public function add_admin_menu()
    {
        add_options_page(
            'SMTP Configuration',
            'SMTP Settings',
            'manage_options',
            $this->page_slug,
            [$this, 'admin_page']
        );
    }

    /**
     * Initialize settings
     */
    public function init_settings()
    {
        register_setting($this->option_group, $this->option_name, [
            'sanitize_callback' => [$this, 'sanitize_settings'],
            'default' => $this->get_default_settings()
        ]);

        add_settings_section(
            'smtp_section',
            'SMTP Server Configuration',
            [$this, 'section_callback'],
            $this->page_slug
        );

        $fields = [
            'smtp_host' => ['title' => 'SMTP Host', 'type' => 'text'],
            'smtp_port' => ['title' => 'SMTP Port', 'type' => 'number'],
            'smtp_username' => ['title' => 'SMTP Username', 'type' => 'email'],
            'smtp_password' => ['title' => 'SMTP Password', 'type' => 'password'],
            'smtp_encryption' => ['title' => 'Encryption', 'type' => 'select'],
            'smtp_from_email' => ['title' => 'From Email', 'type' => 'email'],
            'smtp_from_name' => ['title' => 'From Name', 'type' => 'text'],
        ];

        foreach ($fields as $field => $config) {
            add_settings_field(
                $field,
                $config['title'],
                [$this, 'field_callback'],
                $this->page_slug,
                'smtp_section',
                ['field' => $field, 'type' => $config['type']]
            );
        }
    }

    /**
     * Get default settings (from wp-config.php if available)
     */
    private function get_default_settings()
    {
        return [
            'smtp_host' => defined('SMTP_HOST') ? SMTP_HOST : '',
            'smtp_port' => defined('SMTP_PORT') ? SMTP_PORT : 587,
            'smtp_username' => defined('SMTP_USERNAME') ? SMTP_USERNAME : '',
            'smtp_password' => defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '',
            'smtp_encryption' => defined('SMTP_ENCRYPTION') ? SMTP_ENCRYPTION : 'tls',
            'smtp_from_email' => defined('SMTP_FROM_EMAIL') ? SMTP_FROM_EMAIL : get_option('admin_email'),
            'smtp_from_name' => defined('SMTP_FROM_NAME') ? SMTP_FROM_NAME : get_bloginfo('name'),
        ];
    }

    /**
     * Get current settings
     */
    public function get_settings()
    {
        $saved_settings = get_option($this->option_name, []);
        $default_settings = $this->get_default_settings();

        return wp_parse_args($saved_settings, $default_settings);
    }

    /**
     * Sanitize settings
     */
    public function sanitize_settings($input)
    {
        $sanitized = [];

        $sanitized['smtp_host'] = sanitize_text_field($input['smtp_host']);
        $sanitized['smtp_port'] = absint($input['smtp_port']);
        $sanitized['smtp_username'] = sanitize_email($input['smtp_username']);
        $sanitized['smtp_password'] = sanitize_text_field($input['smtp_password']);
        $sanitized['smtp_encryption'] = in_array($input['smtp_encryption'], ['tls', 'ssl', '']) ? $input['smtp_encryption'] : 'tls';
        $sanitized['smtp_from_email'] = sanitize_email($input['smtp_from_email']);
        $sanitized['smtp_from_name'] = sanitize_text_field($input['smtp_from_name']);

        return $sanitized;
    }

    /**
     * Section callback
     */
    public function section_callback()
    {
        echo '<p>Configure your SMTP server settings. These settings will override any configuration in wp-config.php.</p>';

        // Show current source of configuration
        if (defined('SMTP_HOST') && !empty(SMTP_HOST)) {
            echo '<div class="notice notice-info"><p><strong>Note:</strong> Some settings are currently defined in wp-config.php. Settings saved here will take priority.</p></div>';
        }
    }

    /**
     * Field callback
     */
    public function field_callback($args)
    {
        $settings = $this->get_settings();
        $field = $args['field'];
        $type = $args['type'];
        $value = isset($settings[$field]) ? $settings[$field] : '';
        $name = $this->option_name . '[' . $field . ']';
        $id = $this->option_name . '_' . $field;

        switch ($type) {
            case 'text':
            case 'email':
                echo "<input type='{$type}' id='{$id}' name='{$name}' value='" . esc_attr($value) . "' class='regular-text' />";
                break;

            case 'password':
                echo "<input type='password' id='{$id}' name='{$name}' value='" . esc_attr($value) . "' class='regular-text' />";
                echo "<br><small>Leave blank to keep current password</small>";
                break;

            case 'number':
                echo "<input type='number' id='{$id}' name='{$name}' value='" . esc_attr($value) . "' class='small-text' min='1' max='65535' />";
                if ($field === 'smtp_port') {
                    echo "<br><small>Common ports: 587 (TLS), 465 (SSL), 25 (unencrypted)</small>";
                }
                break;

            case 'select':
                if ($field === 'smtp_encryption') {
                    echo "<select id='{$id}' name='{$name}'>";
                    $options = [
                        '' => 'None',
                        'tls' => 'TLS',
                        'ssl' => 'SSL'
                    ];
                    foreach ($options as $option_value => $label) {
                        $selected = selected($value, $option_value, false);
                        echo "<option value='{$option_value}' {$selected}>{$label}</option>";
                    }
                    echo "</select>";
                }
                break;
        }

        // Add help text for specific fields
        if ($field === 'smtp_from_email') {
            echo "<br><small>This should typically match your SMTP username</small>";
        }
    }

    /**
     * Admin page
     */
    public function admin_page()
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        // Handle form submission
        if (isset($_GET['settings-updated'])) {
            add_settings_error($this->option_name, 'smtp_updated', 'Settings saved successfully!', 'updated');
        }

        settings_errors($this->option_name);
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

            <div class="card">
                <form action="options.php" method="post">
                    <?php
                    settings_fields($this->option_group);
                    do_settings_sections($this->page_slug);
                    submit_button('Save Settings');
                    ?>
                </form>
            </div>

            <div class="card">
                <h2>Test SMTP Connection</h2>
                <p>Send a test email to verify your SMTP configuration is working correctly.</p>

                <table class="form-table">
                    <tr>
                        <th scope="row">Test Email Address</th>
                        <td>
                            <input type="email" id="test-email" value="<?php echo esc_attr(get_option('admin_email')); ?>"
                                class="regular-text" />
                            <button type="button" id="test-smtp" class="button button-secondary">Send Test Email</button>
                        </td>
                    </tr>
                </table>

                <div id="test-result" style="margin-top: 10px;"></div>
            </div>

            <div class="card">
                <h2>Current Configuration</h2>
                <p>This shows the current effective SMTP configuration:</p>
                <?php $this->display_current_config(); ?>
            </div>
        </div>

        <script type="text/javascript">
            jQuery(document).ready(function ($) {
                $('#test-smtp').on('click', function () {
                    var button = $(this);
                    var testEmail = $('#test-email').val();
                    var resultDiv = $('#test-result');

                    if (!testEmail) {
                        resultDiv.html('<div class="notice notice-error"><p>Please enter a test email address.</p></div>');
                        return;
                    }

                    button.prop('disabled', true).text('Sending...');
                    resultDiv.html('<div class="notice notice-info"><p>Sending test email...</p></div>');

                    $.post(ajaxurl, {
                        action: 'test_smtp_connection',
                        test_email: testEmail,
                        nonce: '<?php echo wp_create_nonce('test_smtp_nonce'); ?>'
                    }, function (response) {
                        if (response.success) {
                            resultDiv.html('<div class="notice notice-success"><p>' + response.data + '</p></div>');
                        } else {
                            resultDiv.html('<div class="notice notice-error"><p>' + response.data + '</p></div>');
                        }
                    }).fail(function () {
                        resultDiv.html('<div class="notice notice-error"><p>Failed to send test email. Please check your configuration.</p></div>');
                    }).always(function () {
                        button.prop('disabled', false).text('Send Test Email');
                    });
                });
            });
        </script>
        <?php
    }

    /**
     * Display current configuration
     */
    private function display_current_config()
    {
        $settings = $this->get_settings();
        ?>
        <table class="widefat">
            <thead>
                <tr>
                    <th>Setting</th>
                    <th>Value</th>
                    <th>Source</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($settings as $key => $value): ?>
                    <tr>
                        <td><strong><?php echo esc_html(ucwords(str_replace('_', ' ', $key))); ?></strong></td>
                        <td>
                            <?php
                            if ($key === 'smtp_password') {
                                echo !empty($value) ? '••••••••' : '<em>Not set</em>';
                            } else {
                                echo !empty($value) ? esc_html($value) : '<em>Not set</em>';
                            }
                            ?>
                        </td>
                        <td>
                            <?php
                            $wp_config_constant = strtoupper($key);
                            if (defined($wp_config_constant) && constant($wp_config_constant) === $value) {
                                echo '<span style="color: #0073aa;">wp-config.php</span>';
                            } else {
                                echo '<span style="color: #00a32a;">Database</span>';
                            }
                            ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php
    }

    /**
     * Test SMTP connection via AJAX
     */
    public function test_smtp_connection()
    {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        if (!wp_verify_nonce($_POST['nonce'], 'test_smtp_nonce')) {
            wp_die('Security check failed');
        }

        $test_email = sanitize_email($_POST['test_email']);

        if (!is_email($test_email)) {
            wp_send_json_error('Invalid email address');
        }

        try {
            // Use the EmailService to send test email
            if (class_exists('App\Services\EmailService')) {
                $emailService = new \App\Services\EmailService();

                $subject = 'SMTP Test Email from ' . get_bloginfo('name');
                $message = '
                    <h2>SMTP Test Successful!</h2>
                    <p>This is a test email to verify your SMTP configuration is working correctly.</p>
                    <p><strong>Sent at:</strong> ' . current_time('mysql') . '</p>
                    <p><strong>From:</strong> ' . get_bloginfo('name') . '</p>
                ';

                $success = $emailService->send($test_email, $subject, $message, true);

                if ($success) {
                    wp_send_json_success('Test email sent successfully to ' . $test_email);
                } else {
                    wp_send_json_error('Failed to send test email. Check your SMTP configuration and error logs.');
                }
            } else {
                wp_send_json_error('EmailService class not found');
            }
        } catch (Exception $e) {
            wp_send_json_error('Error: ' . $e->getMessage());
        }
    }

    /**
     * Get SMTP configuration for use in other classes
     * This method provides the current effective configuration
     */
    public static function get_smtp_config()
    {
        $admin = new self();
        return $admin->get_settings();
    }
}