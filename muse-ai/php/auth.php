<?php

// Mock auth - replace with DB + password_verify() later.
// Interface stays same: current_user(), is_logged_in()

function current_user(): ?array {
    if (!isset($_SESSION['user'])) {
        // Auto-login mock user for learning. In real app: redirect to login.php
        $_SESSION['user'] = [
            'id' => 1,
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'role' => 'admin'
        ];
    }
    return $_SESSION['user'];
}

function is_logged_in(): bool {
    return isset($_SESSION['user']);
}
