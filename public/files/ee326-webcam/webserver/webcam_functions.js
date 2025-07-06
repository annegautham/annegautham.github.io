// webcam_functions.js

var websocket = null;
var localhost = "";
var b = document.getElementById("btnWS");
var buttonClicked = false;

var triviaQuestions = [
  { question: "Fill in the quote: 'I'll be ___'", answer: "back" },
  { question: "Fill in the quote: 'Hasta la vista, ___'", answer: "baby" },
  {
    question: "Fill in the quote: 'Come with me if you ___ to live'",
    answer: "want",
  },
  {
    question:
      "Fill in the quote: 'The future is not set. There is no ___ but what we make for ourselves.'",
    answer: "fate",
  },
  {
    question:
      "Fill in the quote: 'I need your ___, your boots, and your motorcycle.'",
    answer: "clothes",
  },
];

function getRandomTrivia() {
  var randomIndex = Math.floor(Math.random() * triviaQuestions.length);
  return triviaQuestions[randomIndex];
}

function updateTimestamp() {
  var timestampEl = document.getElementById("timestamp");
  if (timestampEl) {
    timestampEl.innerText = new Date().toLocaleTimeString();
  }
}

function init() {
  if (window.location.hostname !== "") {
    localhost = window.location.hostname;
  }
  // Update the timestamp every second.
  setInterval(updateTimestamp, 1000);
}

function doConnect() {
  if (b.innerText === "Start Webcam") {
    writeToScreen("Connecting to ws://" + localhost + ":81/ ...");
    b.disabled = true;
    websocket = new WebSocket("ws://" + localhost + ":81/");
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
  } else {
    writeToScreen("Disconnecting ...");
    websocket.close();
  }
}

function onOpen(evt) {
  writeToScreen("Connected.");
  b.innerText = "Stop Webcam";
  b.title = "Click to stop webcam";
  b.disabled = false;
  buttonClicked = false;
}

function onClose(evt) {
  writeToScreen("Disconnected. Error: " + evt);
  b.innerText = "Start Webcam";
  b.title = "Click to start webcam";
  b.disabled = false;
  if (!buttonClicked) {
    doConnect();
  }
  buttonClicked = false;
}

function onMessage(msg) {
  updateTimestamp();
  var image = document.getElementById("image");
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      image.src = e.target.result;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(msg.data);
}

function onError(evt) {
  websocket.close();
  writeToScreen("Websocket error");
  b.innerText = "Start Webcam";
  b.title = "Click to start webcam";
  b.disabled = false;
  buttonClicked = false;
}

b.addEventListener("click", function () {
  b.disabled = true;
  buttonClicked = true;
  if (b.innerText === "Start Webcam") {
    var trivia = getRandomTrivia();
    var userAnswer = prompt(trivia.question);
    if (
      userAnswer &&
      userAnswer.trim().toLowerCase() === trivia.answer.toLowerCase()
    ) {
      doConnect();
    } else {
      showWhackAMole();
    }
  } else {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.close();
    } else {
      doConnect();
    }
  }
});

function writeToScreen(message) {
  var msgBox = document.getElementById("msg");
  if (msgBox) {
    msgBox.innerHTML += message + "\n";
    msgBox.scrollTop = msgBox.scrollHeight;
  }
}

/* --- WHACK-A-MOLE GAME FUNCTIONALITY --- */
var gridSize = 3;
var moleInterval = null;

function showWhackAMole() {
  gridSize = 3;
  createGrid(gridSize);
}

