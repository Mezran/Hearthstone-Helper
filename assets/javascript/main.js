let arraySelection = cardName;
const favoritedCardNames = [];


autocomplete(document.getElementById("myInput"), (arraySelection));


$(".dropdown-item").click(function() {
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
  inp.addEventListener("input", function(e) {
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
        secondNewDiv.addEventListener("click", function(e) {
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
  inp.addEventListener("keydown", function(e) {
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
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}// end auto complete


function showSearchArray(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
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
      secondNewDiv.addEventListener("click", function(e) {
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
  inp.addEventListener("keydown", function(e) {
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
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
} // end function showSearchArray





function createCard(passedCard) {
  console.log("Sending");
  //create all elements
  // main wrapper for the card
  let cardWrapper = document.createElement('div');
  cardWrapper.setAttribute('class', 'myCard box');
  // cardWrapper.setAttribute('class', 'box');
  //card image
  let cardImage = document.createElement('img');
  cardImage.setAttribute('class', 'card-image');
  cardImage.setAttribute('src', passedCard[0].img);
  //content wrapper
  let cardContent = document.createElement('div');
  cardContent.setAttribute('class', 'card-content');
  //title container
  let cardTitleContainer = document.createElement('div');
  cardTitleContainer.setAttribute('class', 'title-container');
  // star i
  let cardFav = document.createElement('i');
  cardFav.setAttribute('class', 'fas fa-star fa-lg favorite');
  cardFav.setAttribute('data-card-name', 'example card2');
  cardFav.setAttribute('data-state', 'unfavorited');

  // create card title span
  let cardTitle = document.createElement('span');
  cardTitle.setAttribute('class', 'card-title');
  cardTitle.innerHTML = passedCard[0].name;
  //add hr
  let breakPt = document.createElement('hr');
  //card body
  let cardBodyWrapper = document.createElement('div');
  cardBodyWrapper.setAttribute('class', 'my-card-body');
  //paragraph
  let cardParagraph = document.createElement('p');
  cardParagraph.innerHTML = passedCard[0].text;

  //three If statements




  // set data based on passedCard

  // append elements to their place
  cardWrapper.appendChild(cardImage);
  cardWrapper.appendChild(cardContent);
  cardContent.appendChild(cardTitleContainer);
  cardTitleContainer.appendChild(cardFav);
  cardTitleContainer.appendChild(cardTitle);
  cardContent.appendChild(breakPt);
  cardContent.appendChild(cardBodyWrapper);
  cardBodyWrapper.appendChild(cardParagraph);


  // append wrapper to card location
  document.querySelector("#search-results").prepend(cardWrapper);



} // end function createCard


$("#search-results").on("click", ".favorite", function() {
  const card = $(this);
  const cardName = card.attr("data-card-name");
  console.log(cardName);
  if (card.attr("data-state") === "unfavorited") {
    console.log("Favorited");
    card.attr("data-state", "favorited");
    card.addClass("favorited");
    favoritedCardNames.push(cardName);
  } else {
    console.log("unfavorited");
    card.attr("data-state", "unfavorited");
    card.removeClass("favorited");

    // Remove the card from the favorites array
    for (var i = favoritedCardNames.length - 1; i >= 0; i--) {
      if (favoritedCardNames[i] === cardName) {
        favoritedCardNames.splice(i, 1);
      }
    }

    console.log(favoritedCardNames);
  }
})

document.addEventListener("DOMContentLoaded", function(func) {
  const streamers = [];


  function hearthstoneQuery(card) {
    fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/" + card, {
        headers: {
          "X-RapidAPI-Key": "de7e1386a0msh4a81fc191231dbbp121289jsn9b9280ac7bc4",
        } // end headers          // **** DO NOT CHANGE API KEY ****
      })
      .then(response => response.json())
      .then(data => {
        console.log("Success");
        console.log(data);
        createCard(data);
      })
      .catch(error => console.log(error))
  }; // end hearthstoneQuery function


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
        console.log("twitch Query success");
        console.log(data);
        data.data.forEach(function(user, i) {
          const channel = data.data[i].user_name;
          console.log("RESPONSE IS " + channel)
          streamers.push(channel);
        });
        console.log("LOADING " + streamers);
        new Twitch.Embed("twitch-embed", {
          width: `100%`,
          height: `560`,
          channel: streamers[0],
          theme: "dark"
        });
      })
      .catch(error => console.log(error))
  }; // end TwitchQuery function

  //Begin sidebar functionality
  $("#hamburger").on("click", function openSidebar() {
    $(".sidebar-content").toggleClass("open");
  });

  // on search button pressed
  document.querySelector("#searchButton").addEventListener("click", function(e){
    let cardToSearch = document.querySelector("#myInput").value;
    hearthstoneQuery(cardToSearch);
  })



  hearthstoneQuery("Chicken");
  twitchQuery()

}); // end DOM content loaded;
