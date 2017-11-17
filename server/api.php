<?php

use Symfony\Component\HttpFoundation\Request;

$db = (new Core\Database())->connect();

$api = $app['controllers_factory'];

$api->get('/', function () {
  return 'what are you doing here';
});


/**
 * Core
 */
$api->get('/setup_db', function () use ($app, $db) {
  // $fp = file('schema.sql', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  // $query = '';
  // $success = true;
  // foreach ($fp as $line) {
  //     if ($line != '' && strpos($line, '--') === false) {
  //         $query .= $line;
  //         if (substr($query, -1) == ';') {
  //           var_dump($query);
  //             $s = $db->exec($query);
  //             $query = '';

  //             if (!$s) {
  //               var_dump($db->pdo->errorInfo());
  //               $success = false;
  //             }
  //         }
  //     }
  // }
  $success = $db->exec(file_get_contents('schema.sql'));
  if (!$success) {
    var_dump($db->pdo->errorInfo());
  }
  return $app->json($success);
});

$api->get('/installed', function () use ($app, $db) {
  $installed = false;

  if (file_exists($db->config['file'])) {
    // $db->connect();
    $installed = $db->isInstalled();
  }

  return $app->json($installed);
});


/**
 * Projects
 */
$api->mount('/project', function ($project) use ($app, $db) {
  $project->get('/list', function () use ($app, $db) {
    $q = "SELECT * FROM projects";
    $projects = $db->fetch($q);
    return $app->json($projects);
  });

  $project->post('/add', function (Request $request) use ($app, $db) {
    $name = $request->get('name');
    if (!$name) {
      return $app->json([
        'success' => false,
        'error' => 'MISSING_PARAMATER'
      ]);
    }

    $q = "INSERT INTO projects (project_name, user_id) VALUES (:project_name, :user_id)";
    $project = $db->insert($q, ['project_name' => $name, 'user_id' => 1]);

    if (!$project) {
      return $app->json([
        'success' => false,
        'error' => 'UNKNOWN_ERROR'
      ]);
    }

    return $app->json([
      'success' => true
    ]);
  });
});


/**
 * Debug
 */
$api->get('/table/list', function () use ($app, $db) {
  $projects = $db->getTables();
  return $app->json($projects);
});

return $api;
