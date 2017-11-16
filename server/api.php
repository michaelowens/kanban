<?php

$db = (new Core\Database())->connect();

$api = $app['controllers_factory'];

$api->get('/', function () {
  return 'Blog home page';
});

$api->get('/installed', function () use ($app) {
  return $app->json(false);
});

$api->get('/projects', function () use ($app, $db) {
  $q = "SELECT * FROM projects";
  $stmt = $db->query($q);

  $projects = [];
  while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
    $projects[] = $row;
  }
  
  return $app->json($projects);
});

return $api;
