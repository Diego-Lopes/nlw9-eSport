import express from 'express';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-hour-to-minute';
import cors from 'cors'

const prisma = new PrismaClient({
  log: ['query']
});

const app = express();

app.use(express.json());

//permissão de acesso.
app.use(cors())

app.get('/games', async (req, res) => {

  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return res.json(games);
});


app.post('/games/:id/ads', async (req, res) => {

  const gameId = req.params.id;

  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,

      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),//salvando separando com virgula.
      hoursStart: convertHourStringToMinutes(body.hoursStart),
      hoursEnd: convertHourStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.status(201).json(ad);
});

app.get('/games/:id/ads', async (req, res) => {

  const id = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId: id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const adsFormatedWeekDays = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHourString(ad.hoursStart),
      hoursEnd: convertMinutesToHourString(ad.hoursEnd)
    }
  })

  return res.status(200).json(adsFormatedWeekDays)
})

app.get('/ads/:id/discord', async (req, res) => {

  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  });


  return res.status(200).json({
    discord: ad.discord,
  })
})

app.listen(3333, () => console.log('Server on Port: 3333 🚀'))