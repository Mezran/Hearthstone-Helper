let arraySelection = cardName;

autocomplete(document.getElementById("myInput"), (arraySelection));


$(".dropdown-item").click(function() {
  let text = $(this).text(); // get text of the clicked item
  $("#dropdownMenu2").text(text); // set text to the button (dropdown)
  arraySelection = $(this).val() === 'cardName'
    ? cardName
    : $(this).val() === 'cardType'
      ? cardType
      : cardClass
  console.log(arraySelection);
  autocomplete(document.getElementById("myInput"), (arraySelection));
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
    if (!val) { return false; }
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
}

document.addEventListener("DOMContentLoaded", function(func){
const streamers = [];

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
      data.data.forEach(function (user, i) {
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
$("#hamburger").on("click", function openSidebar(){
    $(".sidebar-content").toggleClass("open");
});

  

  hearthstoneQuery("Chicken");
  twitchQuery()

}); // end DOM content loaded;