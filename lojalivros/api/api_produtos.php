<?php

header('Content-Type: application/json');

require_once '../db/conexao.php';

$stmt = $pdo->query("SELECT * FROM livros");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));