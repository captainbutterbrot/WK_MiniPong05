/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
([],
 function()
 {"use strict";

  /**
   * @class
   * @classdesc Balls are represented by circles. Every ball has a position and a velocity.
   *            Its new position, which depends on its old position, its velocity and
   *            the frame rate of the game, can be computed. An it can be drawn on the 2d context
   *            of a canvas element.
   *
   * @param p_init A JSON object containing all data initialization information.
   */
  function ModelBall(p_init)
  {
    this.r            = p_init.r;

    this.x_start      = p_init.pos.x;
    this.y_start      = p_init.pos.y;
    this.vx_start_min = p_init.vel.x.min;
    this.vx_start_max = p_init.vel.x.max;
    this.vy_start_min = p_init.vel.y.min;
    this.vy_start_max = p_init.vel.y.max;

    this.reset(); // initializes further attributes
  }

  ModelBall.prototype =
  {
    /**
     *  Resets, i.e. reinitializes the ball.
     */
    reset:
      function()
      {
        this.stop(); // By default, the ball does not move around.
        this.hide(); // By default, the ball is invisible.

        this.x = this.x_start;
        this.y = this.y_start;
      },

    /**
     *  Makes the ball visible.
     */
    show:
      function()
      { this.visible = true; },

    /**
     *  Makes the ball invisible.
     */
    hide:
      function()
      { this.visible = false; },
    /**
     *  Stops the ball moving around an makes ist invisible.
     */
    stop:
      function()
      {
        this.vx = 0;
        this.vy = 0;
      },

    /**
     *  Starts the ball moving around.
     */
    start:
      function()
      {
        // react only if the ball is not already moving
        if (this.visible === true && this.vx === 0 && this.vy === 0)
        {
          this.vx = (Math.random() < 0.5 ? 1 : -1)*
                    (this.vx_start_min +
                     Math.random()*(this.vx_start_max - this.vx_start_min)
                    );
          this.vy = (Math.random() < 0.5 ? 1 : -1)*
                    (this.vy_start_min +
                     Math.random()*(this.vy_start_max - this.vy_start_min)
                    );
        }
      },

   /**
     * Moves the ball to a new position. The new position depends on its
     * current position, its velocity and the model update rate.
     *
     * @param p_seconds  Fraction of seconds since the last update.
     */
    move:
      function(p_seconds)
      {
        this.x += this.vx * p_seconds;
        this.y += this.vy * p_seconds;
      }
  };

  return ModelBall;
});