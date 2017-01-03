/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
( [],
  function()
  {
    "use strict";

    /**
     * A paddle can collide with the „walls“ of the stage.
     * In such a case, the movement of the paddle is stopped.
     *
     * @param p_stage   A object containing the width and height of the stage
     * @param p_paddle  {ModelPaddle}.
     */
    function collisionStagePaddle(p_stage, p_paddle)
    {
      // If the paddle collides with the left wall of the stage,
      // stop it and move it back to the stage.
      if (p_paddle.vx < 0 && p_paddle.left <= 0)
      {
        p_paddle.stop();
        p_paddle.x = 0;
      }

      // If the paddle collides with the right wall of the stage,
      // stop it and move it back to the stage.
      if (p_paddle.vx > 0 && p_paddle.right >= p_stage.width)
      {
        p_paddle.stop();
        p_paddle.x = p_stage.width - p_paddle.width;
      }

      // If the paddle collides with the top wall of the stage,
      // stop it and move it back to the stage.
      if (p_paddle.vy < 0 && p_paddle.top <= 0)
      {
        p_paddle.stop();
        p_paddle.y = 0;
      }

      // If the paddle collides with the bottom wall of the stage,
      // stop it and move it back onto the stage.
      if (p_paddle.vy > 0 && p_paddle.bottom >= p_stage.height)
      {
        p_paddle.stop();
        p_paddle.y = p_stage.height - p_paddle.height;
      }
    }

    return collisionStagePaddle;
  }
);