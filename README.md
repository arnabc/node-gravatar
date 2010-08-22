Node Gravatar
===========

Simple module to generate Gravatar URL, can be used with existing Node.js blogging frameworks:

Installation:
--------------------
If you have "npm" installed then just do the following
npm install node-gravatar

// in your code

var gravatar = require('node-gravatar');
sys.puts( gravatar.get('youremail@example.org') );

// you can specify additional information like 'size' of the avatar and rating and default icon

gravatar.get('youremail@example.org', 'R', 120, 'identicon' );