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

        $vidHost = parse_url($url)['host'];
        $vidId = basename(parse_url($url)['path']);

        if ($vidHost == 'www.youtube.com') {
            $thumbUrl = "https://img.youtube.com/vi/" . $vidId . "/hqdefault.jpg";
        } elseif ($vidHost == 'player.vimeo.com') {

            $vimUrl = 'http://vimeo.com/api/v2/video/' . $vidId . '.json';

            try {
              $vimResponse = $client->request('GET', $vimUrl);
            } catch (\Exception $e) {
              return "Error";
            }

            $vimResponseData = json_decode($vimResponse->getBody(), true);

            $thumbUrl = $vimResponseData[0]['thumbnail_large'];
        } else {
            $apod['invalidVideo'] = true;
        }

        $apod = [
          'date' => $responseData['date'],
          'explanation' => $responseData['explanation'],
          'vidUrl' => $responseData['url'],
          'title' => $responseData['title'],
          'thumbUrl' => $thumbUrl
        ];

      }

      if (!empty($responseData['copyright'])) {
        $apod['copyright'] = $responseData['copyright'];
      }

      return $this->response()->array($apod);
    }
}
