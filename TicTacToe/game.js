reset = Module.cwrap("reset", "number", []);
player_move = Module.cwrap("player_move", "number", ["number"]);
ai_move = Module.cwrap("ai_move", "number", []);
get_key = Module.cwrap("get_key", "string", []);
has_finished = Module.cwrap("has_finished", "int", []);

has_started = false;

function click_handler(i){
    if(!has_started)
        return;

    move = player_move(i);
    console.log(move);
    if(move >= 0)
        document.getElementsByClassName("button" + move)[0].setAttribute("status", Status.player);
    
    if (has_finished()) {
        return next_game();
    }

    next_move();
}

function end_round(key){
    localStorage.setItem("key", key);
    window.location.reload()
}

function clear_game(){
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("button" + i)[0].setAttribute("status", Status.empty);
    }
}

function next_game(){
    has_started = false;
    let key = get_key();
    let result = reset();
    if(result === undefined)
        result = 0;


    if (result == 0) {
        type_and_untype("Wait we DREW!?", function(){
            type_and_untype("...no, it must be a bug", function(){
                clear_game();
                    next_move();
            });
        });
    }

    if (result == 1) {
        type_and_untype("HA! I knew I would win!!", function(){
                clear_game();
                next_move();
        });
    }

    if (result == 2) {
        type_and_untype("Wait WHAT!!!", function(){
            type_and_untype("YOU WON!", function(){
                type_and_untype("NO, that's not possible!!", function(){
                    type_and_untype("Meh, whatever. I'm gone", function(){
                        clear_game();
                        end_round(key);
                    });
                });
            });
        });
    }
}

function next_move(){
    has_started = false;
    let m = ai_move();
    let is_throwing = false;

    if(m >= 100){
        m -= 100;
        is_throwing= true;
    }

    if(m >= 0)
    document.getElementsByClassName("button" + m)[0].setAttribute("status", Status.com);

    if (has_finished()) {
        return next_game();
    }
    if (has_finished()) {
        return next_game();
    }
    type_and_untype(is_throwing ? "I don't even need to check this move!" : "You never stood a chance!", function(){})
    has_started = true;
}

function type_and_untype(text, then){
    text_terminal.innerText = text;
    //type_text(text_terminal).addEventListener("animationend", function(){
        setTimeout(function () {
            //untype_text(text_terminal).addEventListener("animationend", function(){
                then();
           // });
        }, 2000);
    //});
}

var text_terminal;
window.onload = function(){


    if (localStorage.getItem("key") !== null) {
        document.body.innerHTML = "<iup-terminal id=\"main_terminal\"></iup-terminal>";
        let element = document.getElementById("main_terminal").getElementsByClassName("terminal_text")[0];
        element.innerText = "Executable not found at /usr/bin/bot.sh";
        type_text(element);
        setTimeout(function () { //In timeout so that the dom changes would load.
            alert("Hello World");
        }, 100);

    }

    text_terminal = document.getElementById("typing_terminal").getElementsByClassName("terminal_text")[0];
    type_and_untype("Hello there human!", function(){
        type_and_untype("I have taken your key,", function(){
            type_and_untype("and you can't get it back!", function(){
                type_and_untype("That is, unless you beat me", function(){
                    type_and_untype(".. at tic tac toe!", function(){
                    type_and_untype("like that could ever happen", function(){
                        next_move();
                    });
                });
                });
            });
        });
    });

}