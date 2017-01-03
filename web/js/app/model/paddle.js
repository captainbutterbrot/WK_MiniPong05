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
   * @classdesc Paddles are represented by rectangles. Every rectangle has
   *            a width, a height, a position, a velocity and an acceleration.
   *            By default it has no speed, i.e. the paddle does not move.
   *            It starts moving on demand.
   *
   * @param p_init  A JSON object containing all data initialization information.
   */
  function ModelPaddle(p_init)
  {
    this.width    = p_init.width;
    this.height   = p_init.height;

    this.x_start  = p_init.pos.x;
    this.y_start  = p_init.pos.y;

    this.vx_start = p_init.vel.x;
    this.vy_start = p_init.vel.y;

    this.ax_start = p_init.acc.x;
    this.ay_start = p_init.acc.y;

    this.friction = p_init.friction;

    this.reset(); // initializes further attributes
  }

  ModelPaddle.prototype =
  {
    /**
     *  Resets, i.e. reinitializes the paddle.
     */
    reset:
      function()
      {
        this.stop(); // By default, the paddle does not move around.
        this.hide(); // By default, the paddle is invisible.

        this.x = this.x_start;
        this.y = this.y_start;
      },

    /**
     *  Makes the paddle visible.
     */
    show:
      function()
      { this.visible = true; },

    /**
     *  Makes the paddle invisible.
     */
    hide:
      function()
      { this.visible = false; },

    /**
     *  Stops the paddle moving around.
     */
    stop:
      function()
      { this.vx = 0;
        this.vy = 0;

        this.ax = 0;
        this.ay = 0;
      },

    /**
     *  Starts the paddle moving around.
     *
     *  @param p_direction (String) <code>"left"</code> or <code>"right"</code>
     */
    start:
      function(p_direction)
      {
        // react only if the paddle is visible and not already moving
        if (this.visible === true &&
            this.vx === 0 && this.vy === 0
           )
        {
          switch (p_direction)
          {
            case "left":
              this.vx = -this.vx_start;
              this.ax = -this.ax_start;
              break;
            case "right":
              this.vx =  this.vx_start;
              this.ax =  this.ax_start;
              break;

            case "up":
              this.vy = -this.vy_start;
              this.ay = -this.ay_start;
              break;
            case "down":
              this.vy =  this.vy_start;
              this.ay =  this.ay_start;
              break;
          }
        }
      },

    /**
     * Moves the ball to a new position. The new position depends on its
     * current position, its velocity and the frame rate. The velocity
     * depends on the acceleration.
     *
     * @param p_seconds  Fraction of seconds since the last update.
     */
    move:
      function(p_seconds)
      { this.x  += this.vx * p_seconds;
        this.y  += this.vy * p_seconds;

        this.vx += this.ax * p_seconds;
        this.vy += this.ay * p_seconds;
      },

    /** The left side of the paddle (read only). */
    get left()   { return this.x; },

    /** The right side of the paddle (read only). */
    get right()  { return this.x + this.width; },

    /** The top side of the paddle (read only). */
    get top()    { return this.y; },

    /** The bottom side of the paddle (read only). */
    get bottom() { return this.y + this.height; }
  };

  return ModelPaddle;
});