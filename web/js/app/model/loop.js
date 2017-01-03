/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
([],
 function()
 {
  "use strict";

  /**
   * @param p_collision Function to detect and handle collisions.
   * @param p_f         The update frequency.
   * @param p_models    The models of the app.
   */
  function ModelLoop(p_collision, p_f, p_models)
  {
    var l_seconds = 1 / p_f;
    this.v_milliseconds = 1000 * l_seconds;

    this.m_update_model =
      function ()
      {
        // move around all movable objects
        for (var i = 0, n = p_models.length; i < n; i++)
        { p_models[i].move(l_seconds); }

        // detect and handle collision (a posteriori)
        p_collision();
      };
  }

  ModelLoop.prototype =
  {
    start:
      function()
      {
        if (this.v_timer == null)
        { this.v_timer = setInterval(this.m_update_model, this.v_milliseconds) }
      },

    stop:
      function()
      {
         if (this.v_timer != null)
         {
           clearInterval(this.v_timer);
           delete this.v_timer;
         }
      }
  };

  return ModelLoop;
});