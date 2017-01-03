/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
([],
 function()
 { "use strict";

  function ViewText(p_model, p_init /*, p_document*/)
  {
    this.model        = p_model;

    this.color        = p_init.color        || 'black';
    this.font         = p_init.font         || 'normal';
    this.textAlign    = p_init.textAlign    || 'left';
    this.textBaseline = p_init.textBaseline || 'alphabetic';
  }

  /**
   * Draws the text at its current position onto a 2d context.
   *
   * @param p_context The 2d context where the text is to be drawn.
   */
  ViewText.prototype.draw =
    function(p_context)
    {
      var l_model = this.model;

      if (l_model.value == null || l_model.value.toString() === '')
        return;

      // ALL font attributes must be set, as it cannot be
      // guaranteed that another module has changed some font
      // attributes before.
      p_context.font         = this.font;
      p_context.textAlign    = this.textAlign;
      p_context.textBaseline = this.textBaseline;
      p_context.fillStyle    = this.color;
      p_context.fillText(l_model.text,
                         (this.textAlign === 'center')
                           ? p_context.canvas.clientWidth/2
                           : l_model.x,
                         l_model.y
                        );
    };

  return ViewText;
});