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
   * A Moore automaton.
   *
   * @param p_init A JSON object. Each entry key is the name of a state. The object
   *               assigned to a key describes that state. With the exception of
   *               „<code>onEntry</code>“ every attribute of such a state description
   *               object is considered to be an action/state pair: If an action
   *               is performed, the automaton changes into the state assigned
   *               to the action. When a new state is entered by means of
   *               the method „<code>transition</code>“, a callback function
   *               is called. The value of the attribute „<code>onEntry</code>“
   *               of the new state object is passed to that call back function.
   *
   *               There must be a start state named „<code>start</code>“. Its state
   *               object must contain an action entry named „<code></code>“
   *               (i.e. the empty string). The  start state is used to start
   *               the automaton.
   * @constructor
   */
  function Automaton(p_init)
  {
    this.states = p_init;
    this.reset();
  }

  Automaton.prototype =
  {
    /**
     * Resets the automaton, i.e., sets the current state to 'start'.
     */
    reset:
      function()
      {
        this.currentState = 'start';
      },

    /**
     * Changes the state of the automaton.
     *
     * @param [p_action = '']
     *        The action that triggers the current transition.
     * @param [cb_on_entry]
     *        A callback function that is called on the entry of
     *        the new state. The value of the attribute
     *        „<code>onEntry</code>“ of that state is passed
     *        to the callback function (if it exists).
     */
    transition:
      function(p_action, cb_on_entry)
      {
         p_action = p_action || '';
         var l_current_state_info = this.states[this.currentState],
             l_new_state          = l_current_state_info[p_action],
             l_new_state_info     = this.states[l_new_state];

         this.currentState = l_new_state;

         if (cb_on_entry != null)
           cb_on_entry(l_new_state_info.onEntry);
      }
  };

  return Automaton;
});