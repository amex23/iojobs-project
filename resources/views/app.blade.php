<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="index, follow" />
        <meta name="description" content="IOJobs Philippines - Online job portal connecting employers with skilled Filipino remote professionals, virtual assistants and workers in the Philippines. Post and find jobs now." />

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="{{ asset('io-logo2.png') }}">

        <!-- Canonical -->
        <link rel="canonical" href="https://iojobs.ph" />

        <!-- Open Graph -->
        <meta property="og:title" content="IOJobs PH - Online Jobs Philippines">
        <meta property="og:description" content="Find and hire skilled Filipino remote workers and virtual assistants.">
        <meta property="og:url" content="https://iojobs.ph">
        <meta property="og:image" content="{{ asset('io-logo2.png') }}">

        <!-- Schema JSON-LD -->
        @verbatim
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "IOJobs PH",
            "url": "https://iojobs.ph",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://iojobs.ph/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }
        </script>
        @endverbatim

        <!-- Inertia Title -->
        <title inertia>{{ config('app.name', 'IOJobs') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">

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
