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
      var l_key_left      = p_init.left.key,
          l_keycode_left  = p_init.left.keyCode,

          l_key_right     = p_init.right.key,
          l_keycode_right = p_init.right.keyCode;

      function o_start_paddle_moving(p_event)
      {
        if (p_event.key === l_key_left || p_event.keyCode === l_keycode_left)
          p_paddle.start("left");
        else if (p_event.key === l_key_right || p_event.keyCode === l_keycode_right)
          p_paddle.start("right");
      }

      function o_stop_paddle_moving(p_event)
      {
        // If a key is released that controls the movement of
        // the paddle, stop the movement of the paddle.
        if (p_event.key === l_key_left  || p_event.keyCode === l_keycode_left ||
            p_event.key === l_key_right || p_event.keyCode === l_keycode_right
           )
          p_paddle.stop();
      }

      p_window.addEventListener("keydown", o_start_paddle_moving);
      p_window.addEventListener("keyup",   o_stop_paddle_moving);
    }

    return controlKeyboard;
  });