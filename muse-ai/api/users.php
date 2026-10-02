<?php
header('Content-Type: application/json');

include_once '../php/data.php';

$users = get_mock_users();

sleep(3); // Simulate network delay

echo json_encode($users);
?>