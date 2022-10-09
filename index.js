const Discord = require("discord.js");
const cron = require('cron');
const { Client, GatewayIntentBits, CommandInteractionOptionResolver } = require('discord.js');
const { token } = require('./config.json');
const deployCommands = require("./deploy-commands.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(token);


client.once('ready', () => {
	console.log('Ready!');
});

let channelsJSON = {
    1: {
      id : 1026866716581572681, //channel id
      name: 'channel-1',  //channel name
    },
    2: {
        id : 1026866757819969556,
        name: 'channel-2',
    },
    3: {
        id : 1026866812874403872,
        name: 'channel-3',
    }
}

let doneChannel =[];
let arrinit = Object.values(channelsJSON);
console.log("Array init :" + arrinit);
let notAlreadyDone = arrinit;
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	} else if (commandName === 'randompick') {
         
        function randomObject(obj) {
            if(notAlreadyDone.length > 0){
            let arr = notAlreadyDone;
            let alea = arr[Math.floor(Math.random() * arr.length)];
            notAlreadyDone.pop(alea);
            console.log("Array not already done :" + notAlreadyDone);
            return alea;
            } else {
                notAlreadyDone = arrinit;
                let arr = notAlreadyDone;
                let alea = arr[Math.floor(Math.random() * arr.length)];
                notAlreadyDone.pop(alea);
                return alea;
            }
        }
    
        //function randomChannel() {
            if(doneChannel.length <= 4){
                let pickedChannel = randomObject(channelsJSON);

                if(doneChannel.includes(pickedChannel.id) == false){
                  doneChannel.push(pickedChannel.id);
                  let stringPickedChannel = JSON.stringify(pickedChannel.name); 
                  console.log(pickedChannel);
                  console.log(doneChannel);
                  client.channels.cache.get(`1026866664677048440`).send(`Picked channel == \`${stringPickedChannel}\``) // Args : .get(channelID)
                }else{
                    console.log("ID already picked");
                    let pickedChannel = randomObject(channelsJSON);

                }
            }else{
                console.log("List of done full");
                doneChannel=[];
            }
            
//}
        
        //randomChannel();
    }
});