function createGrid(size) {
  // Clear the document content.
  document.body.innerHTML = "";
  // Set the background image (using your provided path)
  document.body.style.backgroundImage = "url('assets/background.png')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  // Create a container that spans the entire screen.
  var container = document.createElement("div");
  container.id = "whackContainer";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
  container.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
  container.style.gap = "5px";
  container.style.background = "transparent";
  document.body.appendChild(container);

  var totalCells = size * size;
  var cells = [];
  for (var i = 0; i < totalCells; i++) {
    var cell = document.createElement("div");
    cell.style.width = "100%";
    cell.style.height = "100%";
    cell.style.overflow = "hidden";
    var img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    // Default cell image: Nyan Cat.
    img.src = "https://www.nyan.cat/images/Collection11-20.gif";
    cell.appendChild(img);
    container.appendChild(cell);
    cells.push(cell);
  }

  // Add an invisible button in the bottom right corner to return to the webcam.
  var invisibleButton = document.createElement("button");
  invisibleButton.style.position = "fixed";
  invisibleButton.style.bottom = "10px";
  invisibleButton.style.right = "10px";
  invisibleButton.style.width = "50px";
  invisibleButton.style.height = "50px";
  invisibleButton.style.opacity = "0";
  invisibleButton.style.zIndex = "1000";
  invisibleButton.addEventListener("click", function () {
    clearInterval(moleInterval);
    location.reload();
  });
  document.body.appendChild(invisibleButton);

  // Function to update the grid with a random mole.
  function updateGrid() {
    var moleIndex = Math.floor(Math.random() * totalCells);
    for (var j = 0; j < totalCells; j++) {
      var img = cells[j].querySelector("img");
      if (j === moleIndex) {
        // Show the mole image from assets (ilya.png)
        img.src = "assets/ilya.png";
        cells[j].onclick = function () {
          clearInterval(moleInterval);
          location.reload();
        };
      } else {
        // Show default Nyan Cat image.
        img.src = "https://www.nyan.cat/images/Collection11-20.gif";
        cells[j].onclick = function () {
          clearInterval(moleInterval);
          gridSize++; // Increase grid size by 1
          if (gridSize >= 20) {
            showBombAnimation();
          } else {
            createGrid(gridSize);
          }
        };
      }
    }
  }
  moleInterval = setInterval(updateGrid, 300);
}

/* --- BOMB ANIMATION FUNCTIONALITY --- */
function showBombAnimation() {
  document.body.innerHTML = "";
  document.body.style.backgroundColor = "#000";

  var bombContainer = document.createElement("div");
  bombContainer.style.position = "fixed";
  bombContainer.style.top = "0";
  bombContainer.style.left = "0";
  bombContainer.style.width = "100vw";
  bombContainer.style.height = "100vh";
  bombContainer.style.display = "flex";
  bombContainer.style.flexDirection = "column";
  bombContainer.style.justifyContent = "center";
  bombContainer.style.alignItems = "center";
  bombContainer.style.color = "#fff";
  document.body.appendChild(bombContainer);

  // Create audio objects (replace URLs with your actual audio file URLs).
  var alarmAudio = new Audio("https://example.com/alarm.mp3");
  var bombAudio = new Audio("https://example.com/bomb_explosion.mp3");
  alarmAudio.loop = true;
  alarmAudio.play();

  // Display the nuke image (or your bomb image).
  var bombImage = document.createElement("img");
  bombImage.src = "assets/nuke.png";
  bombImage.style.width = "200px";
  bombImage.style.height = "200px";
  bombContainer.appendChild(bombImage);

  // Countdown text element.
  var countdownText = document.createElement("div");
  countdownText.innerText = "3";
  countdownText.style.marginTop = "20px";
  countdownText.style.fontSize = "72px";
  countdownText.style.fontWeight = "bold";
  countdownText.style.color = "red";
  bombContainer.appendChild(countdownText);

  var countdown = 3;
  var countdownInterval = setInterval(function () {
    countdown--;
    if (countdown > 0) {
      countdownText.innerText = countdown;
    } else {
      clearInterval(countdownInterval);
      countdownText.innerText = "BOOM!";
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      bombAudio.play();
      // The bomb animation remains on-screen.
    }
  }, 1000);
}

window.addEventListener("load", init, false);
