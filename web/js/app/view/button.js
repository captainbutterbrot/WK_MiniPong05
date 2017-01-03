/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

define
([],
 function()
 { "use strict";

  function ViewButton(p_model, p_init, p_document)
  {
    this.model   = p_model;
    this.element = p_document.getElementById(p_init.elementID);
  }

  ViewButton.prototype.draw =
    function()
    {
      var l_model   = this.model,
          l_element = this.element;

      if (l_model.label != null && l_element.innerHTML !== this.model.label)
      { l_element.innerHTML = this.model.label; }
      if (l_model.class != null && l_element.className !== this.model.class)
      { l_element.className = this.model.class; }
      if (l_model.onClick != null && l_element.onclick !== this.model.onClick)
      { l_element.onclick = this.model.onClick; }
    };

  return ViewButton;
});