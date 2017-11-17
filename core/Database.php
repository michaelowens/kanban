<?php

namespace Core;

class Database {
  public $config = [
    'file' => __DIR__ . '/../sqlite.db'
  ];

  public $pdo;

  public function __construct($config = []) {
    $this->config = array_merge($this->config, $config);
  }

  public function connect() {
    if (!$this->config['file']) {
      throw new Exception('Database: no file configured');
    }

    if ($this->pdo == null) {
        $this->pdo = new \PDO('sqlite:' . $this->config['file']);
    }

    return $this;
  }

  public function isInstalled() {
    $sql = $this->query("
      SELECT count(name)
      FROM sqlite_master
      WHERE type = 'table' AND name = 'projects'
    ");
    $sql->execute(); 
    $number_of_rows = $sql->fetchColumn(); 
    return $number_of_rows > 0;
  }

  public function getTables() {
    $tables = $this->fetch("
      SELECT name
      FROM sqlite_master
      WHERE type = 'table'
      ORDER BY name
    ");

    return $tables;
  }

  public function query($q) {
    return $this->pdo->query($q);
  }

  public function fetch($q) {
    $stmt = $this->pdo->query($q);

    $tables = [];
    while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
      $tables[] = $row;
    }

    return $tables;
  }

  public function exec($q) {
    return $this->pdo->exec($q);
  }

  public function prepare($q) {
    return $this->pdo->prepare($q);
  }

  public function insert($q, $params) {
    $stmt = $this->prepare($q);

    if (!$stmt) {
      return false;
    }

    foreach ($params as $param => &$value) {
      $stmt->bindParam(':' . $param, $value);
    }

    return $stmt->execute();
  }
}