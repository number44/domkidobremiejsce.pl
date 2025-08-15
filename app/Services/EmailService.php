<?php

namespace App\Services;


use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Exception;

class EmailService
{

    private $mailer;
    private $defaultFromEmail;
    private $defaultFromName;

    public function __construct()
    {
        $this->defaultFromEmail = defined('SMTP_FROM_EMAIL') ? SMTP_FROM_EMAIL : 'noreply@example.com';
        $this->defaultFromName = defined('SMTP_FROM_NAME') ? SMTP_FROM_NAME : 'Your Website';

        error_log("DEBUG: defaultFromEmail in constructor: " . $this->defaultFromEmail);
        error_log("DEBUG: defaultFromName in constructor: " . $this->defaultFromName);

        $this->configureMailer();
    }

    private function configureMailer(): void
    {
        try {
            $dsn = defined('MAILER_DSN') ? MAILER_DSN : null;

            if (empty($dsn)) {
                throw new Exception('MAILER_DSN is not defined in wp-config.php.');
            }

            $transport = Transport::fromDsn($dsn);
            $this->mailer = new Mailer($transport);

        } catch (Exception $e) {
            error_log("Symfony Mailer configuration error: " . $e->getMessage());
            $this->mailer = null;
        }
    }

    /**
     * Generates a simple HTML email template.
     *
     * @param int $media_id The WordPress media attachment ID for the logo.
     * @param string $title The main title of the email.
     * @param string $content The main content of the email (can contain HTML).
     * @return string The full HTML content for the email.
     */
    public function getEmailHtml(int $media_id, string $title, string $content): string
    {
        $logo_url = '';
        if (function_exists('wp_get_attachment_image_url')) {
            // Get the URL of the image from the media library
            // Using 'medium' size, but you could use 'full' or a custom size
            $logo_url = wp_get_attachment_image_url($media_id, 'logo_mobile-lg');
        }

        ob_start(); // Start output buffering
        ?>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title><?php echo esc_html($title); ?></title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }

                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 3px #434343;
                    text-align: center;
                    /* Center content within the container */
                }

                .header {
                    padding-bottom: 20px;
                    border-bottom: 1px solid #E6F5EC;
                    margin-bottom: 20px;
                }

                .header img {
                    max-width: 150px;
                    /* Adjust logo size */
                    height: auto;
                    display: block;
                    /* Remove extra space below image */
                    margin: 0 auto;
                    border-radius: 50%;
                    /* Center the logo */
                }

                .header h1 {
                    color: #144D29;
                    margin-top: 15px;
                    font-size: 24px;
                }

                .content {
                    padding: 20px 0;
                    color: #555555;
                    font-size: 16px;
                    text-align: center;
                    /* Center the text content */
                }

                .footer {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #eeeeee;
                    font-size: 12px;
                    color: #999999;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <div class="header">
                    <?php if (!empty($logo_url)): ?>
                        <img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?> Logo">
                    <?php endif; ?>
                    <h1><?php echo esc_html($title); ?></h1>
                </div>
                <div class="content">
                    <?php echo $content; // $content can contain HTML, so we don't esc_html here ?>
                </div>
                <div class="footer">
                    <p>&copy; <?php echo date('Y'); ?>         <?php echo esc_html(get_bloginfo('name')); ?>. All rights reserved.</p>
                </div>
            </div>
        </body>

        </html>
        <?php
        return ob_get_clean(); // End output buffering and return the buffered content
    }


    /**
     * Sends an email using Symfony Mailer.
     * (No changes needed here, as it uses the existing $body parameter)
     *
     * @param string $to The recipient email address.
     * @param string $subject The email subject.
     * @param string $body The email body (HTML or plain text).
     * @param bool $isHtml True if the body is HTML, false otherwise.
     * @param string|null $fromEmail Optional sender email. Defaults to SMTP_FROM_EMAIL.
     * @param string|null $fromName Optional sender name. Defaults to SMTP_FROM_NAME.
     * @return bool True on success, false on failure.
     */
    public function send(
        string $to,
        string $subject,
        string $body,
        bool $isHtml = true, // Ensure this remains true for HTML emails
        ?string $fromEmail = null,
        ?string $fromName = null
    ): bool {
        if (null === $this->mailer) {
            error_log("Cannot send email: Symfony Mailer is not configured correctly. Check wp-config.php and server logs.");
            return false;
        }

        try {
            $fromEmailAddress = $fromEmail ?? $this->defaultFromEmail;
            $fromNameValue = $fromName ?? $this->defaultFromName;

            // Create Address object to properly format the from field
            $fromAddress = new Address($fromEmailAddress, $fromNameValue);

            $email = (new Email())
                ->from($fromAddress)
                ->to($to)
                ->subject($subject);

            if ($isHtml) {
                $email->html($body);
                $email->text(strip_tags($body)); // Always good to provide a plain-text alternative
            } else {
                $email->text($body);
            }

            $this->mailer->send($email);
            return true;

        } catch (TransportExceptionInterface $e) {
            error_log("Symfony Mailer Transport Error sending to {$to}: " . $e->getMessage());
            return false;
        } catch (Exception $e) {
            error_log("Symfony Mailer unexpected error sending to {$to}: " . $e->getMessage());
            return false;
        }
    }
}