/*NDI3NDY0MDk0Mjg3NjU5MDE4.DZk67w.17WdZ0oSeMHqqG2K-DkY3dVJh4E    discord token*/
/*522591856:AAHn4kMK_d8i2-8yVLjywuNgslXYEJN-g5I telebot token*/
var fs = require('fs');

/*
var fs = require('fs'),
    files = fs.readdirSync('./letters'),
    clips = [],
    stream,
    currentfile,
    dhh = fs.createWriteStream('./output.wav');
// create an array with filenames (time)
files.forEach(function (file) {
    clips.push(file.substring(0, 6));
});
// Sort
clips.sort(function (a, b) {
    return a - b;
});
// recursive function
function main() {
    if (!clips.length) {
        dhh.end("Done");
        return;
    }
    currentfile = './letters/' + clips.shift();
    stream = fs.createReadStream(currentfile);
    stream.pipe(dhh, {end: false});
    stream.on("end", function() {
        console.log(currentfile + ' appended');
        main();
    });
}
main();
*/
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

var audioconcat = require('audioconcat');
/*
let string = "абба";
let letters = [];
for (let i = 0; i < string.length; i++){
  letters.push('./letters/'+string[i] + '.mp3');
}
console.log(letters);

audioconcat(letters)
  .concat('word.mp3')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Audio created in:', output)
  })
*/



const TeleBot = require('telebot');
const bot = new TeleBot(TelegramToken);

const Discord = require('discord.js');
const client = new Discord.Client();

const bot_telegram_id = ;
const bot_discord_id = ;
const discord_channel_id =;
const telegram_channel_id = ;

let last_channel = 426145630008901642;
let isPlaying = false;

let voiceChannel;
let inVoice = false;
let connection;
const ytdl = require('ytdl-core');

const request = require('request');
let users = new Map();

let deff = false;
users.set('1', {
  sticker: '🏳️‍🌈',
  name: '1'
}); // pitt 🌈
users.set('2', {
  sticker: '🇺🇦',
  name: '2'
}); // nazar
users.set('3', {
  sticker: '🇺🇦‍',
  name: '3'
}); // pawa
users.set('4', {
  sticker: '🐖‍',
  name: '4'
}); // vitalik

let queue = [];
let change_next = true;


let sounds = "**кот** [*звук*]\n:arrow_forward: **гав**\n:arrow_forward: **датинаглий**\n:arrow_forward: **мяу**\n:arrow_forward: **мяууу**\n:arrow_forward: **плизду**\n:arrow_forward: **ррр**\n:arrow_forward: **соси**\n:arrow_forward: **булочки**\n:arrow_forward: **уи**\n:arrow_forward: **ха** \n:arrow_forward: **хук** \n:arrow_forward: **шрифт**";

//let channel =  client.servers.get("name", "✡☭Лала☭ϟϟ✡").defaultChannel;
let prev_author;
bot.on('text', function(msg) {
  //client.sendMessage('427474848562806794', msg.text);
  if (msg.chat.id == telegram_channel_id) {
    //console.log(msg.from.first_name);
    if (prev_author != msg.from.first_name) {
      client.channels.get('427474848562806794').send('-');
    }
    client.channels.get('427474848562806794').send('**' + msg.from.first_name + '**: ' + msg.text);
    prev_author = msg.from.first_name;
  }
  //client.sendMessage(channel, msg.text);
  //msg.reply.text(msg.text+' сосав хуй');
});

bot.on('photo', function(msg) {
  let url = "https://api.telegram.org/bot" + TelegramToken + "/getFile?file_id=" + msg.photo[0].file_id
  let path = "https://api.telegram.org/file/bot" + TelegramToken + "/" + msg.photo[0].file_path;
  let file_path = "";

  console.log(url);

  request(url, {
    json: true
  }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    file_path = body.result.file_path;
    console.log(file_path);
    path = "https://api.telegram.org/file/bot" + TelegramToken + "/" + file_path;
  });

  console.log(path);


  console.log();
  if (msg.chat.id == telegram_channel_id) {
    if (prev_author != msg.from.first_name) {
      client.channels.get('427474848562806794').send('-');
    }

    client.channels.get('427474848562806794').send('**' + msg.from.first_name + '**: ', {
      file: path
    });


    prev_author = msg.from.first_name;
  }

});



