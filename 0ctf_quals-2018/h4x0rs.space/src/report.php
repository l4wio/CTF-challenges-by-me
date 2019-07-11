<?php
define('h4x0r_index',1);
include('config.php');


class GoogleRecaptcha 
{
    /* Google recaptcha API url */
    private $google_url = "https://www.google.com/recaptcha/api/siteverify";
    private $secret = '6LfJiEsUAAAAAFaD8w8dj6BSuIbHiDsc26GgnfHQ';
 
    public function VerifyCaptcha($response)
    {
        $url = $this->google_url."?secret=".$this->secret.
               "&response=".$response;
 
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curl, CURLOPT_TIMEOUT, 15);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, TRUE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, TRUE); 
        $curlData = curl_exec($curl);
 
        curl_close($curl);
 
        $res = json_decode($curlData, TRUE);
        if($res['success'] == 'true') 
            return TRUE;
        else
            return FALSE;
    }
 
}

function report(){
	if($_POST['submit']){
		$response = $_POST['recaptcha'];
		$pad_id = $_POST['id'];

		if(!preg_match('/^[a-f0-9]{64}$/is',$pad_id)){
			$result['status'] = false;
			return $result;
		}

		if(!empty($response))
		{
          $cap = new GoogleRecaptcha();
          $verified = $cap->VerifyCaptcha($response);
 
          if(!$verified) {
            $result['msg'] = "Wrong captcha.";
            $result['status'] = false;
			return $result;
          }
		} else {
			$result['msg'] = "Please enter the captcha.";
            $result['status'] = false;
			return $result;
		}

		$db = open_init_db(DB_PATH);

		if(!open_pad($pad_id)){
			$result['status'] = false;
			return $result;
		}

		$pad = open_report_pad($pad_id);

		// var_dump($pad);

		if(!$pad){
			$statement = $db->prepare('INSERT INTO "reports" ("id", "visited","time")
						VALUES (:id, :visited, :time)');
			$statement->bindValue(':id', $pad_id);
			$statement->bindValue(':visited', 0);
			$statement->bindValue(':time', date('Y-m-d H:i:s'));

		} else {
			$statement = $db->prepare('UPDATE "reports" SET visited = 0, time = :time WHERE id = :id');
			$statement->bindValue(':id', $pad_id);
			$statement->bindValue(':visited', 0);
			$statement->bindValue(':time', date('Y-m-d H:i:s'));
		}

		if($statement->execute()){
			$result['status'] = true;
			return $result;
		} else {
			$result['status'] = false;
			return $result;
		}
	}
}

header("Content-type: application/json");

die(json_encode(report(),JSON_UNESCAPED_SLASHES));

?>