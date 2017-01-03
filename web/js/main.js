/**
 * @author    AUTHOR <AUTHOR@hs-augsburg.de>
 * @copyright 2016
 * @license   CC-BY-NC-SA-4.0
 */

requirejs.config
({
  baseUrl: 'js', // By default load any modules from directory js
  paths :
  {
    app:       'app',

    model:     'app/model',
    view:      'app/view',
    control:   'app/control',
    logic:     'app/logic',
    collision: 'app/collision',

    loadjson:  'lib/require/json',
    text:      'lib/require/text',
    json:      '../json',

    wk:        'lib/wk'
  }
});

requirejs
( ['loadjson!json/init.json', 'wk/view/WKcImage', 'app/init'],
  function(initJSON, WKcImage, init)
  {
    WKcImage.loadImages
             ( initJSON.images,
               function(){ init(window, initJSON); }
             );
  }
);