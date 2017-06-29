<?php
/**
 * Created by PhpStorm.
 * User: dss
 * Date: 27.05.16
 * Time: 11:51
 */

namespace CoreBundle\Handler;

use CoreBundle\Model\Handler\EntityHandler;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class PhotoHandler
 * @package CoreBundle\Handler
 */
class OrderHandler extends EntityHandler
{

    /**
     * @param Request $data
     * @param $date
     */
    public function createZakaz($data)
    {
        $order = $this->createEntity();
        $order->setTitle($data->get('name'))
            ->setPhone($data->get('phone'))
            ->setDescription($data->get('message'));

        $this->saveEntity($order);

        $message = "<h1>Заказ</h1>".
            "<p>Имя: " .               $data->get('name') .     "</p>".
            "<p>Телефон: " .           $data->get('phone') .    "</p>";

        $send = \Swift_Message::newInstance()
            ->setSubject('Zakaz')
            ->setFrom('webmaster@occulto-quest.com')
            ->setTo('maykl.fishermen120186@gmail.com')
            ->setBody(
                $message,
                'text/html'
            );

        $this->container->get('mailer')->send($send);

        $this->sendSMS('+380632981405',
            'заказ тел: ' . $data->get('phone') . ' имя: '.$data->get('name')
        );

    }

    /**
     *
     */
    public function sendSMS($phone, $text)
    {
        $url        = 'https://gate.smsclub.mobi/token/?';
        $username   = '380631392958';    // string User ID (phone number)
        $token      = 'Hmd3ZyPrQsuUThO'; // string Password
        $from       = 'gsm1';         // string, sender id (alpha-name) (as long as your alpha-name is not spelled out, it is necessary to use it)
        $to         = $phone;
        $text       = urlencode(iconv("UTF-8", "Windows-1251", $text));
        $url_result = $url.'username='.$username.'&token='.$token.'&from='.urlencode($from).'&to='.$to.'&text='.$text;

        if($curl = curl_init())
        {
            curl_setopt($curl, CURLOPT_URL, $url_result);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
            curl_exec($curl);
            curl_close($curl);
        }
    }

}