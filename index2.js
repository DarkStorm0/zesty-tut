const Discord = require("discord.js");
const client = new Discord.Client();
var request = require("superagent");

//----------------------------------------------
var token = "NDUyNzExNzc3MDEzMDcxODgz.Dgll6g.gSY6DEFgzPjfMZ5fvMmugPoX6iY"
var prefix = "s!"
var discordbotsorgtoken = "NDUyNzExNzc3MDEzMDcxODgz.Dgll6g.gSY6DEFgzPjfMZ5fvMmugPoX6iY"
var discordpwtoken = "NDUyNzExNzc3MDEzMDcxODgz.Dgll6g.gSY6DEFgzPjfMZ5fvMmugPoX6iY"
//----------------------------------------------

client.on("ready", () => {
    client.user.setPresence({game: {name: "s! help", type: 0}});
    console.log("I am ready!");

    request
        .post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
        .send(`{ "server_count": ${client.guilds.size},
    "shards": [${client.guilds.size}],
    "shard_count": ${client.guilds.size} }`)
        .type('application/json')
        .set('Authorization', discordpwtoken)
        .set('Accept', 'application/json')
        .end(err => {
            if (err) return console.error(err);
            console.log("Posted stats to bots.discord.pw!");
        });
    request
        .post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
        .send(`{ "server_count": ${client.guilds.size},
    "shards": [${client.guilds.size}],
    "shard_count": ${client.guilds.size} }`)
        .type('application/json')
        .set('Authorization', discordbotsorgtoken)
        .set('Accept', 'application/json')
        .end(err => {
            if (err) return console.error(err);
            console.log("Posted stats to discordbots.org!");
        });
});

client.on("guildCreate", guild => {
    client.channels.get("397193015674011659").send(`New guild joined!\nName: ${guild.name}\nMember Count: ${guild.memberCount}.\nNow im in **${client.guilds.size}** guilds.`)

    request
        .post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
        .send(`{ "server_count": ${client.guilds.size},
    "shards": [${client.guilds.size}],
    "shard_count": ${client.guilds.size} }`)
        .type('application/json')
        .set('Authorization', discordpwtoken)
        .set('Accept', 'application/json')
        .end(err => {
            if (err) return console.error(err);
            console.log("Posted stats to bots.discord.pw!");
        });
    request
        .post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
        .send(`{ "server_count": ${client.guilds.size},
    "shards": [${client.guilds.size}],
    "shard_count": ${client.guilds.size} }`)
        .type('application/json')
        .set('Authorization', discordbotsorgtoken)
        .set('Accept', 'application/json')
        .end(err => {
            if (err) return console.error(err);
            console.log("Posted stats to discordbots.org!");
        });
});

client.on("guildDelete", guild => {
    client.channels.get("397193015674011659").send(`Guild left...\nName: ${guild.name}\nMember Count: ${guild.memberCount}.\n\nNow im in **${client.guilds.size}** guilds.`)

    request
    .post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
    .send(`{ "server_count": ${client.guilds.size},
"shards": [${client.guilds.size}],
"shard_count": ${client.guilds.size} }`)
    .type('application/json')
    .set('Authorization', discordpwtoken)
    .set('Accept', 'application/json')
    .end(err => {
        if (err) return console.error(err);
        console.log("Posted stats to bots.discord.pw!");
    });
request
    .post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .send(`{ "server_count": ${client.guilds.size},
"shards": [${client.guilds.size}],
"shard_count": ${client.guilds.size} }`)
    .type('application/json')
    .set('Authorization', discordbotsorgtoken)
    .set('Accept', 'application/json')
    .end(err => {
        if (err) return console.error(err);
        console.log("Posted stats to discordbots.org!");
    });
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

client.login(token);
