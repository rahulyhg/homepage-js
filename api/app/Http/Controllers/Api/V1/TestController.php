<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;

class TestController extends Controller
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

    public function testMethod(Request $request) {
      echo "Hello!"."<br>";
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


      $client = new Client();

      $apod_api_key = $_ENV['APOD_API_KEY'];

      $apodURL = 'https://api.nasa.gov/planetary/apod?api_key=' . $apod_api_key;

      try {
        $response = $client->request('GET', $apodURL);
        echo "Success!"."<br>";
      } catch (\Exception $e) {
        return "Error";
      }


      // echo $response->getBody();
      // echo "<br>";

      // $responseData = json_decode($response->getBody());
      // print_r($responseData);
      // $copyright = $responseData->copyright;

      $responseData = json_decode($response->getBody(), true);
      var_dump($responseData);

      $copyright = $responseData['copyright'];
      $date = $responseData['date'];
      $explanation = $responseData['explanation'];
      $imgUrl = $responseData['hdurl'];
      $title = $responseData['title'];

      echo "<br>";
      print_r($copyright);

      // return $this->response->error('This is an error.', 404);


    }

    //
}
