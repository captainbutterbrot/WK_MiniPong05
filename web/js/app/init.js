/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
( ['model/button', 'view/button',
   'model/ball',   'view/ball',
   'model/paddle', 'view/paddle',
   'model/text',   'view/text',
   'view/loop',
   'control/keyboard',
   'logic/minipong'
  ],
  function(ModelButton, ViewButton,
           ModelBall,   ViewBall,
           ModelPaddle, ViewPaddle,
           ModelText,   ViewText,
           ViewLoop,
           controlKeyboard,
           minipong
          )
  {
    /**
     * Creates and initializes the main objects of the app
     *
     * @param p_window The browser window that contains the HTML document to be initialized.
     * @param p_init   The initialization info.
     */
    function init(p_window, p_init)
    {
      var l_canvas_init  = p_init.canvas,
          l_document     = p_window.document,
          l_canvas       = l_document.getElementById(l_canvas_init.element),

          l_model_button = new ModelButton(p_init.model.buttonStartStop),
          l_view_button  = new ViewButton(l_model_button, p_init.view.buttonStartStop, l_document),

          l_model_ball   = new ModelBall(p_init.model.ball),
          l_view_ball    = new ViewBall(l_model_ball, p_init.view.ball, l_document),

          l_model_paddle = new ModelPaddle(p_init.model.paddle),
          l_view_paddle  = new ViewPaddle(l_model_paddle, p_init.view.paddle, l_document),

          l_model_info   = new ModelText(p_init.model.info),
          l_view_info    = new ViewText(l_model_info, p_init.view.info),

          l_model_score  = new ModelText(p_init.model.score),
          l_view_score   = new ViewText(l_model_score, p_init.view.score),

          l_models       = { stage:  l_canvas_init,
                             button: l_model_button,
                             ball:   l_model_ball,
                             paddle: l_model_paddle,
                             info:   l_model_info,
                             score:  l_model_score
                           },

          l_views        = [ l_view_button, l_view_ball, l_view_paddle, l_view_info, l_view_score];

      l_canvas.width  = l_canvas_init.width;
      l_canvas.height = l_canvas_init.height;

      new ViewLoop(p_window, l_canvas, l_views).start();
      controlKeyboard(p_window, p_init.control.player, l_model_paddle);
      minipong(p_init.game, l_models);
    }

    return init;
  }
);

