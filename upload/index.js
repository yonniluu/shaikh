'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.a48af926-f174-4353-8313-94889d03bb0c";

const HELP_MESSAGE = 'You can say declare a for loop, or you can say declare a variable, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.response.speak("You have launched Code Editor. Programming language is set to Python.").listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'DeclareVariable': function () {
        const name = this.event.request.intent.slots.name.value;
        const value = this.event.request.intent.slots.value.value;
        const confirmation = "You are creating a variable named" + name + " initialized to " + value + ".";
        this.response.speak(confirmation).listen(HELP_REPROMPT);
        this.emit(':responseReady');
        
        var send = "var " + name + " = " + value + ";\n";
        var url = ""; // endpoint 
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
        xhr.send(send);
    },
    'DeclareForLoop': function () {
        const beg = this.event.request.intent.slots.beg.value;
        const end = this.event.request.intent.slots.end.value;
        const confirmation = "You are creating a for loop that iterates from " + beg + " to " + end + ".";
        this.response.speak(confirmation).listen(HELP_REPROMPT);
        this.emit(':responseReady');

        var send = "for (i in range(" + beg + ", " + end + "):{\n}";
        var url = ""; // endpoint
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
        xhr.send(send);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};