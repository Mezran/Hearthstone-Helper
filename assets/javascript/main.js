let arraySelection = cardName;

var favsList = JSON.parse(localStorage.getItem("favsList")) || [];

autocomplete(document.getElementById("myInput"), (arraySelection));

$(".dropdown-item").click(function () {
  let text = $(this).text(); // get text of the clicked item
  $("#dropdownMenu2").text(text); // set text to the button (dropdown)
  arraySelection = $(this).val() === 'cardName' ?
    cardName :
    $(this).val() === 'cardType' ?
      cardType :
      cardClass


  if (arraySelection === cardName) {
    autocomplete(document.getElementById("myInput"), (arraySelection));
  } else {
    showSearchArray(document.getElementById("myInput"), (arraySelection));
  }
});


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    let firstNewDiv;
    let secondNewDiv;
    let i, val = this.value;

    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    firstNewDiv = document.createElement("div");
    firstNewDiv.setAttribute("id", this.id + "autocomplete-list");
    firstNewDiv.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(firstNewDiv);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        secondNewDiv = document.createElement("div");
        /*make the matching letters bold:*/
        secondNewDiv.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        secondNewDiv.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        secondNewDiv.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        secondNewDiv.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        firstNewDiv.appendChild(secondNewDiv);
      }
    }
  });






  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
} // end auto complete


function showSearchArray(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    let firstNewDiv;
    let secondNewDiv;
    let i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    firstNewDiv = document.createElement("div");
    firstNewDiv.setAttribute("id", this.id + "autocomplete-list");
    firstNewDiv.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(firstNewDiv);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      /*create a DIV element for each matching element:*/
      secondNewDiv = document.createElement("div");
      /*make the matching letters bold:*/
      secondNewDiv.innerHTML = arr[i];
      /*insert a input field that will hold the current array item's value:*/
      secondNewDiv.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
      /*execute a function when someone clicks on the item value (DIV element):*/
      secondNewDiv.addEventListener("click", function (e) {
        /*insert the value for the autocomplete text field:*/
        inp.value = this.getElementsByTagName("input")[0].value;
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists();
      });
      firstNewDiv.appendChild(secondNewDiv);
    }
  })
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
} // end function showSearchArray





function createCard(passedCard) {
  const cardName = passedCard[0].name;
  //create all elements
  // main wrapper for the card
  let cardWrapper = document.createElement('div');
  cardWrapper.setAttribute('class', 'myCard box');
  //card image
  let cardImage = document.createElement('img');
  cardImage.setAttribute('class', 'card-image');
  cardImage.setAttribute('src', passedCard[0].img);
  cardWrapper.appendChild(cardImage);

  //content wrapper
  let cardContent = document.createElement('div');
  cardContent.setAttribute('class', 'card-content');
  cardWrapper.appendChild(cardContent);

  //title container
  let cardTitleContainer = document.createElement('div');
  cardTitleContainer.setAttribute('class', 'title-container');
  cardContent.appendChild(cardTitleContainer);

  // star i
  let cardFav = document.createElement('i');
  cardFav.setAttribute('class', 'fas fa-star fa-lg favorite');
  cardFav.setAttribute('data-card-name', cardName);
  cardTitleContainer.appendChild(cardFav);
  // If the card is already in the favorites list,
  if (favsList.includes(cardName)) {
    cardFav.setAttribute('data-state', 'favorited');
    cardFav.setAttribute('class', 'fas fa-star fa-lg favorite favorited');
  } else { //Otherwise, it is unfavorited by default
    cardFav.setAttribute('data-state', 'unfavorited');
  }

  // create card title span
  let cardTitle = document.createElement('span');
  cardTitle.setAttribute('class', 'card-title');
  cardTitle.innerHTML = passedCard[0].name;
  cardTitleContainer.appendChild(cardTitle);

  //add hr
  let breakPt = document.createElement('hr');
  cardContent.appendChild(breakPt);

  //card body
  let cardBodyWrapper = document.createElement('div');
  cardBodyWrapper.setAttribute('class', 'my-card-body');
  cardContent.appendChild(cardBodyWrapper);

  //text
  if (passedCard[0].text !== undefined) {
    console.log("adding text");
    console.log(passedCard[0])
    let cardParagraph = document.createElement('p');
    let cardText = passedCard[0].text.split('\\n').join(' ');
    console.log('****', cardText);
    cardParagraph.innerHTML = cardText;
    cardBodyWrapper.appendChild(cardParagraph);
  }
  //Flavor
  if (passedCard[0].flavor !== undefined) {
    console.log("adding Flavor");
    let cardFlavor = document.createElement('div');
    cardFlavor.setAttribute('class', 'flavor-text');
    cardFlavor.innerHTML = passedCard[0].flavor;
    cardTitleContainer.appendChild(cardFlavor);
  }
  //cost
  if (passedCard[0].cost !== undefined) {
    console.log("adding card cost");
    let cardCost = document.createElement('span');
    cardCost.setAttribute('class', 'card-stat');
    cardCost.innerHTML = 'Cost: ' + passedCard[0].cost;
    cardBodyWrapper.appendChild(cardCost);
  }
  //attack
  if (passedCard[0].attack !== undefined) {
    console.log("adding Attack");
    let cardAtk = document.createElement('span');
    cardAtk.setAttribute('class', 'card-stat');
    cardAtk.innerHTML = 'Attack: ' + passedCard[0].attack;
    cardBodyWrapper.appendChild(cardAtk);
  }

  //health
  if (passedCard[0].health !== undefined) {
    console.log("adding health");
    let cardHealth = document.createElement('span');
    cardHealth.setAttribute('class', 'card-stat');
    cardHealth.innerHTML = 'Health: ' + passedCard[0].health;
    cardBodyWrapper.appendChild(cardHealth);
  }
  //health
  if (passedCard[0].durability !== undefined) {
    console.log("adding durability");
    let cardDur = document.createElement('span');
    cardDur.setAttribute('class', 'card-stat');
    cardDur.innerHTML = 'Durability: ' + passedCard[0].durability;
    cardBodyWrapper.appendChild(cardDur);
  }

  // append wrapper to card location
  document.querySelector("#search-results").prepend(cardWrapper);



} // end function createCard


