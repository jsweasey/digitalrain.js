var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    fontSize = 15,
    charsChoice = '｡｢｣ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split(''),
    charsRaining = [],
    charsLineAt = [],
    charChance = 0;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
textColumns = Math.floor((canvas.width)/fontSize);

document.getElementById('test').innerHTML = textColumns; //(BUG) An artifact of testing, yet when removed it causes the rain to fall less smoothly?

function initializeArrays(){
  for (var i = 0; i < textColumns; i++){
    charsLineAt[i] = 1;
    charsRaining[i] = false;
  }
}

function printLines(){
  context.font = fontSize + "px 'Consolas', 'Lucida Console'";
  context.fillStyle = 'rgba(255, 255, 255, 0.2)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < textColumns; i++){ //Determining for each column of rain, if it can start raining
    if (charsRaining[i] == false){
      charChance = Math.random();
      if (charChance > 0.993){ //0.993 is a good limit to allow for nice, intermittent rain
        charsRaining[i] = true;
      }
    }
  }

  for (var i = 0; i < textColumns; i++){
    if (charsRaining[i] == true){ //If it can rain
      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      tempNum = (Math.floor(Math.random()*charsChoice.length)); //Choose a random character
      context.fillText(charsChoice[tempNum], (fontSize * i), (fontSize * charsLineAt[i])); //Print a faded character on the current Y line
        
      context.fillStyle = 'rgba(0, 0, 0, 1)';
      charsLineAt[i]++; //Increment to the next Y line down
      tempNum = (Math.floor(Math.random()*charsChoice.length));
      context.fillText(charsChoice[tempNum], (fontSize * i), (fontSize * charsLineAt[i])); //Print a full colour character at the incremented Y line
    }
    if ((charsLineAt[i] * fontSize) > canvas.height) { //If the current Y line at is bigger than the screen/canvas height, reset the Y line to 1 and require it to pass a new check for if it can rain
      charsLineAt[i] = 1;
      charsRaining[i] = false;
    }
  }
}

function runDigitalRain(){
  initializeArrays();
  setInterval(printLines, 100);
}

runDigitalRain();
