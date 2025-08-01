<?php

namespace App\Http\Middleware;

use WP_Error;
use WP_REST_Request; // Import WP_REST_Request class

class Guards
{
    /**
     * Permission callback for admin-only access.
     * Typically used for 'manage_options' capability (Administrators).
     *
     * @return bool|WP_Error
     */
    public static function adminOnly()
    {
        if (current_user_can('manage_options')) {
            return true;
        }
        return new WP_Error(
            'rest_forbidden_admin',
            esc_html__('You do not have administrative permission to perform this action.', 'your-text-domain'),
            array('status' => 403)
        );
    }
    public static function Test(WP_REST_Request $request)
    {
        $nonce = $request->get_header('X-WP-Nonce');
        $nonce_action = 'wp_rest';

        error_log('Incoming Nonce: ' . $nonce);
        error_log('Expected Nonce Action: ' . $nonce_action);

        if (empty($nonce)) {
            return new WP_Error(
                'rest_forbidden_nonce_missing',
                esc_html__('Nonce header is missing.', 'your-text-domain'),
                array('status' => 403)
            );
        }
        if (wp_verify_nonce($nonce, $nonce_action)) {
            error_log('Nonce Verified Successfully!');
            return true;
        } else {
            error_log('Nonce Verification FAILED!');
        }
        return new WP_Error(
            'rest_forbidden_nonce_invalid',
            esc_html__('Nonce verification failed. You do not have permission to perform this POST action.', 'your-text-domain'),
            array('status' => 403)
        );
    }
    /**
     * Permission callback for POST requests originating from a specific page URL.
     * HIGHLY RECOMMENDED: Use nonces for POST, PUT, DELETE requests to prevent CSRF.
     *
     * @param WP_REST_Request $request The REST API request object.
     * @return bool|WP_Error
     */

    public static function postFromPage(WP_REST_Request $request)
    {
        // Retrieve the nonce from the 'X-WP-Nonce' header
        $nonce = $request->get_header('X-WP-Nonce');
        // Define your nonce action. This string MUST match what you use on the frontend
        // when calling wp_create_nonce().
        // For example, if wpApiSettings.nonce comes from wp_localize_script(..., ['nonce' => wp_create_nonce('your_action_here')]),
        // then 'your_action_here' is your $nonce_action.
        // Based on the example, if 'wp_rest_lesio_message_post' is what you used in wp_create_nonce on the frontend, use that.
        $nonce_action = 'wp_rest'; // <-- VERIFY THIS MATCHES YOUR FRONTEND wp_create_nonce() ACTION!
        if (empty($nonce)) {
            return new WP_Error(
                'rest_forbidden_nonce_missing',
                esc_html__('xNonce header is missing.', 'your-text-domain'),
                array('status' => 403)
            );
        }
        if (wp_verify_nonce($nonce, $nonce_action)) {
            return true;
        }
        return new WP_Error(
            'rest_forbidden_nonce_invalid',
            esc_html__('xNonce verification failed. You do not have permission to perform this POST action.', 'your-text-domain'),
            array('status' => 403)
        );
    }
    /**
     * Permission callback for GET requests to be accessible from any "page URL".
     *
     * @param WP_REST_Request $request The REST API request object.
     * @return bool|WP_Error
     */
    public static function getFromPage(WP_REST_Request $request)
    {
        // For most public GET requests, simply returning true is common.
        return true;
    }
}