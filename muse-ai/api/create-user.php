<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$errors = [];
if (!$username) {
    $errors['username'] = 'Username is required';
}
if (!$email) {
    $errors['email'] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Email is invalid';
}
if (!$password) {
    $errors['password'] = 'Password is required';
} elseif (strlen($password) < 6) {
    $errors['password'] = 'Password must be at least 6 characters';
}

if (!empty($errors)) {
    echo json_encode(['errors' => $errors]);
    exit;
}

// Here you would normally insert the user into the database
// For demonstration purposes, we'll just return a success message

echo json_encode(['message' => 'User created successfully', 'data' => ['username' => $username, 'email' => $email, 'password' => $password]]);
exit;