<?php

namespace Core;

class Database {
  private $config = [
    'file' => 'sqlite.db'
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

  public function getTables() {
    $stmt = $this->pdo->query("
      SELECT name
      FROM sqlite_master
      WHERE type = 'table'
      ORDER BY name
    ");

    $tables = [];
    while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
      $tables[] = $row['name'];
    }

    return $tables;
  }

  public function query($q) {
    return $this->pdo->query($q);
  }

  public function fetch($q) {
    $stmt = $this->pdo->query($q);

    $tables = [];
    while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
      $tables[] = $row['name'];
    }

    return $tables;
  }

  public function exec($query) {
    return $this->pdo->exec($query);
  }
}