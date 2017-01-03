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
     * A ball can collide with the „walls“ of the stage. In this case, it is mirrored.
     * The direction of the movement (i.e. the velocity) is changed and if it
     * penetrates the wall, it is placed on the correct position within the stage.
     *
     * @param p_stage  A object containing the width and height of the stage
     * @param p_ball   {ModelBall}.
     * @param cb_exit  A callback function that is called
     *                 when the ball leaves the stage
     */
    function collisionStageBall(p_stage, p_ball, cb_exit)
    {
      // If the ball collides with the left or the right wall of the stage
      // mirror its x-velocity and move the ball back onto the stage.
      if (p_ball.x <= p_ball.r)
      {
        p_ball.vx = -p_ball.vx;
        p_ball.x += 2*(p_ball.r - p_ball.x);
      }
      if (p_ball.x >= p_stage.width - p_ball.r)
      {
        p_ball.vx = -p_ball.vx;
        p_ball.x -=  2*(p_ball.r - p_stage.width + p_ball.x);
      }

      // If the ball collides with the top wall of the stage
      // mirror its y-velocity and move the ball back onto the stage.
      if (p_ball.y <= p_ball.r)
      {
        p_ball.vy = -p_ball.vy;
        p_ball.y += 2*(p_ball.r - p_ball.y);
      }

      // If the ball leaves the bottom of the stage, call cb_exit.
      // Factor 1.5: The ball is really outside the stage an thus invisible,
      // even if the view draws a very thick border around it.
      if (p_ball.y >= p_stage.height + 1.5*p_ball.r)
      { if (cb_exit)
        cb_exit();
      }
    }

    return collisionStageBall;
  }
);