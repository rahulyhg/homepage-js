<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;

class EpicController extends Controller
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

    public function getEpic(Request $request) {

      $client = new Client();

      $natURL = 'https://epic.gsfc.nasa.gov/api/natural/';
      $enhURL = 'https://epic.gsfc.nasa.gov/api/enhanced/';

      $natImgBaseUrl = 'https://epic.gsfc.nasa.gov/archive/natural/';
      $enhImgBaseUrl = 'https://epic.gsfc.nasa.gov/archive/enhanced/';

      // natural: https://epic.gsfc.nasa.gov/archive/natural/2017/03/18/png/epic_1b_20170318005516_02.png
      // enhanced: https://epic.gsfc.nasa.gov/archive/enhanced/2015/10/31/png/epic_RGB_20151031003633_01.png

      try {
        $natResponse = $client->request('GET', $natURL);
      } catch (\Exception $e) {
        return "Error";
      }

      $natResponseData = json_decode($natResponse->getBody());

      $natNo = sizeof($natResponseData);

      $randNatImgNo = rand(0, ($natNo - 1));

      $randNatImg = $natResponseData[$randNatImgNo]->image;

      $natImgYear = substr($randNatImg, 8, 4);
      $natImgMonth = substr($randNatImg, 12, 2);
      $natImgDay = substr($randNatImg, 14, 2);

      $randNatImgUrlFormat = '%s%s/%s/%s/jpg/%s.jpg';
      $randNatImgUrl = sprintf($randNatImgUrlFormat, $natImgBaseUrl, $natImgYear, $natImgMonth, $natImgDay, $randNatImg);

      $natImg = [
        'natImgUrl' => $randNatImgUrl,
        'date' => $natResponseData[$randNatImgNo]->date,
        'caption' => $natResponseData[$randNatImgNo]->caption
      ];

      return $this->response()->array($natImg);

    }

}
