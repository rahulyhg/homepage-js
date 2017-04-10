<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;

class ApodController extends Controller
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

    public function getApod(Request $request) {

      $client = new Client();

      $apod_api_key = $_ENV['APOD_API_KEY'];
      $apodUrl = 'https://api.nasa.gov/planetary/apod?api_key=' . $apod_api_key;

      try {
        $response = $client->request('GET', $apodUrl);
      } catch (\Exception $e) {
        return "Error";
      }

      $responseData = json_decode($response->getBody(), true);

      if ($responseData['media_type'] == 'image') {
        $apod = [
          'date' => $responseData['date'],
          'explanation' => $responseData['explanation'],
          'hdUrl' => $responseData['hdurl'],
          'imgUrl' => $responseData['url'],
          'title' => $responseData['title']
        ];
      }

      if ($responseData['media_type'] == 'video') {

        $url = $responseData['url'];
        $ytId = basename(parse_url($url)['path']);
        $ytUrl = "https://img.youtube.com/vi/" . $ytId . "/hqdefault.jpg";

        $apod = [
          'date' => $responseData['date'],
          'explanation' => $responseData['explanation'],
          'vidUrl' => $responseData['url'],
          'title' => $responseData['title'],
          'thumbUrl' => $ytUrl
        ];

        if (parse_url($responseData['url'])['host'] != 'www.youtube.com') {
          $apod['invalidVideo'] = true;
        }

      }

      if (!empty($responseData['copyright'])) {
        $apod['copyright'] = $responseData['copyright'];
      }

      return $this->response()->array($apod);
    }
}
