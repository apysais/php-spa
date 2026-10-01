<?php
session_start();

require __DIR__ . '/php/config.php';
require __DIR__ . '/php/auth.php';
require __DIR__ . '/php/data.php';
require __DIR__ . '/php/helpers.php';

$user = current_user();
$users = get_mock_users();
$permissions = get_permissions_for($user);
$settings = get_app_settings();

// Data passed to React. NEVER put secrets, password hashes, DB creds here.
$appData = [
    'user' => $user,
    'users' => array_values($users), // list for /user/:id lookup without extra fetch
    'permissions' => $permissions,
    'settings' => $settings,
];

// JSON_HEX_* prevents </script> breakout XSS. Critical.
$appDataJson = json_encode($appData, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e(APP_NAME) ?></title>
</head>
<body>
  <div id="root">
    <p>Loading… (PHP rendered this fallback, React will replace it)</p>
  </div>

  <script>
    // PHP -> React bridge. Must come BEFORE bundle.
    window.APP_DATA = <?= $appDataJson ?>;
  </script>

  <?= vite_tags('src/main.jsx') ?>
</body>
</html>
