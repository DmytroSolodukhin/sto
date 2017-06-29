<?php

namespace RestApiBundle\Controller;

use CoreBundle\Entity\Comment;
use CoreBundle\Entity\Order;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use \Symfony\Component\HttpFoundation\Request;
use \Symfony\Component\HttpFoundation\Response;
use \FOS\RestBundle\Controller\Annotations\RouteResource;
use \FOS\RestBundle\Controller\Annotations;
use \Nelmio\ApiDocBundle\Annotation\ApiDoc;

/**
 * Class DefaultController
 * @package RestApiBundle\Controller
 * @RouteResource("Reserv")
 */
class DefaultController extends Controller
{

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="order",
     *  description="Get reason by filter",
     *  statusCodes={
     *      200 = "Ok",
     *      204 = "reserved not found",
     *      400 = "Bad format",
     *      403 = "Forbidden"
     *  }
     *)
     *
     * @Annotations\Post("/order")
     * @param Request $request Request
     *
     * @return Response
     */
    public function orderAction(Request $request)
    {
        /** @var Request $post */
        $post = $request->request;
        /** @var Order $order */
        $this->container->get('order.handler')->createZakaz($post);

        return [
            'success' => true,
        ];
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Comment",
     *  description="Get reason by filter",
     *  statusCodes={
     *      200 = "Ok",
     *      204 = "reserved not found",
     *      400 = "Bad format",
     *      403 = "Forbidden"
     *  }
     *)
     *
     * @Annotations\Post("/comments")
     * @param Request $request Request
     *
     * @return Response
     */
    public function commentsAction(Request $request)
    {
        /** @var Request $post */
        $post = $request->request;

        /** @var Comment $comment */
        $comment = $this->container->get('comment.handler')->createEntity();
        $comment->setTitle($post->get('name'))
            ->setDescription($post->get('message'));

        $this->container->get('comment.handler')->saveEntity($comment);

        return [
            'success' => true,
        ];
    }

}
