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
     * @param p_window   The window which is controlled by the keyboard.
     * @param p_init     The initialization data.
     * @param p_paddle   The model of the paddle to be controlled.
     */
    function controlKeyboard(p_window, p_init, p_paddle)
    {
      // https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
      var l_gamepads = {};

      p_window.addEventListener("gamepadconnected",
                                function(p_event)
                                { l_gamepads[p_event.gamepad.index] = l_gamepad; },
                                false
                               );
      p_window.addEventListener("gamepaddisconnected",
                                function(p_event)
                                { delete l_gamepads[p_event.gamepad.index]; },
                                false
                               );


      function f_update_gamepads()
      {
         for (var k in l_gamepads) if (l_gamepads.hasOwnProperty(k))
         {  var l_gamepad = l_gamepads[k],
                l_x    = l_gamepad.axes[0];
                if (l_x < -0.1)
                { p_paddle.start("left"); continue; }
                if (l_x > 0.1)
                { p_paddle.start("right"); continue; }
                p_paddle.stop();
         }
      }
      setInterval(f_update_gamepads, 1000/p_init.updatesPerSecond);
    }

    return controlKeyboard;
  });