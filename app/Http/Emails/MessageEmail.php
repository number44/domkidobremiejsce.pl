<?php
namespace App\Http\Emails;

class MessageEmail
{

    public static function sendGreetings($user_subject, $user_message, $firstname, $logo_url)
    {

        ob_start(); // Start output buffering to build HTML content
        ?>
        <!DOCTYPE html>
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title><?php echo esc_html($user_subject); ?></title>
            <style type="text/css">
                /* Basic Reset */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    wwww -ms-text-size-adjust: 100%;
                }

                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }

                img {
                    -ms-interpolation-mode: bicubic;
                }

                /* General Styles */
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #333333;
                    line-height: 1.6;
                }

                table {
                    border-collapse: collapse !important;
                }

                a {
                    text-decoration: none;
                    color: #0073aa;
                }

                /* WordPress blue */
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                    background-color: #E6F5EC;
                    /* WordPress blue */
                    padding: 20px;
                    text-align: center;
                }

                .header img {
                    max-width: 150px;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                }

                .content {
                    padding: 30px;
                }

                .footer {
                    background-color: #eeeeee;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666666;
                }

                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    border-radius: 50px;
                    background-color: #144D29;
                    color: #F7F9F7;
                    text-decoration: none;
                    border-radius: 5px;
                }

                .button:hover {
                    background-color: #E6F5EC;
                    color: #144D29 !important;
                }
            </style>
        </head>

        <body>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td class="header">
                                    <a href="<?php echo esc_url(home_url()); ?>">
                                        <img src="<?php echo esc_url($logo_url); ?>"
                                            alt="<?php echo esc_attr(get_bloginfo('name')); ?> Logo">
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="content">
                                    <p>Witaj <?php echo esc_html($firstname); ?>,</p>
                                    <p>Dziękujemy za kontakt. Otrzymaliśmy Twoją wiadomość i dziękujemy za kontakt.
                                        Nasz zespół przeanalizuje Twoje zapytanie i skontaktuje się z Tobą najszybciej, jak to
                                        możliwe,
                                        zazwyczaj w ciągu 24-48 godzin roboczych..</p>
                                    <p>Twoja wiadomość:</p>
                                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                    <p
                                        style="background-color: #F7F9F7; padding: 15px; border-left: 3px solid #144D29; white-space: pre-wrap; word-break: break-word;">
                                        <?php echo esc_html($user_message); ?>
                                    </p>
                                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                    <p>W międzyczasie Odwiedź nas:</p>
                                    <p style="text-align: center;">
                                        <a href="<?php echo esc_url(home_url()); ?>" class="button">Odwiedź naszą stronę</a>
                                    </p>
                                    <p>Pozdrowienia <br>Właściciel <?php echo esc_html(get_bloginfo('name')); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer">
                                    <p>&copy; <?php echo date('Y'); ?>         <?php echo esc_html(get_bloginfo('name')); ?>. All rights
                                        reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>

        </html>
        <?php
        $user_body = ob_get_clean();
        return $user_body;

    }

}