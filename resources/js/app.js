var array = ['resources/icons/1.svg', 'resources/icons/2.svg', 'resources/icons/3.svg', 'resources/icons/4.svg', 'resources/icons/5.svg', 'resources/icons/6.svg'];

var myShakeEvent = new Shake({
    threshold: 15, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});

window.addEventListener('shake', shakeEventDidOccur, false);

//function to call when shake occurs
function shakeEventDidOccur () {

  if( $('#dice').hasClass('reverse') || $('nav').hasClass('openmenu')) {
    // do nothing
  } else {
    // If it does not have class "reverse"
    animateDice();
    animateElements();
  }
}

// Generate random number between 1 and 6
function randomNumberGen() {
  return Math.floor(Math.random() * (5 - 0 + 1)) + 0;
}

// Goes through the array and picks an image to display
function changeDice() {
  $('#dice').attr("src", array[randomNumberGen()]);
}

// Animate/Change dice seamlessly
function animateDice() {
  $('#dice').addClass('reverse');

  window.setTimeout(function() {
    changeDice();
    $('#dice').removeClass('reverse');
  }, 1000);
}


function animateElements() {
  $('#menu-icon, .instructions').addClass('scaledown');

  window.setTimeout(function (){
    $('#menu-icon, .instructions').addClass('scaleup');
    $('#menu-icon, .instructions').removeClass('scaledown');
  }, 1000);
}

function updateOnWindowResize() {
  if ($(window).width() < 860) {
   $('.instructions').html("Shake your phone <br> or tap on the screen");
  } else {
   $('.instructions').html("Hit the spacebar <br> or click the screen");
  }
}

function app() {
  myShakeEvent.start();
  changeDice();
  updateOnWindowResize();

  $('.show-dice').click(function() {
    if( !($('#dice').hasClass('reverse'))) {
      // If it does not have class "reverse"
      animateDice();
      animateElements();
    }
  });

// Animate elements once the menu icon is pressed
  $('#menu-icon').click(function() {
    if( !($('#dice').hasClass('reverse')) ) {
      if($('nav').hasClass('openmenu')) {

        $('nav').addClass('closemenu');
        $('nav').removeClass('openmenu');

        $('#menu-icon').removeClass('enlargemenuicon');
        $('#menu-icon').addClass('normalmenuicon');

        $('.show-dice, .instructions').removeClass('blur');

        $('#social-media').removeClass('exaggerateddown');

      } else {

        $('nav').addClass('openmenu');
        $('nav').removeClass('closemenu');

        $('#menu-icon').addClass('enlargemenuicon');
        $('#menu-icon').removeClass('normalmenuicon scaleup');

        $('.show-dice, .instructions').addClass('blur');

        $('#social-media').addClass('exaggerateddown');
      }
    }
  });

// Continue checking window size
  $(window).resize(function () {
    updateOnWindowResize();
  });

// For laptop/computer users who pres the spaebar
  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()
      if( $('#dice').hasClass('reverse') || $('nav').hasClass('openmenu')) {
        // do nothing
      } else {
        // If it does not have class "reverse"
        animateDice();
        animateElements();
      }
    }
  });
}

app();
