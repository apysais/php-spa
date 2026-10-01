<?php

function get_mock_users(): array {
    return [
        1 => ['id' => 1, 'name' => 'Ada Lovelace', 'email' => 'ada@example.com', 'role' => 'admin'],
        2 => ['id' => 2, 'name' => 'Alan Turing', 'email' => 'alan@example.com', 'role' => 'editor'],
        3 => ['id' => 3, 'name' => 'Grace Hopper', 'email' => 'grace@example.com', 'role' => 'viewer'],
    ];
}

function get_app_settings(): array {
    return [
        'appName' => APP_NAME,
        'version' => APP_VERSION,
        'basePath' => APP_BASE,
    ];
}

function get_permissions_for(array $user): array {
    if ($user['role'] === 'admin') return ['view_dashboard', 'view_users', 'edit_users'];
    if ($user['role'] === 'editor') return ['view_dashboard', 'view_users'];
    return ['view_dashboard'];
}
