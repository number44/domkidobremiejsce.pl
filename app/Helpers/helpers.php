<?php
if (!function_exists('prettyPrint')) {
    function prettyPrint($data)
    {
        echo "<div style='background-color:rgb(27, 27, 27); padding: 1.5rem; border-radius: 2px; border: 1px solid #ccc; color : #eee; overflow-x: auto'>";
        echo '<pre>' . htmlspecialchars(print_r($data, true)) . '</pre>';
        echo "</div>";
    }
}

if (!function_exists('getArrayString')) {
    function getArrayString($string_with_items)
    {
        preg_match_all('/\[\[(.*?)\]\]/', $string_with_items, $matches);
        $array = $matches[1];
        return $array;
    }
}
if (!function_exists('capitalize')) {
    function capitalize($string)
    {
        $first_char = mb_substr($string, 0, 1, 'UTF-8');
        $rest = mb_substr($string, 1, null, 'UTF-8');
        return mb_strtoupper($first_char, 'UTF-8') . $rest;
    }
}


if (!function_exists('getCoursesCountName')) {
    function getCoursesCountName($count)
    {
        switch ($count) {
            case $count == 1:
                return "kierunek";
            case $count > 1 && $count < 5:
                return "kierunki";

            default:
                return "kierunków";
        }
    }
}

if (!function_exists('slugify')) {
    function slugify($text)
    {
        // Zastępuje te znaki polskie 
        $polish_chars = [
            'ą' => 'a',
            'ć' => 'c',
            'ę' => 'e',
            'ł' => 'l',
            'ń' => 'n',
            'ó' => 'o',
            'ś' => 's',
            'ź' => 'z',
            'ż' => 'z',
            'Ą' => 'A',
            'Ć' => 'C',
            'Ę' => 'E',
            'Ł' => 'L',
            'Ń' => 'N',
            'Ó' => 'O',
            'Ś' => 'S',
            'Ź' => 'Z',
            'Ż' => 'Z'
        ];

        // Wymiana znaków
        $text = strtr($text, $polish_chars);
        // Zamiana na małe litery
        $text = strtolower($text);
        // Usuwa wszystkie znaki, które nie są liczbami, literami, odstępami ani myślnikami
        $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
        // Zamienia wszystkie odstępy i powtarzające się myślniki na pojedynczy myślnik
        $text = preg_replace('/[\s]+/', '-', $text);
        $text = preg_replace('/-+/', '-', $text);
        // Przytnij myślniki na początku i na końcu
        $text = trim($text, '-');
        return $text;
    }
}

