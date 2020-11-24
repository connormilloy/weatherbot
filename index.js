require('dotenv').config()
const forecast = require("./weather");
const {prefix, bot_info} = require('./config.json');
//const fetch  = require('node-fetch');
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.once('ready', () => {
    console.log(`${bot_info.name} (v${bot_info.version}) loaded..`);
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === "weather"){
        if(!args.length){
            return message.channel.send(`You didn't provide any arguments. The correct syntax for this command is !weather (city)`);
        }

        let weatherNow = forecast.getForecast(args);
        weatherNow.then(result => {
            message.channel.send(result);
        });
    }

    if(command === "help"){
        message.author.send("Hello! Thanks for using dirgetheundying's Weather Report bot! Here's a list of commands..");
        message.author.send("Weather -- Generates a weather report for the city you entered. -- Syntax: !weather (city)");
        message.author.send("Help -- Sends this information in a PM. -- Syntax: !help");
    }
})