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
   * @param p_model {ModelPaddle} The model of the paddle object.
   * @param p_init     A JSON object containing all view initialization information.
   * @param p_document The HTML document of the web app.
   */
  function ViewPaddle(p_model, p_init, p_document)
  {
    this.model       = p_model;

    this.color       = p_init.color;
    this.borderWidth = p_init.borderWidth;
    this.borderColor = p_init.borderWidth;

    // Define a local canvas containing the view of the paddle.
    var l_canvas  = this.v_canvas = p_document.createElement("canvas"),
        l_context = l_canvas.getContext("2d");

    l_canvas.width  = p_model.width  + 2*this.borderWidth + 2;
    l_canvas.height = p_model.height + 2*this.borderWidth + 2;

    l_context.beginPath();
    l_context.rect(this.borderWidth, this.borderWidth,
                   p_model.width,    p_model.height
                  );
    l_context.fillStyle = this.color;
    l_context.fill();
    if (this.borderWidth > 0)
    {
      l_context.lineWidth   = this.borderWidth;
      l_context.strokeStyle = this.borderColor;
      l_context.stroke();
    }
  }

  /**
   * Draws the paddle at its current position onto a 2d context.
   *
   * @param p_context The 2d context where the paddle is to be drawn.
   */
  ViewPaddle.prototype.draw =
    function(p_context)
    {
      if (this.model.visible === true)
        p_context.drawImage(this.v_canvas,
                            this.model.x - this.borderWidth,
                            this.model.y - this.borderWidth
                           );
    };

  return ViewPaddle;
});