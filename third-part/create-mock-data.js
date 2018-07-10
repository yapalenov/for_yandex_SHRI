const { models, sequelize } = require('./models');

function createData () {
  let usersPromise = models.User.bulkCreate([
    {
      login: 'veged',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      homeFloor: 0
    },
    {
      login: 'alt-j',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
      homeFloor: 3
    },
    {
      login: 'yeti-or',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
      homeFloor: 2
    }
  ]);

  let roomsPromise = models.Room.bulkCreate([
    {
      title: '404',
      capacity: 5,
      floor: 4
    },
    {
      title: 'Деньги',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Карты',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Ствола',
      capacity: 2,
      floor: 2
    }
  ]);

  const HOUR = 60 * 60 * 1000;
  let now0 = new Date();
  let year = now0.getFullYear();
  let month = now0.getMonth();
  let day = now0.getDate();
  let hours = now0.getHours();
  let minutes = now0.getMinutes();
  minutes = Math.ceil(minutes/15)*15;
  let now = new Date(year, month, day, hours, minutes, 0);
  let oneHourLater = new Date(now.getTime() + HOUR);
  let twoHoursLater = new Date(oneHourLater.getTime() + HOUR);
  let threeHoursLater = new Date(twoHoursLater.getTime() + HOUR);
  let addHours = 0;
  let eventsPromise = models.Event.bulkCreate([
    {
      title: 'ШРИ 2018 - начало',
      dateStart: now - addHours*HOUR,
      dateEnd: oneHourLater - addHours*HOUR,
      dateDay: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0)
    },
    {
      title: '👾 Хакатон 👾',
      dateStart: oneHourLater - addHours*HOUR,
      dateEnd: twoHoursLater - addHours*HOUR,
      dateDay: new Date(oneHourLater.getFullYear(), oneHourLater.getMonth(), oneHourLater.getDate(), 3, 0, 0)
    },
    {
      title: '🍨 Пробуем kefir.js',
      dateStart: twoHoursLater - addHours*HOUR,
      dateEnd: threeHoursLater - addHours*HOUR,
      dateDay: new Date(twoHoursLater.getFullYear(), twoHoursLater.getMonth(), twoHoursLater.getDate(), 3, 0, 0)
    }
  ]);

  Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Room.findAll(),
      models.Event.findAll()
    ]))
    .then(function ([users, rooms, events]) {
      let promises = [];
      promises.push(events[0].setRoom(rooms[0]));
      promises.push(events[1].setRoom(rooms[1]));
      promises.push(events[2].setRoom(rooms[2]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));

      return Promise.all(promises);
    });
}

sequelize.sync()
  .then(createData);
