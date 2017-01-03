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
   * @param p_window The window object of the app.
   * @param p_canvas The canvas where the app is to be displayed.
   * @param p_views  An array of objects to be displayed.
   */
  function ViewLoop(p_window, p_canvas, p_views)
  {
    var l_context = p_canvas.getContext("2d"),
        n         = p_views.length;

    this.v_window = p_window;

    this.m_update_view =
      function m_update_view()
      {
        // clear canvas
        l_context.clearRect(0, 0, p_canvas.width, p_canvas.height);

         // draw all visual objects
        for (var i = 0;  i <n; i++ )
        { p_views[i].draw(l_context); }

        p_window.requestAnimationFrame(m_update_view);
      };
  }

  ViewLoop.prototype =
  {
    start:
      function()
      {
        if (this.v_timer == null)
        { this.v_timer = this.v_window.requestAnimationFrame(this.m_update_view); }
      },

    stop:
      function()
      {
        if (this.v_timer != null)
        {
          this.v_window.cancelAnimationFrame(this.v_timer);
          delete this.v_timer;
        }
      }
  };

   return ViewLoop;
});