// create favorites bar inital list on load
buildFavs();


$("#search-results").on("click", ".favorite", function () {
  const card = $(this);
  const cardName = card.attr("data-card-name");
  console.log(cardName + " " + favsList);
  if (favsList.indexOf(cardName) > -1) {
    // RUN UNFAVORITE CODE
    unFavorite(card, cardName);
  } else {
    if (card.attr("data-state") === "unfavorited") {
      card.attr("data-state", "favorited");
      card.addClass("favorited");
      favsList.push(cardName);
      localStorage.setItem("favsList", JSON.stringify(favsList) || []);

      // create favorites list dynamically as favorites are added
      buildFavs();


    } else {
      unFavorite(card, cardName);
    }
  }

  // RUN FUTURE SIDEBAR REFRESH FUNCTION
});

function unFavorite(x, y) {
  if (x) {
    x.attr("data-state", "unfavorited");
    x.removeClass("favorited");
  }

  // Remove the card name from the favorites array
  for (var i = favsList.length - 1; i >= 0; i--) {
    if (favsList[i] === y) {
      favsList.splice(i, 1);
    }
  }
  localStorage.setItem("favsList", JSON.stringify(favsList) || []);
  buildFavs();

};


function buildFavs() {
  updateStars();

  $("#favSidebarContainer").empty();
  favsList = JSON.parse(localStorage.getItem("favsList"));
  for (let i = 0; i < favsList.length; i++) {
    const favDiv = $("<div class='mt-3'>");
    const favText = $("<div class='favText'>");
    const unfavText = $("<p>");

    favText.addClass("favDivsClick");
    favText.attr("data-name", favsList[i]);
    favText.css("cursor", "pointer");
    favText.text(`${favsList[i]}`);

    unfavText.text("Unfavorite");
    unfavText.addClass("unfavorite-btn quick-links");
    unfavText.attr("data-name", favsList[i]);
    unfavText.css("cursor", "pointer");

    favDiv.append(favText, unfavText);
    $("#favSidebarContainer").prepend(favDiv);
  }

  if (favsList.length == 0) {
    console.log("Empty Favs!");
    $("#favSidebarContainer").append("<p class='text-muted text-center m-3' style='font-size: 14px;'>No favorites yet. <br> Add favorites from your searches to save them here.</p>");
  }
};

