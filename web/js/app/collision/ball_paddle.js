/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
( [],
  function()
  {"use strict";

    /**
     * A ball can collide with the „paddle“ of the canvas. In case, it is mirrored.
     *
     * @param p_ball    {ModelBall}.
     * @param p_paddle  {ModelPaddle}.
     * @param cb_hit    A callback function that is called when
     *                  the paddle hits the ball.
     */
    function collisionBallPaddle(p_ball, p_paddle, cb_hit)
    {
      if (p_ball.y + p_ball.r     >= p_paddle.top    &&
          p_ball.y - p_ball.r     <= p_paddle.bottom &&
          p_ball.x + 0.5*p_ball.r >= p_paddle.left   &&
          p_ball.x - 0.5*p_ball.r <= p_paddle.right
         )
      {
        // Resolve penetration.
        if (p_ball.vy > 0)        // The ball is moving from top to bottom.
        { p_ball.y = p_paddle.top - p_ball.r; }
        else                       // The ball is moving from bottom to top.
        { p_ball.y = p_paddle.bottom + p_ball.r; }

        // Modify the velocity of the ball.
        p_ball.vy = -p_ball.vy;
        p_ball.vx += p_paddle.friction*p_paddle.vx;

        // If the paddle hits the ball, invoke the callback function.
        if (cb_hit)
        { cb_hit(); }
      }
    }

    return collisionBallPaddle;
  }
);