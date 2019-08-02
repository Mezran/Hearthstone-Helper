document.addEventListener("DOMContentLoaded", function(func){


  function hearthstoneQuery(card){
    fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/" + card, {
      headers: {
        "X-RapidAPI-Key": "de7e1386a0msh4a81fc191231dbbp121289jsn9b9280ac7bc4",
      } // end headers          // **** DO NOT CHANGE API KEY ****
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success");
      console.log(data);
    })
    .catch(error => console.log(error))
  };// end hearthstoneQuery function


  function twitchQuery(){
    // hearthstoneID is the id from twitch.tv documentation.
    const hearthstoneID = "138585";
    fetch("https://api.twitch.tv/helix/streams?game_id=" + hearthstoneID, {
      headers: {
        "Client-ID": "liwyc586ihqciruhrzqtsu5o3vvs64",
      }// end headers    // **** DO NOT CHANGE CLIENT ID KEY ****
    })
    .then(response => response.json())
    .then(data => {
      console.log("twitch Query success");
      console.log(data);
    })
    .catch(error => console.log(error))
  }; // end TwitchQuery function

  hearthstoneQuery("Chicken");
  twitchQuery()

}); // end DOM content loaded;
