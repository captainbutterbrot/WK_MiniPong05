/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
([],
 function()
 {"use strict";

  function ModelButton(p_init)
  {
    this.id      = p_init.id;
    this.label   = p_init.label || null;
    this.class   = p_init.class || null;
    this.onClick = p_init.onClick || null;
  }

  return ModelButton;
});