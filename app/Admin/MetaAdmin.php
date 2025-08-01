<?php

namespace App\Admin;

class MetaAdmin
{
    public function __construct()
    {
    }

    public function createMetaAdminPage()
    {
        add_menu_page(
            __('Meta Settings', 'textdomain'),
            __('Meta Settings', 'textdomain'),
            'manage_options',
            'meta-settings',
            [$this, 'metaSettingsPage'],
            'dashicons-admin-generic',
            6
        );
    }

    public function metaSettingsPage()
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        ?>
        < <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <div id="meta-app-root"></div>
            </div>
            <?php
    }
}