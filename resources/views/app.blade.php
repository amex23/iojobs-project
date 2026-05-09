<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="index, follow" />

        <meta name="description" content="IOJobs Philippines - Online job portal connecting employers with skilled Filipino remote professionals, virtual assistants and workers in the Philippines. Post and find jobs now." />
        <meta name="robots" content="index, follow" />


        <title inertia>{{ config('app.name', 'IOJobs') }}</title>

        <link rel="canonical" href="https://iojobs.net" />
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
        <link rel="canonical" href="https://iojobs.net" />

        <link rel="icon" type="image/png" href="/io-logo2.png">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased" style="background-color: #FAF9F5;">
        @inertia
    </body>
</html>

