//namespace object
const app = {}

//variable to hold our API key
app.clientID = `zlSP8MGRWS`

//create a method to handle getting API data
app.getBoardGame = function(gamePlayerMin, gamePlayTimeMax, gameAgeMin){
  $.ajax({    
//use template literal to change the url and get back criteria selected by user
    url: `https://api.boardgameatlas.com/api/search?min_players=${gamePlayerMin}&client_id=${app.clientID}&limit=9&max_playtime=${gamePlayTimeMax}&gt_min_age=${gameAgeMin}`,
    method: 'GET',
    dataType: 'json',
  }).then(results => {
    $('.flex-container').empty()
    app.displayBoardGames(results)
  })
}


//Questions 1 drop down value selection
app.getPlayerNumVal = function() {
    const selection = $('select[name=num-of-players] option').filter(':selected').val()
    console.log(selection)
    return selection
}

//Questions 2 drop down value selection
app.getPlayTimeMaxVal = function() {
  const selection = $('select[name=time] option').filter(':selected').val()
  console.log(selection)
  return selection
}

//Questions 3 drop down value selection
app.getAgeVal = function() {
  const selection = $('select[name=age] option').filter(':selected').val()
  console.log(selection)
  return selection
}



app.displayBoardGames = function(boardGames){
  boardGames.games.forEach((singleBoardGame)=> {
    console.log(singleBoardGame);
    const htmlToAppend = `
      <li class="image-container">
        <h3>${singleBoardGame.name}</h3>
        <img src="${singleBoardGame.images.medium}" alt="${singleBoardGame.name}">
        <div class="content-box">
          <p>${singleBoardGame.description_preview.substring(0,600)}...</p>
          <form method="get" action="${singleBoardGame.url}">
              <button type="submit">Click for more info!</button>
          </form>
        </div>
        <h4>Player #: ${singleBoardGame.min_players}</h4>
        <h4>Game length (minutes): ${singleBoardGame.max_playtime}</h4>
        <h4>Min Age: ${singleBoardGame.min_age}</h4>
      </li>
    `
    $('.flex-container').append(htmlToAppend)
  })
}


//create submit event
$('form').on('submit', (event) => {
  event.preventDefault();
  const numPlayerSelection = app.getPlayerNumVal()
  const maxPlayerTimeSelection = app.getPlayTimeMaxVal()
  const numAgeSelection = app.getAgeVal()
  app.getBoardGame(numPlayerSelection, maxPlayerTimeSelection, numAgeSelection)
});


//initializer method
app.init = function() {
}

//document ready
$(function(){
  app.init()
})