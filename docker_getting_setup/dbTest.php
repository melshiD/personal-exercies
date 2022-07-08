<?php

$pdo = new PDO('mysql:dbname=dev;host=mysql', 'tutorial', 'iuDbuser', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$query = $pdo->query('SHOW VARIABLES like "version"');

$row = $query->fetch();

echo 'MySQL version:' . $row['Value'];