bot.on('edit', (msg) => {
  return msg.reply.text('а шо ти едітиш там, дуроочка?', {
    asReply: true
  });
});

bot.start();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async  msg => {
  //console.log(msg.channel.TextChannel.name);

  if (msg.channel.id == discord_channel_id) {
    if (msg.author.id != bot_discord_id) {
      //client.deleteMessage(msg,1);
      //client.deleteMessage(msg,{wait:100});

      if (users.has(msg.author.id)) {
        sticker = users.get(msg.author.id).sticker;
        name = users.get(msg.author.id).name;
        if (prev_author != name) {
          client.channels.get('427474848562806794').send('-');
        }
      } else {
        sticker_ = '';
        name = msg.author.username;
        if (prev_author != msg.author.username) {
          client.channels.get('427474848562806794').send('-');
        }
      }


      if (msg.attachments.get(Array.from(msg.attachments.keys())[0]) != undefined) {
        msg.content = msg.attachments.get(Array.from(msg.attachments.keys())[0]).proxyURL;
        msg.delete(500);
        client.channels.get('427474848562806794').send('**' + name + '**: ' + msg.content);
        bot.sendPhoto(telegram_channel_id, msg.content);


        //console.log(msg.attachments);

      } else {
        msg.delete();
        client.channels.get('427474848562806794').send('**' + name + '**: ' + msg.content);
        bot.sendMessage(telegram_channel_id, sticker + name + ': ' + msg.content);
      }



      if (users.has(msg.author.id)) {
        prev_author = users.get(msg.author.id).name;
      } else {
        prev_author = msg.author.username;
      }




    }
  } else {
    if (msg.author.id != bot_discord_id) {
      last_channel = msg.channel.id;
      if (msg.content.includes("скожи")){
        msg.content = msg.content.replace(/скожи/g,'');
        if (msg.content == 'назар не ок') {
          deff = true
        }
        if (msg.content == 'назар ок') {
          deff = false
        }

        if (msg.author.id == "259387636001669120" && deff) {
          client.channels.get('426145630008901642').send("мать назара шлюха и он тоже", {
            tts: true
          });
        } else {
          client.channels.get('426145630008901642').send(msg.content, {
            tts: true
          });
        }
        msg.delete(0);
      }
      if (msg.content === 'кот сюда') {
        if (msg.member.voiceChannel) {
          voiceChannel = msg.member.voiceChannel;
          voiceChannel.join().then(connection_ =>{
              connection = connection_;
              inVoice = true;
              msg.reply('ну я зашов, че дальше?');
          }).catch(err => console.log(err));
        } else {
          msg.reply('ало зайди сначала в войс, децель');
        }
      } else if (msg.content == 'коточ') {
        let str = 'Очередь: ';
        if (queue.length > 0){
          for (let i = 0; i < queue.length; i++){
            str += '\n**'+(i+1)+'** - '+queue[i];
          }
          console.log(last_channel);
        } else {
          str = 'Плейлист пуст';
        }
        //client.channels.get(last_channel).send(str);
        msg.reply(str);
      } else if (msg.content === 'кот нахуй'){
        if (msg.member.voiceChannel == voiceChannel){
           voiceChannel.leave();
           inVoice = false;
        } else if (inVoice) {
          msg.reply('ало зайди сначала в войс, пес');
        }
      } else if (msg.content === 'скип') {
        if (queue.length >= 1){
          queue.shift();
          change_next = false;
          next_queue();
        }
        else {
          client.channels.get(last_channel).send('Плейлист закончился');
        }
      } else if (msg.content == 'сквсе') {
        client.channels.get(last_channel).send('Плейлист очищен');
      } else if ( msg.content.includes('кот') ){
        if (inVoice){
          if (msg.member.voiceChannel == voiceChannel){
            if (msg.content.includes('котют')){
              msg.content = msg.content.replace(/кот/g,'');
              msg.content = msg.content.replace(/ют /g,'');

              msg.delete(0);
              queue.push(msg.content);
              console.log(queue);
              msg.reply('добавлено в плейлист (**'+queue.length+'**): '+msg.content);
              if (!isPlaying){
                change_next = true;
                next_queue();
              }

            } else if (msg.content.includes('синт')){
              msg.content = msg.content.replace(/котсинт /g,'');

              let string = msg.content;
              if (string.length < 80){
                let letters = [];
                for (let i = 0; i < string.length; i++){
                  if (string[i] == ' '){
                    letters.push('./letters/space.mp3');
                  } else if (string[i] == ',') {
                    letters.push('./letters/space.mp3');
                  } else if (string[i] == '.') {
                    letters.push('./letters/space.mp3');
                  } else {
                    letters.push('./letters/'+string[i]+'.mp3');
                  }

                }
                console.log(letters);

                audioconcat(letters)
                  .concat('sound/word.mp3')
                  .on('start', function (command) {
                    console.log('ffmpeg process started:', command)
                  })
                  .on('error', function (err, stdout, stderr) {
                    console.error('Error:', err)
                    console.error('ffmpeg stderr:', stderr)
                  })
                  .on('end', function (output) {
                    console.error('Audio created in:', output)
                    dispatcher = playFile(connection, msg, 'word');
                  })
              } else {
                msg.reply("чим длиннее сообщения тим меньше хуй");
              }
            } else {
              msg.content = msg.content.replace(/кот /g,'');
              dispatcher = playFile(connection, msg, msg.content);
            }
          } else {
            msg.reply('че такой хитрий? сначала сюда зайди');
          }
        } else {
          msg.reply('я не в войсе, даун');
        }
      } else if (msg.content == 'хелп' ) {
          msg.reply('\n :one: **скожи** [*текст*] - *скозать через tts от бота* \n :two: **кот сюда** - *зайти в ваш голосовой канал* \n :three: **кот нахуй** - *выйти из голосового канала* \n :four: **кот** [*название звука*] - *воспроизвести звук в голосовом чате* \n        :arrow_right: *введите* <**звуки**> *для получения списка доступных звуков* \n :five: **котют** [*ютуб ссылка*] - *воспроизвести звук из видео ютуба* \n :five: **котсинт** [*текст*] - *синтезировать текст в речь* \n :six: **коточ** - *посмотреть очередь*\n :seven: **скип** - *пропустить песню* \n :eight: **сквсе** - *очистить плейлист* ');
      }
      else if (msg.content == 'звуки'  ) {
          msg.reply(sounds);
      }
    }



  }

  //msg.reply('/tts хуй хуй');
  //console.log(msg.attachments);
  //console.log(msg.attachments.get(Array.from( msg.attachments.keys() )[0]).url);
  //console.log(msg.attachments.get(Array.from( msg.attachments.keys() )[0]) == undefined);
  //console.log(msg);
  //console.log(msg);
});


//котют https://www.youtube.com/watch?v=lDQ7hXMLxGc
function next_queue(){
  if (queue.length >= 1){
    client.channels.get(last_channel).send('Играю: '+queue[0]);

    voiceChannel.join()
      .then(connection => {
        const streamOptions = { seek: 0, volume: 1 };
        const stream = ytdl(queue[0], { filter : 'audioonly' });
        const dispatch = connection.playStream(stream, streamOptions);
        isPlaying = true;
        dispatch.on('end', () => {
          dispatcher = null;
          if (change_next){
            queue.shift();
            next_queue();
          }
          change_next = true;
          isPlaying = false;
        });
      })
      .catch(console.error);
  } else {
    client.channels.get(last_channel).send('Плейлист закончился');
  }
}
let buff = [];
function playFile(connection, msg, file_name){
  if (queue.length >= 1){
    buff = queue;
    change_next = false;
    queue = [' '];
    next_queue();

  }
  isPlaying = false;
  dispatcher = connection.playFile('./sound/'+file_name+'.mp3');
  dispatcher.on("end", end => {
    if (queue.length >= 1){
      change_next = false;
      queue = buff;
      console.log(queue);
      next_queue();
    }
  });
  return dispatcher;
}

client.login(DiscordToken);
