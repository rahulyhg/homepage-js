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

      $weatherURL = 'https://api.nasa.gov/planetary/apod?api_key=' . $apod_api_key;

      try {
        $response = $client->request('GET', $apodURL);
      } catch (\Exception $e) {
        return "Error";
      }

      $responseData = json_decode($response->getBody(), true);

      $apod = [
        'date' => $responseData['date'],
        'explanation' => $responseData['explanation'],
        'hdUrl' => $responseData['hdurl'],
        'imgUrl' => $responseData['url'],
        'title' => $responseData['title']
      ];

      if (!empty($responseData['copyright'])) {
        $apod['copyright'] = $responseData['copyright'];
      }

      return $this->response()->array($apod);

    }

}
