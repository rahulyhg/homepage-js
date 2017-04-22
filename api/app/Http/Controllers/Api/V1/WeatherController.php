<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;

class WeatherController extends Controller
{
    use Helpers;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(

    ) {
        //
    }

    public function getWeather(Request $request) {

      $client = new Client();
      $zipCode = $request->zip;

      $weather_api_key = $_ENV['WEATHER_API_KEY'];

      $weatherBaseUrl = 'https://api.wunderground.com/api/';
      $weatherUrl = $weatherBaseUrl . $weather_api_key . '/forecast10day/astronomy/conditions/alerts/q/' . $zipCode . '.json';

      $imgUrlBase = 'https://api.wunderground.com/';
      $imgUrlHttp = 'http://icons.wxug.com/';

      try {
        $response = $client->request('GET', $weatherUrl);
      } catch (\Exception $e) {
        return "Error";
      }

      $responseData = json_decode($response->getBody(), true);

      $sunriseTimeStr = $responseData['sun_phase']['sunrise']['hour'] . ':' .  $responseData['sun_phase']['sunrise']['minute'];
      $sunsetTimeStr = $responseData['sun_phase']['sunset']['hour'] . ':' .  $responseData['sun_phase']['sunrise']['minute'];
      $moonriseTimeStr = $responseData['moon_phase']['moonrise']['hour'] . ':' .  $responseData['moon_phase']['moonrise']['minute'];
      $moonsetTimeStr = $responseData['moon_phase']['moonset']['hour'] . ':' .  $responseData['moon_phase']['moonrise']['minute'];

      $sunriseTime = date('h:i a', strtotime($sunriseTimeStr));
      $sunsetTime = date('h:i a', strtotime($sunsetTimeStr));
      $moonriseTime = date('h:i a', strtotime($moonriseTimeStr));
      $moonsetTime = date('h:i a', strtotime($moonsetTimeStr));

      $weather = [
        'cityState' => $responseData['current_observation']['display_location']['full'],
        'station' => $responseData['current_observation']['station_id'],
        'time' => $responseData['current_observation']['local_time_rfc822'],
        'weatherNow' => $responseData['current_observation']['weather'],
        'weatherNowIcon' => str_replace($imgUrlHttp, $imgUrlBase, $responseData['current_observation']['icon_url']),
        'precipTodayInch' => $responseData['current_observation']['precip_today_in'],
        'precipTodayMm' => $responseData['current_observation']['precip_today_metric'],
        'tempNowF' => $responseData['current_observation']['temp_f'],
        'tempNowC' => $responseData['current_observation']['temp_c'],
        'humidity' => $responseData['current_observation']['relative_humidity'],
        'windDir' => $responseData['current_observation']['wind_dir'],
        'windMph' => $responseData['current_observation']['wind_mph'],
        'windKph' => $responseData['current_observation']['wind_kph'],
        'sunriseTime' => $sunriseTime,
        'moonriseTime' => $moonriseTime,
        'sunsetTime' => $sunsetTime,
        'moonsetTime' => $moonsetTime,
        'moonIllum' => $responseData['moon_phase']['percentIlluminated'],
        'moonPhase' => $responseData['moon_phase']['phaseofMoon'],
        'days' => [],
      ];

      for ($i = 0; $i <= 7; $i++) {
        $weather['days'][$i] = [
          'name' => $responseData['forecast']['simpleforecast']['forecastday'][$i]['date']['weekday_short'],
          'weatherIcon' => str_replace($imgUrlHttp, $imgUrlBase, $responseData['forecast']['simpleforecast']['forecastday'][$i]['icon_url']),
          'conditions' => $responseData['forecast']['simpleforecast']['forecastday'][$i]['conditions'],
          'hiTempF' => $responseData['forecast']['simpleforecast']['forecastday'][$i]['high']['fahrenheit'],
          'hiTempC' => $responseData['forecast']['simpleforecast']['forecastday'][$i]['high']['celsius'],
          'loTempF' => $responseData['forecast']['simpleforecast']['forecastday'][$i]['low']['fahrenheit'],
          'loTempC' => $responseData['forecast']['simpleforecast']['forecastday'][$i]['low']['celsius'],
        ];
      }

      return $this->response()->array($weather);

    }

}
