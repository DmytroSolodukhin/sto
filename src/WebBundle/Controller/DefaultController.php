<?php

namespace WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DefaultController
 * @package WebBundle\Controller
 */
class DefaultController extends Controller
{
    /**
     * @return Response
     */
    public function indexAction()
    {
        $photos   = $this->container->get('photo.handler')->getEntities();
        $comments = $this->container->get('comment.handler')->getEntities();

        return $this->render('WebBundle:Default:index.html.twig',[
            'photos' => $photos,
            'comments' => $comments
        ]);
    }
}
