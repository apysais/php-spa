<?php

function e(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// Read Vite manifest to get hashed filenames for cache-busting
function vite_tags(string $entry = 'src/main.jsx'): string {
    $manifestPaths = [
        __DIR__ . '/../build/.vite/manifest.json', // Vite 5
        __DIR__ . '/../build/manifest.json',       // Vite 4
    ];
    $manifestFile = null;
    foreach ($manifestPaths as $p) {
        if (file_exists($p)) { $manifestFile = $p; break; }
    }

    // Dev fallback: manifest not built yet
    if (!$manifestFile) {
        return "<!-- Run: npm run watch -->\n<script>console.error('Build missing. Run npm run build');</script>";
    }

    $manifest = json_decode(file_get_contents($manifestFile), true);
    if (!isset($manifest[$entry])) {
        return "<!-- Entry $entry missing in manifest -->";
    }

    $out = '';
    $item = $manifest[$entry];
    // CSS
    foreach ($item['css'] ?? [] as $css) {
        $out .= '<link rel="stylesheet" href="' . e(APP_BASE . '/build/' . $css) . '">' . "\n";
    }
    // JS (module)
    $out .= '<script type="module" src="' . e(APP_BASE . '/build/' . $item['file']) . '"></script>' . "\n";
    return $out;
}
