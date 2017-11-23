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
$api->post('/setup', function (Request $request) use ($app, $db) {
  $db->exec(file_get_contents('schema.sql'));
  $success = $db->pdo->errorCode() === '00000';

  if (!$success) {
    return $app->json([
      'success' => false,
      'error' => 'RUN_SCHEMA_SQL'
    ]);
  }

  $params = [];
  foreach (['companyName', 'firstName', 'lastName', 'email', 'password'] as $param) {
    $params[$param] = $request->get($param);

    if (!$params[$param]) {
      return $app->json([
        'success' => false,
        'error' => 'MISSING_PARAMETER'
      ]);
    }
  }

  $q = "INSERT INTO users (first_name, last_name, email, password, admin) VALUES (:first_name, :last_name, :email, :password, :admin)";

  try {
    $user = $db->insert($q, [
      'first_name' => $params['firstName'],
      'last_name' => $params['lastName'],
      'email' => $params['email'],
      'password' => md5($params['password']), // TODO: use something better than md5
      'admin' => 1,
    ]);
  } catch (\PDOException $e) {
    return $app->json([
      'success' => false,
      'error' => 'INSERT_USER',
      'errorInfo' => $e->getMessage()
    ]);
  }

  return $app->json([
    'success' => true
  ]);
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
 * User
 */
$api->mount('/user', function ($user) use ($app, $db) {
  $user->post('/login', function (Request $request) use ($app, $db) {
    $email = $request->get('email');
    $password = $request->get('password');

    if (!$email || !$password) {
      return $app->json([
        'success' => false,
        'error' => 'MISSING_PARAMETER'
      ]);
    }

    $q = "SELECT id, first_name, last_name, email, admin FROM users WHERE email=:email AND password=:password LIMIT 1";
    $user = $db->fetch($q, ['email' => $email, 'password' => md5($password)]);

    if (!$user) {
      return $app->json([
        'success' => false,
        'error' => 'INCORRECT_CREDENTIALS'
      ]);
    }

    return $app->json([
      'success' => true,
      'user' => $user
    ]);
  });
});


/**
 * Projects
 */
$api->mount('/project', function ($project) use ($app, $db) {
  $project->get('/list', function () use ($app, $db) {
    $q = "SELECT * FROM projects";
    $projects = $db->fetchArray($q);
    return $app->json($projects);
  });

  $project->post('/add', function (Request $request) use ($app, $db) {
    $name = $request->get('name');
    if (!$name) {
      return $app->json([
        'success' => false,
        'error' => 'MISSING_PARAMETER'
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