document.addEventListener("DOMContentLoaded", function (func) {
  let twitchInfo;
  const streamers = [];
  let streamIndex = 0;
  function hearthstoneQuery(card) {
    fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/" + card, {
      headers: {
        "X-RapidAPI-Key": "de7e1386a0msh4a81fc191231dbbp121289jsn9b9280ac7bc4",
      } // end headers          // **** DO NOT CHANGE API KEY ****
    })
      .then(response => response.json())
      .then(data => {
        createCard(data);
      })
      .catch(error => console.log(error))
  }; // end hearthstoneQuery function

  function twitchCall(index){
    while(document.querySelector("#twitch-embed").firstChild){
      document.querySelector("#twitch-embed").removeChild(document.querySelector("#twitch-embed").firstChild);
    }    
    new Twitch.Embed("twitch-embed", {
      width: `100%`,
      height: `560`,
      channel: streamers[index],
      theme: "dark"
    });
    loadTitle (twitchInfo[index]);
  }
  document.querySelector("#nextStreamer").addEventListener("click", function(){
    twitchCall(++streamIndex);
  })

  function twitchQuery() {
    // hearthstoneID is the id from twitch.tv documentation.
    const hearthstoneID = "138585";
    fetch("https://api.twitch.tv/helix/streams?game_id=" + hearthstoneID, {
      headers: {
        "Client-ID": "liwyc586ihqciruhrzqtsu5o3vvs64",
      } // end headers    // **** DO NOT CHANGE CLIENT ID KEY ****
    })
      .then(response => response.json())
      .then(data => {
        twitchInfo = data.data;
        loadTitle(data);
        data.data.forEach(function (user, i) {
          const channel = data.data[i].user_name;
          streamers.push(channel);
        });
      twitchCall(streamIndex); 
      })
      .catch(error => console.log(error))
  }; // end TwitchQuery function

  //Begin sidebar functionality
  $("#hamburger").on("click", function openSidebar() {
    if ($("#favSidebar").hasClass("open")) {
      $("#favSidebar").toggleClass("open");
      $("#glossarySidebar").toggleClass("open")
    } else {
      $("#glossarySidebar").toggleClass("open")
    }
  });

  $("#favStar").on("click", function openSidebar() {
    if ($("#glossarySidebar").hasClass("open")) {
      $("#glossarySidebar").toggleClass("open");
      $("#favSidebar").toggleClass("open")
    } else {
      $("#favSidebar").toggleClass("open")
    }
  });


  // on search button pressed
  document.querySelector("#searchButton").addEventListener("click", function (e) {
    let cardToSearch = document.querySelector("#myInput").value;
    hearthstoneQuery(cardToSearch);
    $("#myInput").val("");
  });

  $("#favSidebarContainer").on("click", ".unfavorite-btn", function (e) {
    console.log(e);
    console.log("clicked unfavorite");
    console.log($(this).attr("data-name"));
    unFavorite("", $(this).attr("data-name"));
  });

  $("#favSidebarContainer").on("click", ".favDivsClick", function (e) {
    let cardToSearch = $(this).attr("data-name");
    hearthstoneQuery(cardToSearch);
  });

  hearthstoneQuery("Chicken");
  hearthstoneQuery("Arcane Shot");
  twitchQuery();

}); // end DOM content loaded;

// Load title's content 
function loadTitle(data) {
  console.log("Load title function!");
  const streamerName = data.user_name;
  const viewers = data.viewer_count;
  const streamTitle = data.title;
  console.log(`Streamer name: ${streamerName}. Viewers: ${viewers}. Title: ${streamTitle}`);
  $("#streamer-name").text(streamerName);
  $("#stream-title").text(streamTitle);
  $("#stream-viewers").text(`Total view count: ${viewers}`);
}

function unfavoriteAll() {
  favsList = [];
  localStorage.setItem("favsList", JSON.stringify(favsList) || []);
  buildFavs();
}

function updateStars() {
  console.log("Updating stars in dom");
  const stars = $(".favorite").toArray();
  console.log(stars);
  for (let i = 0; i < stars.length; i ++ ) {
    console.log($(stars[i]).attr("data-state"));
    if ($(stars[i]).attr("data-state") === "favorited" && !favsList.includes( $(stars[i]).attr("data-card-name") ) ) {
      console.log("Match!");
      $(stars[i]).attr("data-state", "unfavorited");
      $(stars[i]).removeClass("favorited");
    }
  }
}

$("#unfavoriteBtn").on("click", function () {
  unfavoriteAll();
});