const { Client, RichEmbed } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.on("ready", () => {
    console.log(`Im Online, my name is ${client.user.username}`);

    client.user.setPresence({
       status: "online",
       game: {
           name: "me getting developed",
           type: "WATCHING"
       } 
    });
});

client.on("message", async message => {
    const prefix = "-"

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        const msg = await message.channel.send(`Pinging...`);

        msg.edit(`Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency: ${Math.round(client.ping)}ms`);
    }

    if (cmd === "say") {
        if (message.deletable) message.delete();

        if (args.length < 1) 
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))

            message.channel.send(embed);
        }
    }
});

client.login(process.env.TOKEN);