let startButton = document.getElementById("btnOne");

btnOne.onclick = function () {
    let flagPrompt = prompt("What is the Winter Grinch's message?")
    if ((flagPrompt == "The winter grinch is back again!")){
        alert("That is correct! The Winter Grinch has started running from our agents now that he knows we're on to him! We must run through various settings to try and catch him, though, there will be some challenges allong the way.")
        window.location.href='https://lainey-moffett.github.io/SavingWinterTwo/FirstMaze';

    }
    else {
        alert("Sorry, that is incorrect. Please try again!")
    }
}