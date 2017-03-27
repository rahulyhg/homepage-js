<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/api', function () use ($app) {
    return $app->version();
});


$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    $api->group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function ($api) {

      $api->get('test/', 'TestController@testMethod');
      $api->get('apod/', 'ApodController@getApod');
      $api->get('epic/', 'EpicController@getEpic');
      $api->get('weather/', 'WeatherController@getWeather');
    });
});
