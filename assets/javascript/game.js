    var arrAlphabet = [],
        newGame = true,
        lastGame = false,
        cityIsDone = false,
        hangman = {
            numWins: 0,
            numLosses: 0,
            numGuessesRemaining: 7,
            numCorrectLetters: 0,
            strWhichCity: "",
            arrGameCityDB: [],
            arrLettersGuessed: [],
            arrCitiesUsed: [],

            WrongGuess: function() {
                this.numGuessesRemaining--;
                document.getElementById("scrGuesses").innerHTML = this.numGuessesRemaining;
            },

            BuildGallow: function() {
                var elem = document.getElementById("hangman-img");

                elem.src = "assets/images/Hangman"+parseInt(this.numGuessesRemaining)+".png";
                elem.style.visibility = "visible";
            },

            IsLoser: function() {
                if (this.numGuessesRemaining === 0) {
                    cityIsDone = true;
                    this.numLosses++;
                    document.getElementById("scrLosses").innerHTML = this.numLosses;
                    document.getElementById("reset-btn").disabled = false;
                    document.getElementById("playAgain-btn").disabled = false;
                    document.getElementById("gameHint").innerHTML = "You Lost!! [" + this.strWhichCity + "]";
                    
                    if (lastGame)
                        this.GameOver();
                }
            }, 

            RightGuess: function(whichElem) {
                var elem = document.getElementById(whichElem);

                this.numCorrectLetters++;
                if (!whichElem.startsWith("sp"))
                    elem.src = "assets/images/letters/key_" + whichElem.charAt(0).toUpperCase() + ".png";
                else
                    elem.src = "assets/images/letters/key_SP.png";

                elem.height = "48";
            },

            IsWinner: function() {
                if (this.numCorrectLetters === this.strWhichCity.length) {
                    cityIsDone = true;
                    this.numWins++;
                    document.getElementById("scrWins").innerHTML = this.numWins;
                    document.getElementById("reset-btn").disabled = false;
                    document.getElementById("playAgain-btn").disabled = false;
                    document.getElementById("gameHint").innerHTML = "You Won!!";
                    
                    if (lastGame)
                        this.GameOver();
                }
            },

            GameOver: function() {
                document.getElementById("start-btn").disabled = true;
                document.getElementById("reset-btn").disabled = false;
                document.getElementById("playAgain-btn").disabled = true;

                if (this.numWins > this.numLosses)
                    document.getElementById("gameHint").innerHTML = "Overall Winner! You won more than you lost.";
                else
                    document.getElementById("gameHint").innerHTML = "Overall Loser! You lost more than you won.";

                SetAlert("You've finished the last round.  You must Reset The Game to play again.","");
            },

            SetGameCity: function() {
                var rdm = Math.floor(Math.random() * this.arrGameCityDB.length);
                this.strWhichCity = this.arrGameCityDB[rdm].city;

                while (this.arrCitiesUsed.indexOf(this.strWhichCity) > -1) {
                    rdm = Math.floor(Math.random() * this.arrGameCityDB.length);
                    this.strWhichCity = this.arrGameCityDB[rdm].city;
                }
                this.arrCitiesUsed.push(this.strWhichCity);

                if (this.arrCitiesUsed.length === this.arrGameCityDB.length)
                    lastGame = true;

                document.getElementById("gameHint").innerHTML = "(hint: " + this.arrGameCityDB[rdm].country + ")";
            },

            ChooseLetter: function(ltr) {
                this.arrLettersGuessed.push(ltr);
            }
        };


    /***************************************************************/
    function PopulateAlphabet() {
    /***************************************************************/

        arrAlphabet = ['a','b','c','d','e','f','g','h','i',
                      'j','k','l','m','n','o','p','q','r',
                      's','t','u','v','w','x','y','z','sp'];
    }


    /***************************************************************/
    function PopulateAlphabetImages() {
    /***************************************************************/

        var elem,
            whichLetter;

        for (i = 0; i < arrAlphabet.length; i++) {
            whichLetter = arrAlphabet[i];

            elem = document.createElement("button");
            elem.id = "ltr"+arrAlphabet[i].toUpperCase();
            elem.className = "ltr";
            elem.value = whichLetter;
            document.getElementById("alphabet-imgs").appendChild(elem);

            elem = document.createElement("img");
            elem.src = "assets/images/letters/key_" + whichLetter.toUpperCase() + ".png";
            elem.height = "48";
            document.getElementById("ltr"+arrAlphabet[i].toUpperCase()).appendChild(elem);
        }
    }


    /***************************************************************/
    function PopulateArrayDB() {
    /***************************************************************/

        hangman.arrGameCityDB.push({id:1,country:'United States',city:'Chicago'});
        hangman.arrGameCityDB.push({id:2,country:'United Kingdom',city:'London'});
        hangman.arrGameCityDB.push({id:3,country:'France',city:'Marseille'});
        hangman.arrGameCityDB.push({id:4,country:'United States',city:'San Diego'});
        hangman.arrGameCityDB.push({id:5,country:'Germany',city:'Stuttgart'});
        hangman.arrGameCityDB.push({id:6,country:'Canada',city:'Vancouver'});
        hangman.arrGameCityDB.push({id:7,country:'United Kingdom',city:'Birmingham'});
        hangman.arrGameCityDB.push({id:8,country:'Sweden',city:'Stockholm'});
        hangman.arrGameCityDB.push({id:9,country:'Australia',city:'Melbourne'});
        hangman.arrGameCityDB.push({id:10,country:'Mexico',city:'Chihuahua'});
        hangman.arrGameCityDB.push({id:11,country:'Japan',city:'Yokohama'});
        hangman.arrGameCityDB.push({id:12,country:'China',city:'Shanghai'});
        hangman.arrGameCityDB.push({id:13,country:'United States',city:'Atlanta'});
        hangman.arrGameCityDB.push({id:14,country:'United Kingdom',city:'Nottingham'});
        hangman.arrGameCityDB.push({id:15,country:'Australia',city:'Brisbane'});
        hangman.arrGameCityDB.push({id:16,country:'Argentina',city:'Buenos Aires'});
        hangman.arrGameCityDB.push({id:17,country:'United States',city:'Denver'});
        hangman.arrGameCityDB.push({id:18,country:'China',city:'Beijing'});
        hangman.arrGameCityDB.push({id:19,country:'Russia',city:'Moscow'});
        hangman.arrGameCityDB.push({id:20,country:'Canada',city:'Montreal'});
        hangman.arrGameCityDB.push({id:21,country:'United States',city:'New York City'});
        hangman.arrGameCityDB.push({id:22,country:'Ireland',city:'Dublin'});
        hangman.arrGameCityDB.push({id:23,country:'United States',city:'San Francisco'});
        hangman.arrGameCityDB.push({id:24,country:'United States',city:'Los Angeles'});
        hangman.arrGameCityDB.push({id:25,country:'China',city:'Hong Kong'});
    }


    /***************************************************************/
    function StartGame() {
    /***************************************************************/

        if (newGame) {
            newGame = false;
            ClearAlert();

            document.getElementById("start-btn").disabled = true;
            document.getElementById("reset-btn").disabled = true;
            document.getElementById("playAgain-btn").disabled = true;        

            hangman.SetGameCity();
            SetTheLetterTiles();

            document.getElementById("hangman-img").style.visibility = "hidden";
            document.getElementById("hangman-img").src = "";
            document.getElementById("scrGuesses").innerHTML = hangman.numGuessesRemaining;
        }
    }


    /***************************************************************/
    function ResetGame() {
    /***************************************************************/

        newGame = true;
        lastGame = false;
        cityIsDone = false;
        hangman.numWins = 0;
        hangman.numLosses = 0;
        hangman.arrCitiesUsed = [];

        ClearGuessTiles();
        ClearAlert();
        BaselineTheValues();
        BaselineTheAlphabetImgs();

        document.getElementById("hangman-img").src = "assets/images/Hangman0.png";
        document.getElementById("hangman-img").style.visibility = "visible";

        document.getElementById("gameHint").innerHTML = "";

        document.getElementById("scrWins").innerHTML = "";
        document.getElementById("scrLosses").innerHTML = "";
        document.getElementById("scrGuesses").innerHTML = "";

        document.getElementById("start-btn").disabled = false;
        document.getElementById("reset-btn").disabled = false;
        document.getElementById("playAgain-btn").disabled = true;
    }


    /***************************************************************/
    function ClearGuessTiles() {
    /***************************************************************/

        var elem = document.getElementById('ltrGuessTiles');

        while (elem.firstChild)
            elem.removeChild(elem.firstChild);
    }


    /***************************************************************/
    function ClearAlert() {
    /***************************************************************/

        document.getElementById("noticesArea").innerHTML = "";
    }


    /***************************************************************/
    function SetAlert(msg, size) {
    /***************************************************************/ 

        var elem = document.getElementById("noticesArea");

        if (size != "")
            elem.classList.add(size);

        document.getElementById("noticesArea").innerHTML = msg;
    }


    /***************************************************************/
    function BaselineTheValues() {
    /***************************************************************/

        hangman.arrLettersGuessed = [];
        hangman.numCorrectLetters = 0;
        hangman.numGuessesRemaining = 7;
    }

    /***************************************************************/
    function BaselineTheAlphabetImgs() {
    /***************************************************************/

        var nxtChar = "";

        for (i = 0; i < arrAlphabet.length; i++) {
            nxtChar = arrAlphabet[i].toUpperCase();
            document.getElementById("ltr" + nxtChar).style.visibility = "visible";
        }
    }


    /***************************************************************/
    function PlayAgain() {
    /***************************************************************/

        document.getElementById("reset-btn").disabled = true;
        document.getElementById("playAgain-btn").disabled = true; 

        document.getElementById("hangman-img").style.visibility = "hidden";
        document.getElementById("hangman-img").src = "";

        cityIsDone = false;
        ClearGuessTiles();
        ClearAlert();
        BaselineTheValues();
        BaselineTheAlphabetImgs();

        document.getElementById("scrGuesses").innerHTML = hangman.numGuessesRemaining;

        hangman.SetGameCity();
        SetTheLetterTiles();
    }


    /***************************************************************/
    function SetTheLetterTiles() {
    /***************************************************************/

        var newImg,
            idImg;

        for (i = 0; i < hangman.strWhichCity.length; i++) {
            newImg = document.createElement('img');

            if (hangman.strWhichCity[i] !== " ")
                idImg = hangman.strWhichCity[i].toLowerCase() + parseInt(i);
            else
                idImg = "sp" + parseInt(i);

            newImg.setAttribute('id',idImg);
            newImg.setAttribute('class', 'imgTiles');
            newImg.src = "assets/images/letters/key_Asterisk.png"
            newImg.height = "48";
            document.getElementById("ltrGuessTiles").appendChild(newImg);
        }
    }


    /***************************************************************/
    function GetAllIndexVals(arr, ltr) {
    /***************************************************************/

        var indexes = [];

        for (i = 0; i < arr.length; i++)
          if (arr[i].toLowerCase() === ltr)
            indexes.push(i);

        return indexes;
    }


    /***************************************************************/
    function CountDuplicateLetters(string,ltr) {
    /***************************************************************/

        var re = new RegExp(ltr,"gi");

        return string.match(re).length;
    }


    /***************************************************************/    
    function GameRoutine(x) {
    /***************************************************************/

        var keyPressed = "",
            idxKey,
            numMatches,
            whichCity,
            indexes;

        if (!newGame) {
            keyPressed = x.toLowerCase();
            if (!cityIsDone) {
                whichCity = hangman.strWhichCity.toLowerCase();
            
                if (arrAlphabet.indexOf(keyPressed) > -1) {
                    if (keyPressed === "sp")
                    keyPressed = " ";

                    if (hangman.arrLettersGuessed.indexOf(keyPressed) === -1) {
                        hangman.ChooseLetter(keyPressed);
                        if (keyPressed !== " ") {
                            document.getElementById("ltr" + keyPressed.toUpperCase()).style.visibility = "hidden";
                        }
                        else {
                            document.getElementById("ltrSP").style.visibility = "hidden";
                        }

                        if (whichCity.indexOf(keyPressed) > -1) {
                            numMatches = CountDuplicateLetters(whichCity,keyPressed);
                            if (numMatches === 1) {
                                idxKey = whichCity.indexOf(keyPressed);
                                if (keyPressed !== " ") {
                                    hangman.RightGuess(keyPressed + parseInt(idxKey));
                                }
                                else {
                                    hangman.RightGuess("sp" + parseInt(idxKey));
                                }
                                hangman.IsWinner();
                            }
                            else {
                                indexes = GetAllIndexVals(hangman.strWhichCity,keyPressed);
                                for (i = 0; i < indexes.length; i++) {
                                    idxKey = indexes[i];
                                    if (keyPressed !== " ") {
                                        hangman.RightGuess(keyPressed + parseInt(idxKey));
                                    }
                                    else {
                                        hangman.RightGuess("sp" + parseInt(idxKey));
                                    }
                                    hangman.IsWinner();
                                }
                            }
                        }
                        else {
                            hangman.WrongGuess();
                            hangman.IsLoser();
                            hangman.BuildGallow();
                        }
                    }
                    else {
                        SetAlert("You've already selected that letter.  Please choose another.","");
                    }
                }
                else {
                    SetAlert("You must press space, or a letter in the alphabet.","");
                }
            }
            else if (!lastGame) {
                SetAlert("You must click the Continue Play button to play the next round.","");
            }
            else {
                SetAlert("You've finished the last round.  You must Reset The Game to play again.","");
            }
        }
        else {
            SetAlert("You must click the Start Game button to play.","");
        }
    }


    /***************************************************************/
    document.onkeyup = function(x) {
    /***************************************************************/

        ClearAlert();

        if (event.which === 32)       //spacebar was pressed
            GameRoutine("sp")
        else
            GameRoutine(x.key);
    }


    /***************************************************************/
    document.addEventListener('DOMContentLoaded', function() {
    /***************************************************************/

        var getEle,
            elemID;

        PopulateAlphabet();
        PopulateAlphabetImages();
        PopulateArrayDB();

        document.getElementById("hangman-img").src = "assets/images/Hangman0.png";

        for (i = 0; i < arrAlphabet.length; i++) {
            elemID = "ltr" + arrAlphabet[i].toUpperCase();
            getEle = document.getElementById(elemID);
            getEle.style.visibility = "visible";
            getEle.onclick = function() { 
                BtnClicked(this);
            };
        }
    }, false);


    /***************************************************************/
    function BtnClicked(whichElem) {
    /***************************************************************/

        ClearAlert();
        GameRoutine(whichElem.value);
    }


    /***************************************************************/
    document.documentElement.addEventListener('keydown', function (e) {
    /***************************************************************/

        if ( ( e.keycode || e.which ) == 32)
            e.preventDefault();
    }, false);