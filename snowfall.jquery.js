/*  Snowfall jquery plugin 
	version 1.2, Dec 20 2009
	Developed by Jason Brown for any bugs or questions email me at loktar69@hotmail
	info on the plugin is located on Somethinghitme.com
	
	values for snow options are
	
	flakeCount,
	flakeColor,
	flakeIndex,
	minSize,
	maxSize,
	minSpeed,
	maxSpeed
	
	Example Usage :
	$(document).snowfall({flakeCount : 100, maxSpeed : 10});
	
	-or-
	
	$('#element').snowfall({flakeCount : 800, maxSpeed : 5, maxSize : 5});
	
	-or with defaults-
	
	$(document).snowfall();
*/

(function($){
	$.fn.snowfall = function(options){
		
		var element = this;
		
    var today = new Date();

    var now_month = today.getMonth()+1;
    var src;
    var maxsize;
    var minsize;
console.log(now_month);
   if(now_month >= 12 || now_month <= 2){
      src = "img/yuki.png";
      maxsize = 20;
      minsize = 5;
    }else if(now_month <= 4){
      src = "img/sakura.png";
      maxsize = 20;
      minsize = 10;
    }else if(now_month <= 5){
      src = "img/ha.png";
      maxsize = 35;
      minsize = 10;
    }else if(now_month <= 10){
      src = "img/momizi.png";
      maxsize = 35;
      minsize = 10;
    }
		// random fuction for generating random vals
		random = function random(min, max){
			return Math.round(min + Math.random()*(max-min)); 
		}
		
		// snow flake class
		function Flake(_x, _y, _size, _speed)
		{
			// Flake properties
			this.id = flakeId; 
			this.x  = _x;
			this.y  = _y;
			this.size = _size;
			this.speed = _speed;
			this.step = 0,
			this.stepSize = random(1,10) / 100;
      
      var angle = Math.round(Math.random()*360);
      var flakeMarkup = "<img src='" + src + "' id='flake-" + this.id;

      flakeMarkup += "' style='width: " + this.size + "px; height: " + this.size + "px;";

      flakeMarkup += "; position: absolute; top: " + this.y + "px; left:" + this.x +

      "px; font-size: 0px; z-index: " + options.flakeIndex;



      flakeMarkup += "; -moz-transform:rotate(" + angle + "deg);";

      flakeMarkup += "-webkit-transform:rotate(" + angle + "deg);";

      flakeMarkup += "transform:rotate(" + angle + "deg);";

      flakeMarkup += "' />";

			if($(element).get(0).tagName === $(document).get(0).tagName){
				$('body').append(flakeMarkup);
			}else{
				$(element).append(flakeMarkup);
			}
			
			this.element = document.getElementById('flake-' + this.id);
			
			// Update function, used to update the snow flakes, and checks current snowflake against bounds
			this.update = function(){
				this.y += this.speed;
				
				if(this.y > (elHeight) - 6){
					this.reset();
				}
				
				this.element.style.top = this.y + 'px';
				this.element.style.left = this.x + 'px';

         this.element.style.transform = 'rotateY('+(this.x+this.y)%360 + 'deg)';
         this.element.style.transform = 'rotateX('+(this.x+this.y)%360 + 'deg)';
				
				this.step += this.stepSize;
				this.x += Math.cos(this.step);
				
				if(this.x > (elWidth) - 6 || this.x < 6){
					this.reset();
				}
			}
			
			// Resets the snowflake once it reaches one of the bounds set
			this.reset = function(){
				this.y = 0;
				this.x = random(0, elWidth);
				this.stepSize = random(1,10) / 100;
				this.size = random((options.minSize * 100), (options.maxSize * 100)) / 100;
				this.speed = random(options.minSpeed, options.maxSpeed);
			}
		}
			
		// plugin vars
		var flakes = [],
			flakeId = 0,
			i = 0,
			elHeight = $(element).height(),
			elWidth = $(element).width(),
			defaults = {
				flakeCount : 100,
				flakeColor : '#ffffff',
				flakeIndex: 999999,
				minSize : minsize,
				maxSize : maxsize,
				minSpeed : 2,
				maxSpeed : 8
				},
			options = $.extend(defaults, options);		
		
		// Bind the window resize event so we can get the innerHeight again
		$(window).bind("resize", function(){  
			elHeight = $(element).height();
			elWidth = $(element).width();
		}); 
		

		// initialize the flakes
		for(i = 0; i < options.flakeCount; i+=1){
			flakeId = i;
			flakes[i] = new Flake(random(0,elWidth), random(0, elHeight), random((options.minSize * 100), (options.maxSize * 100)) / 100, random(options.minSpeed, options.maxSpeed));
		}
	
		// this controls flow of the updating snow
		function snow(){
			for( i = 0; i < options.flakeCount; i += 1){
				flakes[i].update();
			}
			
			setTimeout(function(){snow()}, 30);
		}
		
		snow();
	};
})(jQuery);
