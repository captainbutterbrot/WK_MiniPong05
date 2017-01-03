/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
(['collision/ball_paddle', 'collision/stage_ball', 'collision/stage_paddle',
  'model/loop'
 ],
 function(collisionBallPaddle, collisionStageBall, collisionStagePaddle,
          ModelLoop
         )
 {"use strict";

  function minipong(p_init, p_models)
  {
    var l_stage          = p_models.stage,
        l_button         = p_models.button,
        l_info           = p_models.info,
        l_score          = p_models.score,
        l_ball           = p_models.ball,
        l_paddle         = p_models.paddle,
        l_models_movable = [],
        l_model_loop     = new ModelLoop(f_collision, p_init.fps, l_models_movable);

    // Store all model objects that have a move method within the array l_models_movable.
    for (var k in p_models)
    { //noinspection JSUnfilteredForInLoop
      if (p_models[k].move != null)
      { //noinspection JSUnfilteredForInLoop
        l_models_movable.push(p_models[k]);
      }
    }

    // Stop the game and display a welcome message.
    f_stop();
    l_info.value = p_init.welcome;

    // Collision detection and handling.
    function f_collision()
    {
      collisionBallPaddle(l_ball, l_paddle, function(){ l_score.value++; });
      collisionStageBall(l_stage, l_ball, f_stop);
      collisionStagePaddle(l_stage, l_paddle);
    }

    // Stop the game.
    function f_stop()
    {
      l_model_loop.stop();
      l_ball.stop();
      l_ball.hide();
      l_paddle.hide();

      l_button.label   = p_init.startGame;
      l_button.onClick = f_start;

      l_info.value     = p_init.ballLost;
    }

    // Start the game.
    function f_start()
    {
      l_score.value = 0;
      l_info.value  = '';
      l_ball.reset();
      l_paddle.reset();

      l_button.label   = p_init.stopGame;
      l_button.onClick = f_stop;

      l_paddle.show();
      l_ball.show();
      l_ball.start();
      l_model_loop.start();
    }
  }

  return minipong;
});