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

      $apodURL = 'https://api.nasa.gov/planetary/apod?api_key=' . $apod_api_key;

      try {
        $response = $client->request('GET', $apodURL);
      } catch (\Exception $e) {
        return "Error";
      }

      $responseData = json_decode($response->getBody(), true);
      // var_dump($responseData);

      $apod = [
        // 'copyright' => $responseData['copyright'],
        'date' => $responseData['date'],
        'explanation' => $responseData['explanation'],
        'hdUrl' => $responseData['hdurl'],
        'imgUrl' => $responseData['url'],
        'title' => $responseData['title']
      ];

      if (!empty($responseData['copyright'])) {
        $apod['copyright'] = $responseData['copyright'];
      }

      // var_dump($apod);

      // try {
      //   array_key_exists('touch', $responseData);
      //   echo "Not Exception";
      // } catch (\Exeption $e) {
      //   echo "Exception";
      // }

      // $date = $responseData['date'];
      // $explanation = $responseData['explanation'];
      // $imgUrl = $responseData['hdurl'];
      // $title = $responseData['title'];

      return $this->response()->array($apod);

    }

}



// echo "<br>";
// print_r($copyright);

// return $this->response->error('This is an error.', 404);


// echo "Hello!"."<br>";
// $number = $request->number;

// print_r($_ENV);

// return $this->response->error('This is an error.', 404);

// echo $apod_api_key;
// echo "<br>";

// echo getcwd();

// $number = $request['number'];
// echo $number;
// echo "<br>";
// echo $request;
// echo "<br>";

// echo $response->getBody();
// echo "<br>";

// $responseData = json_decode($response->getBody());
// print_r($responseData);
// $copyright = $responseData->copyright;
