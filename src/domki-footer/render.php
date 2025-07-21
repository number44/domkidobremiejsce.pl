<?php
$theme_url = get_template_directory_uri(); // Correct way to get theme URL in PHP
$logo_mobile = [
    'media_id' => $attributes["logo"]["media_id"],
    'size_prefix' => "footer_logo",
];

$up_icon_url = $theme_url . "/assets/icons/up-icon.svg";






?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <footer>
        <div class="footer">
            <a href="<?php echo home_url(); ?>">
                <?php echo my_lazy_load_image($logo_mobile['media_id'], $logo_mobile['size_prefix'], "footer__logo rounded"); ?>
            </a>
            <div class="footer-left flex-col footer__left footer__col"></div>
            <div class="footer__col footer__center">© 2020 DOBRE MIEJSCE. All rights reserved.</div>
            <div class="footer__col footer__right"></div>

            <a title="Wróć na górę strony" class="up" href="#top">
                <img src="<?php echo esc_url($up_icon_url); ?>" alt="up-icon" />
            </a>
        </div>
    </footer>

    <div class="whatsapp-chat hide-on-small">
        <input type="checkbox" id="whatsapp-chat-toggler" class="whatsapp-chat-toggler">

        <label for="whatsapp-chat-toggler" class="whatsapp-chat-backdrop"></label>

        <div class="whatsapp-chat-window">
            <div class="whatsapp-chat-header">
                <img src="https://i.imgur.com/G43yQHs.png" class="whatsapp-chat-contact-img">
                <div class="whatsapp-chat-contact-info">
                    <strong>Isabella</strong>
                    <small>
                        Customer service
                        •
                        <span class="text-wa-light-green">Online</span>
                    </small>
                </div>
                <label for="whatsapp-chat-toggler" title="Fechar o chat do WhatsApp" class="whatsapp-chat-close">
                    <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M42.5467 12.4536C43.2627 13.1696 43.2627 14.3304 42.5467 15.0464L15.0467 42.5464C14.3307 43.2623 13.1699 43.2623 12.454 42.5464C11.738 41.8304 11.738 40.6696 12.454 39.9536L39.954 12.4536C40.6699 11.7377 41.8307 11.7377 42.5467 12.4536Z"
                            fill="currentColor" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12.454 12.4536C13.1699 11.7377 14.3307 11.7377 15.0467 12.4536L42.5467 39.9536C43.2627 40.6696 43.2627 41.8304 42.5467 42.5464C41.8307 43.2623 40.6699 43.2623 39.954 42.5464L12.454 15.0464C11.738 14.3304 11.738 13.1696 12.454 12.4536Z"
                            fill="currentColor" />
                    </svg>
                </label>
            </div>
            <div class="whatsapp-chat-body">
                <p class="whatsapp-chat-bubble">
                    Zostaw numer telefonu lub email<br>
                    Skontaktujemy się z tobą w ciągu 24h.
                </p>
                <form>
                    <label for="whatsapp-name" class="whatsapp-chat-green-bubble">
                        <input type="text" id="whatsapp-name" placeholder="Your name" required
                            class="whatsapp-chat-input">
                        <span class="error">
                            <span class="error-text">
                                This field is required
                            </span>
                            <svg class="error-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path
                                    d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                            </svg>
                        </span>
                    </label>
                    <label for="whatsapp-email" class="whatsapp-chat-green-bubble">
                        <input type="text" id="whatsapp-email" placeholder="Your email" required
                            class="whatsapp-chat-input">
                        <span class="error">
                            <span class="error-text">
                                This field is required
                            </span>
                            <svg class="error-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path
                                    d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                            </svg>
                        </span>
                    </label>
                    <label for="whatsapp-phone" class="whatsapp-chat-green-bubble">
                        <input type="tel" id="whatsapp-phone" placeholder="Your phone number" required
                            class="whatsapp-chat-input">
                        <span class="error">
                            <span class="error-text">
                                This field is required
                            </span>
                            <svg class="error-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path
                                    d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                            </svg>
                        </span>
                    </label>
                    <div class="whatsapp-chat-checkbox">
                        <input type="checkbox" required id="whatsapp-newsletter">
                        <label class="whatsapp-chat-green-bubble" for="whatsapp-newsletter">
                            <span class="whatsapp-chat-input">
                                Oświadczam, że zapoznałem się i akceptuję regulamin i politykę prywatności
                            </span>
                            <span class="error">
                                <span class="error-text">
                                    This field is required
                                </span>
                                <svg class="error-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                                </svg>
                            </span>
                        </label>
                    </div>

                    <button type="submit" class="whatsapp-chat-btn">
                        Send message
                    </button>
                </form>
            </div>
        </div>

        <label for="whatsapp-chat-toggler" class="whatsapp-chat-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
        </label>
    </div>

    <a href="sms:+48667221779?body=Greetings" class="sms-box hide-on-large">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>

    </a>
</div>