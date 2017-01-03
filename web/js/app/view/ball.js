/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
(['wk/view/WKcImage'],
 function(WKcImage)
 {"use strict";

  /**
   * @class
   *
   * @param p_model {ModelBall} The model of the ball object.
   * @param p_init  A JSON object containing all view initialization information.
   * @param p_document The HTML document of the web app.
   */
  function ViewBall(p_model, p_init, p_document)
  {
    this.model       = p_model;

    this.color       = p_init.color       || '#000';
    this.borderWidth = p_init.borderWidth || 0;
    this.borderColor = p_init.borderColor || '#000';

    this.image       = WKcImage.images[p_init.image];

    // Define a local canvas containing the view of the ball.
    var l_center  = this.v_center = p_model.r + this.borderWidth + 1,
        l_canvas  = this.v_canvas = p_document.createElement("canvas"),
        l_context = l_canvas.getContext("2d"),
        l_size    = 2 * l_center;

    l_canvas.width  = l_size;
    l_canvas.height = l_size;

    if (this.image)
    {
      l_context.drawImage(this.image, 0, 0, l_size, l_size);
      return;
    }

    if (this.color)
    {
      l_context.beginPath();
      l_context.arc(l_center, l_center, p_model.r, 0, 2*Math.PI);
      l_context.lineWidth = this.borderWidth;
      l_context.fillStyle = this.color;
      if (this.borderWidth > 0)
      {
        l_context.lineWidth   = this.borderWidth;
        l_context.strokeStyle = this.borderColor;
        l_context.stroke(); // Draw the border.
      }
      l_context.fill();     // Fill the inner area of the ball with its color.
    }
  }

  ViewBall.prototype =
  {
    /**
     * Draws the ball at its current position onto a 2d context.
     *
     * @param p_context The 2d context where the ball is to be drawn.
     */
    draw:
      function(p_context)
      {
        if (this.model.visible === true)
          p_context.drawImage(this.v_canvas,
                              this.model.x - this.v_center,
                              this.model.y - this.v_center
                             );
      }
    };

  return ViewBall;
});