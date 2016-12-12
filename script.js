var playing = false;
function BeginGame(){
playing = !playing;
if (playing) {
  document.getElementById("beginButton").innerHTML = "Stop";
  downAmmount();
}
if (!playing) {
  document.getElementById("beginButton").innerHTML = "Begin";
}
}
var memory_array = ['&#9824;','&#9824;','&#9752;','&#9752;','&#9757;','&#9757;','&#9774;','&#9774;','&#9968;','&#9968;','&#9973;','&#9973;','&#9981;','&#9981;','&#9976;','&#9976;'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function brandBord(){
  tiles_flipped = 0;
  var output = '';
    memory_array.memory_tile_shuffle();
  for(var i = 0; i < memory_array.length; i++){
    if (playing) {
    output += '<div id="tile_'+i+'" onclick="rememberTile(this,\''+memory_array[i]+'\')"></div>';
  }}
  document.getElementById('guessing_board').innerHTML = output;
}

function rememberTile(tile,val){
  if(tile.innerHTML == "" && memory_values.length < 2){
    tile.style.background = 'black';
    tile.innerHTML = val;
    if(memory_values.length == 0){
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
    } else if(memory_values.length == 1){
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
      if(memory_values[0] == memory_values[1]){
        tiles_flipped += 2;
        memory_values = [];
              memory_tile_ids = [];
        if(tiles_flipped == memory_array.length){
          alert("Congrats you Won");
          document.getElementById('guessing_board').innerHTML="";
          BeginGame();
        }
      } else {

        function goBack(){

            var tile_1 = document.getElementById(memory_tile_ids[0]);
            var tile_2 = document.getElementById(memory_tile_ids[1]);
            tile_1.style.background = 'black';
                  tile_1.innerHTML = "";
            tile_2.style.background = 'black';
                  tile_2.innerHTML = "";

            memory_values = [];
                  memory_tile_ids = [];
        }
        setTimeout(goBack, 700);
      }
    }
  }
}
function downAmmount()
{
  var downAmmountTime = 120;
    function click()
    {
        var numberer = document.getElementById("numberer");
      if (!playing) {
        downAmmountTime =1;
      }
      downAmmountTime--;
      numberer.innerHTML = downAmmountTime;
      if (downAmmountTime == 0) {
        numberer.innerHTML = "";
      }
      if (downAmmountTime == 0 && playing) {

        alert("Sorry you didn't finish on time, RETRY TEST!!");
        BeginGame();
        brandBord();
      }
      if (downAmmountTime > 0 && playing) {
        setTimeout(click, 1000);
      }
    }
    click();
}
brandBord();