import $ from 'jquery';
import './../styles/style.css';
import './jquery.nicescroll.min'

document.addEventListener('DOMContentLoaded', function() {
    let i = new Date();
    let globalDate = new Date(i.getFullYear(), i.getMonth(), i.getDate(), 3, 0, 0);

    updateGlobalDate(globalDate);


    let getAll = async ()=>{
        await getUsersFromDB();
        await getRoomsFromDB();
        await getEventsFromDB(globalDate);
        await updateRoomsList(rooms);
        await updateTimesOfEvents(events2, rooms);
        await update_time_now(globalDate);
        await setInterval(update_time_now(globalDate), 30000);
        await setInterval(async()=>{
            if ($('.update_event_wrapper').is(':hidden')) {
                await getEventsFromDB(globalDate);
                await updateRoomsList(rooms);
                await updateTimesOfEvents(events2, rooms);
                await update_time_now(globalDate);
            }
        }, 90000)

    };
    getAll();
    let date = new Date();
    setCalendar(date);

    if(document.querySelector('#global_wrapper').offsetWidth < 660) {
        document.querySelector('#global_wrapper').classList.add('mobile')
    }


    $('#rooms').niceScroll({
        autohidemode: true,
        cursoropacitymin: 0.5,
        scrollspeed: 60,
        mousescrollstep: 6,
    });
/*-----------------------Listeners------------------------------------------------------*/

    document.querySelector('.arr_container:first-of-type').addEventListener('click',()=>{
        let cells = document.querySelectorAll(`td`);
        for (let i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = '#F6F7F9';
            if (!cells[i].classList.contains('day')){
                cells[i].innerHTML = '';
            }
        }
        let year = document.querySelector(`.calendar_container>article:nth-of-type(2)`).dataset.year;
        let month = document.querySelector(`.calendar_container>article:nth-of-type(2)`).dataset.month - 1;
        let setDate = new Date(year, month, 1);
        setCalendar(setDate);
    });

    document.querySelector('.arr_container:last-of-type').addEventListener('click',()=>{
        let cells = document.querySelectorAll(`td`);
        for (let i = 0; i < cells.length; i++){
            if (!cells[i].classList.contains('day')){
                cells[i].innerHTML = '';
                cells[i].style.backgroundColor = '#F6F7F9';
            }
        }
        let year = document.querySelector(`.calendar_container>article:nth-of-type(2)`).dataset.year;
        let month = +document.querySelector(`.calendar_container>article:nth-of-type(2)`).dataset.month + 1;
        let setDate = new Date(year, month, 1);
        setCalendar(setDate);
    });

    document.querySelectorAll('.arr')[0].addEventListener('click', ()=>{
        let i = new Date(globalDate);
        let day = 86400000;
        i = new Date(i.getTime() - day);
        globalDate = new Date(i.getFullYear(), i.getMonth(), i.getDate(), 3, 0, 0);
        updateGlobalDate(globalDate);
        getAll();
    });

    document.querySelectorAll('.arr')[1].addEventListener('click', ()=>{
        let i = new Date(globalDate);
        let day = 24*60*60*1000;
        i = new Date(i.getTime() + day);
        globalDate = new Date(i.getFullYear(), i.getMonth(), i.getDate(), 3, 0, 0);
        updateGlobalDate(globalDate);
        getAll();
    });

    let check = [false, 1];


         $(document).click( async (e) => {
             let func1 = (e)=> {
                 if (check[0]) {

                     let div2 = $(".update_block");
                     let div3 = $(".update_blank");
                     let div4 = $(".update_button");


                     if (e.target === check[1]
                         || e.target.classList[0] === div2[0].classList[0]
                            || e.target.classList[0] === div3[0].classList[0]
                                || e.target.classList[0] === div4[0].classList[0]) {

                     } else {
                         check[1].style.backgroundColor = "";
                         $(".update_block").css("display", "none").animate({opacity: 1}, 200);
                     }

                 }
             };

             let func2 = (e)=> {
                 let target = e.target;
                 if (target.classList.contains('close_time')) {
                     if (target.dataset.finished == '1'){
                         $('.update_button').css('display', 'none')
                     } else {
                         $('.update_button').css('display', 'block')
                     }
                     check[0] = true;
                     check[1] = e.target;
                     target.style.backgroundColor = "#D5DFE9";
                     setInfo(target, rooms, users);
                     let left = target.getBoundingClientRect().left;
                     let right = target.getBoundingClientRect().right;
                     let width = right - left;
                     let pad = document.querySelector("#global_wrapper").getBoundingClientRect().left;
                     let left2 = left + width/2 - 169 - pad;
                     if (left2 < 245){
                         left2 = 245;
                     }
                     if (left2 > 940){
                         left2 = 940;
                     }
                     let top = target.getBoundingClientRect().bottom;
                     $(".update_block").css("display", "block").animate({opacity: 1}, 200);
                     $('.update_block').css('left', left2);
                     $('.update_block').css('top', top - 7);
                     let up = $(".update_block")[0].getBoundingClientRect().left - pad;
                     let event_width = target.offsetWidth;
                     $('.before').css('left', left - pad - up + event_width/2 - 6);

                 }
             };

             let func3 = (e)=> {
                 let target = e.target;
                 if (target.classList.contains('empty_time')) {
                     createRooms();
                     setInfoForEmpty(e);
                     removeUsers();
                     createUsers(users, false);
                     let mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                     let day = $('#date').val().split(" ")[0];
                     let mounth = $('#date').val().split(" ")[1].substr(0, $('#date').val().split(" ")[1].length - 1);
                     for (let i = 0; i < mounths.length; i++) {
                         if (mounth == mounths[i]) {
                             mounth = +i;
                         }
                     }
                     let year = +$('#date').val().split(" ")[2];
                     let eventStartHours = +$('#start').val().split(":")[0];
                     let eventStartMinutes = +$('#start').val().split(":")[1];
                     let start = new Date(year, mounth, day, eventStartHours, eventStartMinutes, 0);
                     let now = new Date();
                     if (Date.parse(start) < Date.parse(now) - 60000) {
                         $('#start').css('backgroundColor', '#fadfe4');
                     } else {

                         let eventEndHours = +$('#end').val().split(":")[0];
                         let eventEndMinutes = +$('#end').val().split(":")[1];
                         let end = new Date(year, mounth, day, eventEndHours, eventEndMinutes, 0);
                         if (Date.parse(end) <= Date.parse(start)) {
                             $('#end').css('backgroundColor', '#fadfe4');
                         } else {
                             let dateForRecomend = {
                                 start: start,
                                 end: end
                             };

                             let members;

                             getRecomendation(dateForRecomend, members, rooms, users);
                         }}
                     $('#rooms').css('display', 'none');
                     $('label[for="rooms"]').css('display', 'none');
                     $('#room').css('display', 'block');
                     $('label[for="room"]').css('display', 'block');
                     $('#start').css('borderColor', '#E9ECEF');
                     $('#end').css('borderColor', '#E9ECEF');
                     $('#start').css('backgroundColor', 'white');
                     $('#end').css('backgroundColor', 'white');
                     $('#users').css('borderColor', '#E9ECEF');
                     $('#date').css('borderColor', '#E9ECEF');
                     $('#name').css('borderColor', '#E9ECEF');
                     $('#rooms').css('borderColor', '');
                     $('.scrollable_section').css('display', "none");
                     $('.update_event_wrapper').css('display', 'block');
                     $('.create_event').css('display', 'none');
                     $('.date_now').css('display', 'none');
                     $(".update_block").css("display", "none").animate({opacity: 1}, 200);
                 }};

             let func4 = (e)=>{
                 if (e.target.classList.contains('roomInRooms')){
                     $('#rooms').css('borderColor', '');
                     let roomBlock = document.querySelector('#room');
                     let selectedRoom = e.target;
                     let start = selectedRoom.firstElementChild.innerHTML.split('—')[0];
                     let end = selectedRoom.firstElementChild.innerHTML.split('—')[1];
                     document.querySelector('#start').innerHTML = start;
                     document.querySelector('#end').innerHTML = end;
                     roomBlock.dataset.roomId = selectedRoom.dataset.roomId;
                     roomBlock.dataset.roomCapacity = selectedRoom.dataset.roomCapacity;
                     roomBlock.innerHTML = `<div class="after"></div> ${selectedRoom.innerHTML}`;
                     roomBlock.style.display = 'block';
                     document.querySelector('label[for="rooms"]').style.display = 'none';
                     document.querySelector('label[for="room"]').style.display = 'block';
                     document.querySelector('#rooms').style.display = 'none';
                     document.querySelector('#room').style.display = 'block';
                 }
             };

             let func5 = (e)=> {
                 if (e.target.classList.contains('after')){
                     let rooms = document.querySelectorAll('.roomInRooms>article:first-of-type');

                     for (let i = 0; i < rooms.length;i++){
                         rooms[i].innerHTML = document.querySelector('#room>article:first-of-type').innerHTML;
                     }
                     document.querySelector('label[for="rooms"]').style.display = 'block';
                     document.querySelector('label[for="room"]').style.display = 'none';
                     document.querySelector('#rooms').style.display = 'block';
                     document.querySelector('#room').style.display = 'none';
                 }
             };

             let func8 = (e)=>{
                 if (e.target == document.querySelector('.date')){
                     document.querySelector('.calendar_container').style.display = 'block';
                 }
             }

             let func7 = (e) => {
                let node = e.target;
                 while(node.parentNode) {
                     if(node == document.querySelector('.calendar_container')){
                         return;
                     }
                     node = node.parentNode;
                 }
                 document.querySelector('.calendar_container').style.display = 'none';
             }

             let func6 = (e) => {
                 if (e.target.tagName == "TD" && !e.target.classList.contains('day') && e.target.dataset.disable != '1') {
                     let year = e.target.dataset.date.split(',')[0];
                     let month = e.target.dataset.date.split(',')[1];
                     let day = e.target.dataset.date.split(',')[2];
                     globalDate = new Date(year, month, day, 3, 0, 0);
                     document.querySelector('.calendar_container').style.display = 'none';
                     updateGlobalDate(globalDate);
                     getAll();
                 }
             };

             let func9 = async (e) => {
                 if (e.target.classList.contains('forSending')) {
                     let eventId = e.target.dataset.eventId;
                     let roomId = e.target.dataset.roomId;
                     let event;
                     for (let i = 0; i < events2.length; i++) {
                         if (events2[i].id == eventId) {
                             event = events2[i]
                         }
                     }
                     let usersIds = [];
                     for (let j = 0; j < event.users.length; j++){
                         usersIds.push(event.users[j].id)
                     }
                     let sendData = {
                         "query": "mutation($id: ID!, $title: String!, $day: String!, $start: String!, $end: String!, $users: [ID], $room: ID!){updateEvent(id: $id, input: {title: $title, dateDay: $day, dateStart: $start,dateEnd:$end},usersIds: $users,roomId: $room){id}}",
                         "variables": {
                             "id": eventId,
                             "title": "" + event.title,
                             "day": "" + event.dateDay,
                             "start": "" + event.dateStart,
                             "end": "" + event.dateEnd,
                             "users": usersIds,
                             "room": roomId
                         }
                     };


                     await $.ajax({
                         type: 'POST',
                         url: '/graphql',
                         contentType: "application/json; charset=utf-8",
                         data: JSON.stringify(sendData),
                         dataType: "json",
                         success: (data) => {

                         }
                     });

                     let mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                     let day = $('#date').val().split(" ")[0];
                     let mounth = $('#date').val().split(" ")[1].substr(0, $('#date').val().split(" ")[1].length - 1);
                     for (let i = 0; i < mounths.length; i++) {
                         if (mounth == mounths[i]) {
                             mounth = +i;
                         }
                     }
                     let year = +$('#date').val().split(" ")[2];
                     let eventStartHours = +$('#start').val().split(":")[0];
                     let eventStartMinutes = +$('#start').val().split(":")[1];
                     let start = new Date(year, mounth, day, eventStartHours, eventStartMinutes, 0);
                     let now = new Date();
                     if (Date.parse(start) < Date.parse(now) - 60000) {
                         $('#start').css('backgroundColor', '#fadfe4');
                     } else {

                         let eventEndHours = +$('#end').val().split(":")[0];
                         let eventEndMinutes = +$('#end').val().split(":")[1];
                         let end = new Date(year, mounth, day, eventEndHours, eventEndMinutes, 0);
                         if (Date.parse(end) <= Date.parse(start)) {
                             $('#end').css('backgroundColor', '#fadfe4');
                         } else {
                             let dateForRecomend = {
                                 start: start,
                                 end: end
                             };

                             let members;

                             getRecomendation(dateForRecomend, members, rooms, users);

                         }
                     }
                 }
             };

             await func1(e);
             await func2(e);
             await func3(e);
             await func4(e);
             await func5(e);
             await func6(e);
             await func7(e);
             await func8(e);
             await func9(e);
        });


    let setInfoForEmpty = (e)=>{
        let start = '';
        let end = '';
        let roomId = '';
        let day = '';
        let mounth = '';
        let year = '';
        /*----------------------*/
        let left = e.target.offsetLeft;
        let right = e.target.offsetWidth + left;
        let time_left = document.querySelector('.absolutely').offsetLeft;
        let hours;
        let minutes;
        let mobile = document.querySelector('#global_wrapper').classList.contains('mobile');
        let padding = 31;
        if (mobile){
            padding = 53;
        }
        if (left>time_left){
            hours = Math.floor((left - padding)/1.1/60) + 8;
            minutes = (Math.round((left - padding)/1.1) + 480)%60;
            if (minutes < 10){
                minutes = "0" + minutes;
            }
            if (minutes == 0 && (Math.floor((left - padding)/1.1) + 480)%60 > 0) {
                hours++;
            }

            start = hours + ":" + minutes;
        } else {
            start = document.querySelector('.absol').textContent;
            hours = start.split(':')[0];
            minutes = Math.ceil(start.split(':')[1]/15)*15;
            if (minutes == 60){
                minutes = '0';
                hours++
            }
            if (minutes < 10 ){
                minutes = "0" + +minutes;
            }
            if (hours<8){
                hours = 8;
                minutes = "00"
            }
            start = hours + ":" + minutes;
        }
        if (Math.floor((right - time_left)/1.1 < 60) || Math.floor((right - left)/1.1 < 60)){
            hours = Math.floor((right - padding) / 1.1 / 60) + 8;
            minutes = (Math.floor((right - padding) / 1.1) + 480) % 60;
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (minutes < 60 && minutes > 45) {
                minutes = "00"
                hours++;
            }
            if (minutes < 45 && minutes > 30) {
                minutes = 45
            }
            if (minutes < 30 && minutes > 15) {
                minutes = 30
            }
            end = hours + ":" + minutes;
        } else {

            end = (+hours + 1) + ":" + minutes ;
        }
        roomId = e.target.parentNode.dataset.roomId;
        let idNow = 0;
        for (let i = 0; i < events2.length; i++){
            idNow = idNow + +events2[i].id
        }
        document.querySelector('.update_blank').dataset.eventId = idNow;
        events2.push({
            id: idNow,
            title: '',
            dateStart: '',
            dateEnd: '',
            users: [],
            room: {id: ''}
        });
        let timeStart = globalDate.toISOString();
        let date = new Date();
        date.setTime(Date.parse(timeStart));
        day = date.getDate();
        let mounths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        mounth = mounths[date.getMonth()];
        year = date.getFullYear();
        let roomTitle = rooms[roomId - 1].title;
        let roomFloor = rooms[roomId - 1].floor;
        document.querySelector('#name').value = '';
        $('#start').val(start);
        $('#end').val(end);
        $('#date').val(`${day} ${mounth}, ${year}`);
        document.querySelector('#room').dataset.roomId = roomId;
        document.querySelector('#room').innerHTML =
            `
            <div class="after"></div>
            <article>${start}—${end}</article>
            <article>${roomTitle} · ${roomFloor} этаж</article>
            `
        document.querySelector('.update_event h1').innerHTML = 'Новая встреча';
        if (!document.querySelector('.update_event').classList.contains('create_new_event')){
            document.querySelector('.update_event').classList.add('create_new_event');
            document.querySelector('footer').classList.add('create_new_event');
        }
        document.querySelector('footer>div:first-of-type').style.left = "524px";
        document.querySelector('footer>div:nth-of-type(2)').style.display = 'none';
        document.querySelector('footer>div:nth-of-type(3)').style.display = 'block';
        document.querySelector('footer>div:last-of-type').style.display = 'none';
    };



    let setInfo = (target, rooms, users)=>{
        let mounths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        let title = target.dataset.eventTitle;
        let day = target.dataset.day;
        let mounth = mounths[target.dataset.mounth];
        let start = target.dataset.start;
        let end = target.dataset.end;
        let eventId = target.dataset.id;
        let roomTitle = rooms[target.dataset.roomId - 1].title;
        let usersId = target.dataset.usersId.split(',');
        let firstUser = users[usersId[1] - 1].login;
        let img_user = users[usersId[1] - 1].avatarUrl;
        let userLenght = usersId.length - 1;
        userLenght = userLenght + '';
        let I = '1';
        let want = ['2', '3', '4'];
        let scream ='';
        let lastNumbers = 1;
        if (userLenght.length > 1) {
            lastNumbers = userLenght[userLenght.length - 1] + userLenght[userLenght.length - 2]
        }

        if (userLenght.lastIndexOf(I) == 0 && (userLenght < 10 || userLenght > 20)) {
            scream = 'участник';
        } else if ((userLenght.lastIndexOf(want[0]) == 0
                || userLenght.lastIndexOf(want[1]) == 0
                || userLenght.lastIndexOf(want[2]) == 0)
              && (lastNumbers < 5 || lastNumbers > 20)){
            scream = "участника"
        } else {
            scream = "участников"
        }
        document.querySelector('.update_blank').dataset.eventId = eventId;
        document.querySelector('.update_blank h1').innerHTML = title;
        document.querySelector('.update_blank .time_updt').innerHTML =
            `
               ${day} ${mounth}, ${start}—${end} <span class="updt" style='padding-right:5px;'></span>·<span class="updt" style='padding-left:5px;'></span> ${roomTitle}
            `
        document.querySelector('.img_updt').style.backgroundImage = `url(${img_user})`;
        document.querySelector('.update_blank .description_updt').innerHTML =
            `
                ${firstUser}<span> и ${userLenght} ${scream}</span></div>
            `

    };

    $('.update_button').click(()=> {
        createRooms();
        setInfoForUpdate();
        $('#rooms').css('display', 'none');
        $('label[for="rooms"]').css('display', 'none');
        $('#room').css('display', 'block');
        $('label[for="room"]').css('display', 'block');
        $('#start').css('borderColor', '#E9ECEF');
        $('#end').css('borderColor', '#E9ECEF');
        $('#start').css('backgroundColor', 'white');
        $('#end').css('backgroundColor', 'white');
        $('#users').css('borderColor', '#E9ECEF');
        $('#date').css('borderColor', '#E9ECEF');
        $('#name').css('borderColor', '#E9ECEF');
        $('#rooms').css('borderColor', '');
        $('.scrollable_section').css('display', "none");
        $('.update_event_wrapper').css('display', 'block');
        $('.create_event').css('display', 'none');
        $('.date_now').css('display', 'none');
        check[1].style.backgroundColor = "";
        $(".update_block").css("display", "none").animate({opacity: 1}, 200);
    });

    let setInfoForUpdate = ()=>{
        if (document.querySelector('.update_event').classList.contains('create_new_event')){
            document.querySelector('.update_event').classList.remove('create_new_event');
            document.querySelector('footer').classList.remove('create_new_event');
        }
        document.querySelector('.update_event h1').innerHTML = "Редактирование встречи";
        let id = document.querySelector('.update_blank').dataset.eventId;
        let event = '';
        for (let i = 0; i < events2.length; i++){
            if (events2[i].id == id){
                event = events2[i]
            }
        }
        removeUsers();
        createUsers(users, event);
        let title = event.title;
        let roomTitle = rooms[event.room.id - 1].title;
        let roomFloor = rooms[event.room.id - 1].floor;
        let start = event.dateStart;
        let timeStart = Date.parse(start);
        let date = new Date();
        date.setTime(timeStart);
        let hours = date.getHours();
        let day = date.getDate();
        let mounths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        let mounth = mounths[date.getMonth()];
        let year = date.getFullYear();
        let minutes = date.getMinutes();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        start = hours + ":" + minutes;
        let end = event.dateEnd;
        let timeEnd = Date.parse(end);
        let date2 = new Date();
        date2.setTime(timeEnd);
        let hours2 = date2.getHours();
        let minutes2 = date2.getMinutes();
        if (minutes2 < 10){
            minutes2 = "0" + minutes2;
        }
        end = hours2 + ":" + minutes2;
        $('#name').val(title);
        $('#start').val(start);
        $('#end').val(end);
        $('#date').val(`${day} ${mounth}, ${year}`);
        document.querySelector('#room').dataset.roomId = event.room.id;
        document.querySelector('#room').innerHTML =
            `
            <div class="after"></div>
            <article>${start}—${end}</article>
            <article>${roomTitle} · ${roomFloor} этаж</article>
            `
        document.querySelector('footer>div:first-of-type').style.left = "465px";
        document.querySelector('footer>div:nth-of-type(2)').style.display = 'block';
        document.querySelector('footer>div:nth-of-type(3)').style.display = 'none';
        document.querySelector('footer>div:last-of-type').style.display = 'block';
    };

    $('footer>div:first-of-type, .close_round').click(()=> {
        $('#rooms').css('display', 'none');
        $('.create_event').css('display', 'block');
        $('.scrollable_section').css('display', "block");
        $('.update_event_wrapper').css('display', 'none');
        $('.date_now').css('display', 'block');
        if(document.querySelector('#global_wrapper').offsetWidth > 660) {
            $('.scrollable_section').scrollLeft(0);
            update_time_now(globalDate);
            let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
            let arr_name = document.querySelectorAll('.room_name');
            for (let i = 0; i < arr_floor.length; i++) {
                arr_floor[i].style.left = 0;
            }
            for (let i = 0; i < arr_name.length; i++) {
                arr_name[i].style.left = 0;
            }
        } else {
            $('.scrollable_section').scrollLeft(0);
            update_time_now(globalDate);
            let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
            let arr_name = document.querySelectorAll('.room_name');
            for (let i = 0; i < arr_floor.length; i++) {
                arr_floor[i].style.left = "16px";
            }
            for (let i = 0; i < arr_name.length; i++) {
                arr_name[i].style.left = "16px";
            }
        }
    });

    $('footer>div:nth-of-type(2)').click(()=>{
        $('.background_modal').css('display', 'block');
        $('.ask_delete').css('display', 'block');
    });

    $('.ask_close').click(()=> {
        $('.background_modal').css('display', 'none');
        $('.ask_delete').css('display', 'none');
    });

        $('.delete_button').click(()=>{
        $('.background_modal').css('display', 'none');
        $('.ask_delete').css('display', 'none');
        let id = document.querySelector('.update_blank').dataset.eventId;
        let sendData = {
            "query": "mutation($id: ID!){removeEvent(id: $id){id}}",
            "variables": {
                "id": id
            }
        };

        removeEvent(sendData, globalDate);

    });

    $('footer>div:last-of-type, footer>div:nth-of-type(3)').click(()=> {
        $('#start').css('borderColor', '#E9ECEF');
        $('#end').css('borderColor', '#E9ECEF');
        $('#users').css('borderColor', '#E9ECEF');
        $('#date').css('borderColor', '#E9ECEF');
        $('#name').css('borderColor', '#E9ECEF');
        $('#rooms').css('borderColor', '');

        /*---------------------------------------*/
        let succesId;
        let succesStart = '';
        let succesEnd = '';
        let succesTitle = $('#name').val();
        let succesUsers = [];
        let succesRoom;
        /*----------------------------------------*/
        let selectedUsers = document.querySelectorAll('.selected_users article');
        for (let i = 0; i < selectedUsers.length; i++){
            succesUsers.push(+selectedUsers[i].dataset.userId);
        }
        if (succesUsers.length < 2){
            $('#users').css('borderColor', 'red');
        } else {
            let askEmptyTime = true;
            let roomId = document.querySelector('#room').dataset.roomId;
            succesRoom = +roomId;
            let id = document.querySelector('.update_blank').dataset.eventId;
            succesId = id;
            let mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
            let day = $('#date').val().split(" ")[0];
            let mounth = $('#date').val().split(" ")[1].substr(0, $('#date').val().split(" ")[1].length - 1);
            for (let i = 0; i < mounths.length; i++) {
                if (mounth == mounths[i]) {
                    mounth = +i;
                }
            }
            let year = +$('#date').val().split(" ")[2];
            let eventStartHours = +$('#start').val().split(":")[0];
            let eventStartMinutes = +$('#start').val().split(":")[1];
            let start = new Date(year, mounth, day, eventStartHours, eventStartMinutes, 0);
            let sendingDate = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 3, 0, 0);
            let getEventsForDate = async function (date) {
                date = date.toISOString();
                return await $.ajax({
                    type: 'GET',
                    url: `/graphql?query={events(dateDay: "${date}"){id, title, dateStart, dateEnd, users{id},room{id}}}`,
                    dataType: "json",
                    success: (data) => {
                        date = new Date(date);
                        events = data.data.events;
                        let itemEvents = [];
                        let sortDataStart;
                        let sortDataEnd;
                        let day = date.getDate();
                        let month = date.getMonth();
                        let year = date.getFullYear();
                        sortDataStart = new Date(year, month, day, 8, 0, 0);
                        sortDataEnd = new Date(year, month, day, 23, 0, 0);
                        for (let i = 0; i < events.length; i++) {
                            let itemDateStart = Date.parse(events[i].dateStart);
                            let itemDateEnd = Date.parse(events[i].dateEnd);
                            if ((itemDateStart >= sortDataStart && itemDateStart <= sortDataEnd) && (itemDateEnd >= sortDataStart && itemDateEnd <= sortDataEnd)) {
                                itemEvents.push(events[i])
                            }
                        }
                        return itemEvents;
                    }
                });
            };

            let itemEvents = getEventsForDate(sendingDate);

            sendingDate = sendingDate.toISOString();


            start = start.toISOString();
            succesStart = start;
            let eventEndHours = +$('#end').val().split(":")[0];
            let eventEndMinutes = +$('#end').val().split(":")[1];
            let end = new Date(year, mounth, day, eventEndHours, eventEndMinutes, 0);
            end = end.toISOString();
            succesEnd = end;
            let startMinutes = eventStartHours * 60 + eventStartMinutes;
            let endMinutes = eventEndHours * 60 + eventEndMinutes;
            let time_now = new Date();
            if ($('#room').is(':hidden')){
                $('#rooms').css('borderColor', 'red');
            } else if($('#name').val().length < 1){

                $('#name').css('borderColor', 'red');
            } else if($('#date').val().length < 1){
                $('#date').css('borderColor', 'red');
            } else if($('#start').val().length < 1){
                $('#start').css('borderColor', 'red');

            } else if($('#end').val().length < 1){
                $('#end').css('borderColor', 'red');
            } else if (Date.parse(start) < Date.parse(time_now) - 60000) {

                $('#start').css('borderColor', 'red');
            } else if (start > end) {
                $('#end').css('borderColor', 'red');
            } else if (eventStartHours < 8 || (eventStartHours * 60 + eventStartMinutes) > 23 * 60) {

                $('#start').css('borderColor', 'red');
            } else if (eventEndHours < 8 || (eventEndHours * 60 + eventEndMinutes) > 23 * 60) {
                $('#end').css('borderColor', 'red');
            } else if (((endMinutes - startMinutes) % 15 > 0) || (startMinutes % 15 > 0) || (endMinutes % 15 > 0)) {
                $('#start').css('borderColor', 'red');
                $('#end').css('borderColor', 'red');
            } else {
                let room_events = [];
                for (let j = 0; j < itemEvents.length; j++) {
                    if (itemEvents[j].room.id == roomId) {

                        room_events.push({
                            id: itemEvents[j].id,
                            users: itemEvents[j].users,
                            title: itemEvents[j].title,
                            start: itemEvents[j].dateStart,
                            end: itemEvents[j].dateEnd
                        });
                    }
                }
                for (let i = 0; i < room_events.length; i++) {
                    if (room_events[i].id !== id) {
                        let startOfEvent = Date.parse(start);
                        let endOfEvent = Date.parse(end);
                        let startOfItem = Date.parse(room_events[i].start);
                        let endOfItem = Date.parse(room_events[i].end);
                        let date = new Date();
                        date.setTime(startOfEvent);
                        console.log(date.getHours() + ":" + date.getMinutes());
                        date = new Date();
                        date.setTime(endOfEvent);
                        console.log(date.getHours() + ":" + date.getMinutes());
                        date = new Date();
                        date.setTime(startOfItem);
                        console.log(date.getHours() + ":" + date.getMinutes());
                        date = new Date();
                        date.setTime(endOfItem);
                        console.log(date.getHours() + ":" + date.getMinutes());
                        let start1 = startOfEvent;
                        let end1 = endOfEvent - 60000;
                        let start2 = startOfItem;
                        let end2 = endOfItem;
                        if (((start1 < start2) || (start1 > end2 - 60000))
                            && ((end1< start2) || (end1 > end2))
                            && ((start2 < start1) || (start2 > end1))) {

                        } else {
                            askEmptyTime = false;
                        }
                    }
                }
                /*-----------------------*/
                let sendData = {
                    "query": "mutation($id: ID!, $title: String!, $day: String!, $start: String!, $end: String!, $users: [ID], $room: ID!){updateEvent(id: $id,input: {title: $title, dateDay: $day, dateStart: $start,dateEnd:$end},usersIds: $users,roomId: $room){id}}",
                    "variables": {
                        "id": succesId,
                        "title": "" + succesTitle,
                        "day": "" + sendingDate,
                        "start": "" + succesStart,
                        "end": "" + succesEnd,
                        "users": succesUsers,
                        "room": succesRoom
                    }
                };



                let sendDataNew = {
                    "query": "mutation($title: String!, $day: String!, $start: String!, $end: String!, $users: [ID], $room: ID!){createEvent(input: {title: $title, dateDay: $day, dateStart: $start,dateEnd:$end},usersIds: $users,roomId: $room){id}}",
                    "variables": {
                        "title": "" + succesTitle,
                        "day": "" + sendingDate,
                        "start": "" + succesStart,
                        "end": "" + succesEnd,
                        "users": succesUsers,
                        "room": succesRoom
                    }
                };

                let ask = document.querySelector('.update_event').classList.contains('create_new_event');

                /*-----------------------*/

                if (askEmptyTime) {
                    document.querySelectorAll('.succes_date')[1].innerHTML =
                        `${day} ${mounths[mounth]}, ${$('#start').val()} — ${$('#end').val()}`
                    document.querySelectorAll('.succes_room')[1].innerHTML =
                        `${document.querySelectorAll('#room article')[1].textContent}`
                    document.querySelectorAll('.succes_date')[0].innerHTML =
                        `${day} ${mounths[mounth]}, ${$('#start').val()} — ${$('#end').val()}`
                    document.querySelectorAll('.succes_room')[0].innerHTML =
                        `${document.querySelectorAll('#room article')[1].textContent}`
                    sendAndUpdate(ask,sendData, sendDataNew, globalDate);

                } else {
                    $('#start').css('borderColor', 'red');
                    $('#end').css('borderColor', 'red');
                }
            }
        }
    });

    $('.succes_button').click(()=>{
        $('.background_modal').css('display', 'none');
        $('.succes_updating').css('display', 'none');
        $('.succes_creating').css('display', 'none');
    });

    $('#start').on('input',()=>{
        let timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        if (timeReg.test($('#start').val())) {
            $('#start').css('backgroundColor', 'white');
            if (!timeReg.test($('#end').val())) {
                $('#end').css('backgroundColor', '#fadfe4');
            } else {

                let mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                let day = $('#date').val().split(" ")[0];
                let mounth = $('#date').val().split(" ")[1].substr(0, $('#date').val().split(" ")[1].length - 1);
                for (let i = 0; i < mounths.length; i++) {
                    if (mounth == mounths[i]) {
                        mounth = +i;
                    }
                }
                let year = +$('#date').val().split(" ")[2];
                let eventStartHours = +$('#start').val().split(":")[0];
                let eventStartMinutes = +$('#start').val().split(":")[1];
                let start = new Date(year, mounth, day, eventStartHours, eventStartMinutes, 0);
                let now = new Date();
                if (Date.parse(start) < Date.parse(now) - 60000) {
                    $('#start').css('backgroundColor', '#fadfe4');
                } else {

                    let eventEndHours = +$('#end').val().split(":")[0];
                    let eventEndMinutes = +$('#end').val().split(":")[1];
                    let end = new Date(year, mounth, day, eventEndHours, eventEndMinutes, 0);
                    if (Date.parse(end) <= Date.parse(start)) {
                        $('#end').css('backgroundColor', '#fadfe4');
                    } else {
                        let dateForRecomend = {
                            start: start,
                            end: end
                        };

                        let members;

                        getRecomendation(dateForRecomend, members, rooms, users);

                        $('#start').css('borderColor', '#E9ECEF');
                        document.querySelector('#room>article:first-of-type').innerHTML =
                            `
            ${$('#start').val()}—${$('#end').val()}
            `
                        let roomsInRooms = document.querySelectorAll('.roomInRooms');
                        for (let i = 0; i < roomsInRooms.length; i++) {
                            roomsInRooms[i].firstElementChild.innerHTML = `
            ${$('#start').val()}—${$('#end').val()}
            `
                        }
                    }
                }
            }
        }
        else {
            $('#start').css('backgroundColor', '#fadfe4');
        }
    });

    $('#end').on('input',()=> {

        let timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        if (timeReg.test($('#end').val())) {
            $('#end').css('backgroundColor', 'white');
            if (!timeReg.test($('#start').val())){
                $('#start').css('backgroundColor', '#fadfe4');
            } else {

                let mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                let day = $('#date').val().split(" ")[0];
                let mounth = $('#date').val().split(" ")[1].substr(0, $('#date').val().split(" ")[1].length - 1);
                for (let i = 0; i < mounths.length; i++) {
                    if (mounth == mounths[i]) {
                        mounth = +i;
                    }
                }
                let year = +$('#date').val().split(" ")[2];
                let eventStartHours = +$('#start').val().split(":")[0];
                let eventStartMinutes = +$('#start').val().split(":")[1];
                let start = new Date(year, mounth, day, eventStartHours, eventStartMinutes, 0);
                let now = new Date();
                if (Date.parse(start) < Date.parse(now) - 60000) {
                    $('#start').css('backgroundColor', '#fadfe4');
                } else {

                    let eventEndHours = +$('#end').val().split(":")[0];
                    let eventEndMinutes = +$('#end').val().split(":")[1];
                    let end = new Date(year, mounth, day, eventEndHours, eventEndMinutes, 0);
                    if (Date.parse(end) <= Date.parse(start)) {
                        $('#end').css('backgroundColor', '#fadfe4');
                    } else {
                        let dateForRecomend = {
                            start: start,
                            end: end
                        };

                        let members;

                        getRecomendation(dateForRecomend, members, rooms, users);

                        $('#end').css('borderColor', '#E9ECEF');
                        document.querySelector('#room>article:first-of-type').innerHTML =
                            `
            ${$('#start').val()}—${$('#end').val()}
            `
                        let roomsInRooms = document.querySelectorAll('.roomInRooms');
                        for (let i = 0; i < roomsInRooms.length; i++) {
                            roomsInRooms[i].firstElementChild.innerHTML = `
            ${$('#start').val()}—${$('#end').val()}
            `
                        }
                    }
                }
            }
        } else {
            $('#end').css('backgroundColor', '#fadfe4');
        }
    });

    $('#name').on('input',()=> {
        $('#name').css('borderColor', '#E9ECEF');
    });

    $('#date').on('input',()=>{
        $('#date').css('borderColor', '#E9ECEF');
    });

    $('#users').on('input',()=>{
        let allUsers = document.querySelectorAll('.addUser article[data-user-id]');
        for (let  i = 0; i < allUsers.length; i++){
            allUsers[i].style.display = "block";
        }
        let hasUsers = [];
        let notUsers = [];
        for (let  i = 0; i < allUsers.length; i++){
            let itemName = allUsers[i].lastChild.firstChild;
            itemName = itemName.textContent;
            itemName = itemName.substr(0, itemName.length - 3);
            let search = $('#users').val().toUpperCase();
            if (itemName.toUpperCase().indexOf(search) + 1) {
                hasUsers.push(allUsers[i])
            } else {
                notUsers.push(allUsers[i])
            }
        }
        for (let j = 0; j < notUsers.length; j++){
            notUsers[j].style.display = "none";
        }
        for (let  i = 0; i < allUsers.length; i++){
            document.querySelector('.addUser').removeChild(allUsers[i])
        }
        let finalUsers = hasUsers.concat(notUsers);
        for (let  i = 0; i < finalUsers.length; i++) {
            document.querySelector('.addUser').appendChild(finalUsers[i])
        }
    });

    $(window).resize(()=> {
        if (check[0]) {
            check[1].style.backgroundColor = "";
            $(".update_block").css("display", "none").animate({opacity: 1}, 200);
        }
            if(document.querySelector('#global_wrapper').offsetWidth > 660) {
            if (document.querySelector('#global_wrapper').classList.contains('mobile')){
                    document.querySelector('#global_wrapper').classList.remove('mobile')
            }
            if (!document.querySelector('#global_wrapper').classList.contains('desctop')){
                document.querySelector('#global_wrapper').classList.add('desctop')
            }
            $('.scrollable_section').scrollLeft(0);
            update_time_now(globalDate);
            let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
            let arr_name = document.querySelectorAll('.room_name');
            for (let i = 0; i < arr_floor.length; i++) {
                arr_floor[i].style.left = 0;
            }
            for (let i = 0; i < arr_name.length; i++) {
                arr_name[i].style.left = 0;
            }
        } else {
                if (document.querySelector('#global_wrapper').classList.contains('desctop')){
                    document.querySelector('#global_wrapper').classList.remove('desctop')
                }
                if (!document.querySelector('#global_wrapper').classList.contains('mobile')){
                    document.querySelector('#global_wrapper').classList.add('mobile')
                }
            $('.scrollable_section').scrollLeft(0);
            update_time_now(globalDate);
            let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
            let arr_name = document.querySelectorAll('.room_name');
            for (let i = 0; i < arr_floor.length; i++) {
                arr_floor[i].style.left = "16px";
            }
            for (let i = 0; i < arr_name.length; i++) {
                arr_name[i].style.left = "16px";
            }
        }
    });

    $('.scrollable_section_y').scroll(()=> {

        if (check[0]) {
            check[1].style.backgroundColor = "";
            $(".update_block").css("display", "none").animate({opacity: 1}, 200);
        }
    });


    $('.scrollable_section').scroll(()=>{

        if (check[0]) {
            check[1].style.backgroundColor = "";
            $(".update_block").css("display", "none").animate({opacity: 1}, 200);
        }
        let padding = $('.scrollable_section').scrollLeft();

        let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
        let arr_name = document.querySelectorAll('.room_name');
        for (let i = 0; i < arr_floor.length; i++) {
            arr_floor[i].style.left = padding + 16 + "px";
        }
        if (padding > 181) {
            for (let i = 0; i < arr_name.length; i++) {
                arr_name[i].style.left = padding + 16 + "px";
                arr_name[i].classList.add('scrolling_room_name');
            }
        } else {
            for (let i = 0; i < arr_name.length; i++) {
                arr_name[i].style.left = 16 + "px";
                arr_name[i].classList.remove('scrolling_room_name');
            }
        }

    });


    $(".create_event").click(()=> {
        $('#start').css('borderColor', '#E9ECEF');
        $('#end').css('borderColor', '#E9ECEF');
        $('#start').css('backgroundColor', 'white');
        $('#end').css('backgroundColor', 'white');
        $('#users').css('borderColor', '#E9ECEF');
        $('#date').css('borderColor', '#E9ECEF');
        $('#name').css('borderColor', '#E9ECEF');
        $('#rooms').css('borderColor', '');

        createRooms();
        setInfoForCreate();
        let idNow = 0;
        for (let i = 0; i < events2.length; i++){
            idNow = idNow + +events2[i].id
        }
        document.querySelector('.update_blank').dataset.eventId = idNow;
        events2.push({
            id: idNow,
            title: '',
            dateStart: '',
            dateEnd: '',
            users: [],
            room: {id: ''}
        });
        $('#rooms').css('display', 'block');
        $('label[for="rooms"]').css('display', 'block');
        $('#room').css('display', 'none');
        $('label[for="room"]').css('display', 'none');
        $('.scrollable_section').css('display', "none");
        $('.update_event_wrapper').css('display', 'block');
        $('.create_event').css('display', 'none');
        $('.date_now').css('display', 'none');
        $(".update_block").css("display", "none").animate({opacity: 1}, 200);
        removeUsers();
        createUsers(users, false);
    });

    let createRooms = ()=>{
      document.querySelector('#rooms').innerHTML = '';
      for (let i = 0; i < rooms.length; i++){
          let room = document.createElement('section');
          room.classList.add('roomInRooms');
          room.dataset.roomId = rooms[i].id;
          room.dataset.roomCapacity = rooms[i].capacity;
          room.innerHTML =
              `
              <article>12:00—13:00</article>
              <article>${rooms[i].title} · ${rooms[i].floor} этаж</article>
              `
          document.querySelector('#rooms').appendChild(room);
      }
    };

    let setInfoForCreate = ()=>{
        document.querySelector('.update_event h1').innerHTML = 'Новая встреча';
        if (!document.querySelector('.update_event').classList.contains('create_new_event')){
            document.querySelector('.update_event').classList.add('create_new_event');
            document.querySelector('footer').classList.add('create_new_event');
        }
        document.querySelector('footer>div:first-of-type').style.left = "524px";
        document.querySelector('footer>div:nth-of-type(2)').style.display = 'none';
        document.querySelector('footer>div:nth-of-type(3)').style.display = 'block';
        document.querySelector('footer>div:last-of-type').style.display = 'none';
        document.querySelector('#name').value = '';
        document.querySelector('#date').value = '';
        document.querySelector('#start').value = '';
        document.querySelector('#end').value = '';
    };

    document.querySelector('.users_list>section').addEventListener('mousedown', (e)=>{
        let event = e.target;
        let getParent = function (event) {
            if (event.nodeName === 'ARTICLE'){
                return event;
            }
            return getParent(event.parentElement);
        };
        if (event.nodeName !== 'ARTICLE'){
            event = getParent(event);
        }

        let id = document.querySelector('.update_blank').dataset.eventId;
        let event2 = '';
        for (let i = 0; i < events2.length; i++){
            if (events2[i].id == id){
                event2 = events2[i]
            }
        }

            addToEvent(event, event2);
            removeUsers();
            createUsers(users, event2);

        let timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        if (timeReg.test($('#end').val()) && timeReg.test($('#start').val())) {
            $('#end').css('backgroundColor', 'white');
            if (!timeReg.test($('#start').val())) {
                $('#start').css('backgroundColor', '#fadfe4');
            } else {

                let mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                let day = $('#date').val().split(" ")[0];
                let mounth = $('#date').val().split(" ")[1].substr(0, $('#date').val().split(" ")[1].length - 1);
                for (let i = 0; i < mounths.length; i++) {
                    if (mounth == mounths[i]) {
                        mounth = +i;
                    }
                }
                let year = +$('#date').val().split(" ")[2];
                let eventStartHours = +$('#start').val().split(":")[0];
                let eventStartMinutes = +$('#start').val().split(":")[1];
                let start = new Date(year, mounth, day, eventStartHours, eventStartMinutes, 0);
                let now = new Date();
                if (Date.parse(start) < Date.parse(now) - 60000) {
                    $('#start').css('backgroundColor', '#fadfe4');
                } else {

                    let eventEndHours = +$('#end').val().split(":")[0];
                    let eventEndMinutes = +$('#end').val().split(":")[1];
                    let end = new Date(year, mounth, day, eventEndHours, eventEndMinutes, 0);
                    if (Date.parse(end) <= Date.parse(start)) {
                        $('#end').css('backgroundColor', '#fadfe4');
                    } else {
                        let dateForRecomend = {
                            start: start,
                            end: end
                        };

                        let members;

                        getRecomendation(dateForRecomend, members, rooms, users);
                    }
                }
            }
        }

    });



    $(".selected_users").click((e)=>{
        let event = e.target;
        if (event.classList.contains('delete_user')) {
            let getParent = function (event) {
                return event.parentElement || event.parentNode;
            };
            let article = getParent(event);
            let id = document.querySelector('.update_blank').dataset.eventId;
            let event2 = '';
            for (let i = 0; i < events2.length; i++) {
                if (events2[i].id == id) {
                    event2 = events2[i]
                }
            }
            removeFromEvent(article, event2);
            removeUsers();
            createUsers(users, event2);
            let timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
            if (timeReg.test($('#end').val()) && timeReg.test($('#start').val())) {
                $('#end').css('backgroundColor', 'white');
                if (!timeReg.test($('#start').val())) {
                    $('#start').css('backgroundColor', '#fadfe4');
                } else {

                    let mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                    let day = $('#date').val().split(" ")[0];
                    let mounth = $('#date').val().split(" ")[1].substr(0, $('#date').val().split(" ")[1].length - 1);
                    for (let i = 0; i < mounths.length; i++) {
                        if (mounth == mounths[i]) {
                            mounth = +i;
                        }
                    }
                    let year = +$('#date').val().split(" ")[2];
                    let eventStartHours = +$('#start').val().split(":")[0];
                    let eventStartMinutes = +$('#start').val().split(":")[1];
                    let start = new Date(year, mounth, day, eventStartHours, eventStartMinutes, 0);
                    let now = new Date();
                    if (Date.parse(start) < Date.parse(now) - 60000) {
                        $('#start').css('backgroundColor', '#fadfe4');
                    } else {

                        let eventEndHours = +$('#end').val().split(":")[0];
                        let eventEndMinutes = +$('#end').val().split(":")[1];
                        let end = new Date(year, mounth, day, eventEndHours, eventEndMinutes, 0);
                        if (Date.parse(end) <= Date.parse(start)) {
                            $('#end').css('backgroundColor', '#fadfe4');
                        } else {
                            let dateForRecomend = {
                                start: start,
                                end: end
                            };

                            let members;

                            getRecomendation(dateForRecomend, members, rooms, users);
                        }
                    }
                }
            }
        }
    });



    $('#users').focus(()=>{
        $('.users_list').css("display", "block").animate({opacity: 1}, 200);
        $(".addUser").niceScroll({
            cursorcolor: "#D5DFE9",
            cursorwidth: "8px",
            cursoropacitymin: 1,
            scrollspeed: 60,
            mousescrollstep: 6,
            autohidemode: false
        });
    });

    $('#users').focusout(()=>{
        $('.users_list').animate({opacity: 0}, 0, ()=>{
                $('.users_list').css("display", "none");
                $('#users').val('');
            })

    });


});
/*------------------------------time_now--------------------------------------------------*/

let update_time = ()=>{
    let time = Date.now();
    let date = new Date();
    date.setTime(time);
    let now = (date.getHours() * 60) + date.getMinutes();
    document.querySelector('.absolutely').style.opacity = '1';
    document.querySelector('.absol').style.opacity = '1';
    if (now >= 480 && now <=1380){
        now = now - 480;
        document.querySelector('.absolutely').style.left = now * 1.1 + "px";
        document.querySelector('.absolutely').style.display = "block";
        let padding = document.querySelector('.absolutely').offsetLeft;
        let padd = document.querySelector('aside').offsetWidth;
        document.querySelector('.absol').style.left = padding - 24 + +padd + "px";
        document.querySelector('.absol').style.display = "block";
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10 ){
            minutes = "0" + minutes;
        }
        document.querySelector('.absol').innerHTML = hours + ":" + minutes;
    } else if(now > 1380){
        document.querySelector('.absolutely').style.left = 900 * 1.1 + "px";
        document.querySelector('.absolutely').style.display = "block";
        let padding = document.querySelector('.absolutely').offsetLeft;
        let padd = document.querySelector('aside').offsetWidth;
        document.querySelector('.absol').style.left = padding - 24 + +padd + "px";
        document.querySelector('.absol').style.display = "block";
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10 ){
            minutes = "0" + minutes;
        }
        document.querySelector('.absol').innerHTML = hours + ":" + minutes;
    }  else {
        document.querySelector('.absolutely').style.left = 0 * 1.1 + "px";
        document.querySelector('.absolutely').style.display = "block";
        let padding = document.querySelector('.absolutely').offsetLeft;
        let padd = document.querySelector('aside').offsetWidth;
        document.querySelector('.absol').style.left = padding - 24 + +padd + "px";
        document.querySelector('.absol').style.display = "block";
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10 ){
            minutes = "0" + minutes;
        }
        document.querySelector('.absol').innerHTML = hours + ":" + minutes;
    }

};

/*---------------------------disable_time-----------------------------------------*/

let update_time_now =(globalDate)=>{
    let now = new Date();
    let day_now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0);

    if (Date.parse(globalDate) == Date.parse(day_now)) {
        globalDate = new Date();
        updateGlobalDate(globalDate);
        if ($('.update_event_wrapper').is(':hidden')) {
            let times = document.querySelectorAll('.dis_time');
            update_time();
            let abs_padd = document.querySelector('.absolutely').offsetLeft;
            let glob_padd = document.querySelector('#global_wrapper').getBoundingClientRect().left;
            let padd = abs_padd;
            for (let i = 0; i < times.length; i++) {
                times[i].style.width = padd + "px";
            }
            let empty_times = document.querySelectorAll('.empty_time');
            for (let i = 0; i < empty_times.length; i++) {
                let left = empty_times[i].getBoundingClientRect().left;
                let right = empty_times[i].getBoundingClientRect().right;
                let padd2 = document.querySelector('.absolutely').getBoundingClientRect().left;
                let width = right - left;
                if ((right - padd2) < 16.5) {
                    empty_times[i].style.zIndex = '-1';
                }
                if (empty_times[i].offsetLeft < padd) {
                    empty_times[i].style.backgroundPosition = (width / 2 + (padd2 - left) / 2 - 5) + "px"
                }
            }
            let close_times = document.querySelectorAll('.close_time');
            for (let i = 0; i < close_times.length; i++) {
                let right = close_times[i].getBoundingClientRect().right;
                let padd2 = document.querySelector('.absolutely').getBoundingClientRect().left;
                if ((padd2 - right) >= 0) {
                    close_times[i].dataset.finished = '1';

                }
            }
        }
    } else if (Date.parse(globalDate) < Date.parse(day_now)) {

        document.querySelector('.absolutely').style.left = 900 * 1.1 + "px";
        document.querySelector('.absolutely').style.opacity = '0';
        document.querySelector('.absolutely').style.display = "block";
        let padding = document.querySelector('.absolutely').offsetLeft;
        let padd = document.querySelector('aside').offsetWidth;
        document.querySelector('.absol').style.left = padding - 24 + +padd + "px";
        document.querySelector('.absol').style.opacity = '0';
        document.querySelector('.absol').style.display = "block";
        let times = document.querySelectorAll('.dis_time');
        for (let i = 0; i < times.length; i++) {
            times[i].style.width = '100%';
        }
        let close_times = document.querySelectorAll('.close_time');
        for (let i = 0; i < close_times.length; i++) {
            let right = close_times[i].getBoundingClientRect().right;
            let padd2 = document.querySelector('.absolutely').getBoundingClientRect().left;
            if ((padd2 - right) >= 0) {
                close_times[i].dataset.finished = '1';

            }
        }

    } else {
        document.querySelector('.absolutely').style.left = 0 * 1.1 + "px";
        document.querySelector('.absolutely').style.opacity = '0';
        document.querySelector('.absolutely').style.display = "block";
        let padding = document.querySelector('.absolutely').offsetLeft;
        let padd = document.querySelector('aside').offsetWidth;
        document.querySelector('.absol').style.left = padding - 24 + +padd + "px";
        document.querySelector('.absol').style.opacity = '0';
        document.querySelector('.absol').style.display = "block";

        document.querySelector('.absol').innerHTML = 8 + ":" + "00";
    }
};
/*------------------------------calendar------------------------------------------------*/

Date.prototype.getDaysInMonth = function(){
    return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate();
};

let setCalendar = (set_date)=>{
    let date = new Date(set_date.getFullYear(), set_date.getMonth() - 1, 1);
    let months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ];

    for (let k = 1; k < 4; k++){
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        document.querySelector(`.calendar_container>article:nth-of-type(${k})`).dataset.year = year;
        document.querySelector(`.calendar_container>article:nth-of-type(${k})`).dataset.month = month;
        let new_date = new Date(year, month, 1);
        document.querySelector(`.calendar_container>article:nth-of-type(${k})>.month`).innerHTML = months[new_date.getMonth()] + " · " + year;
        let first_day = new_date.getDay();

        let day_date = 1;
        for (let i = 2; i < 7; i++){
            for (let j = 1; j < 8; j++){

                let cell = document.querySelector(`.calendar_container>article:nth-of-type(${k})>table>tbody>tr:nth-of-type(${i})>td:nth-of-type(${j})`)
                if (i == 2 && j < first_day){
                    cell.style.backgroundColor = '#e2e2e6';
                    cell.dataset.disable = 1;
                } else if(day_date < date.getDaysInMonth() + 1){
                    cell.innerHTML = day_date;
                    cell.dataset.date = year + ',' + month + ',' + day_date;
                    day_date++;
                } else {
                    cell.style.backgroundColor = '#e2e2e6';
                    cell.dataset.disable = 1;
                }

            }
        }
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
}




/*------------------------------times_of_events-------------------------------------------*/

let updateTimesOfEvents = (events, rooms)=>{
    let room_events = [];
    for (let i = 0; i < rooms.length; i++){
        let div_dis = document.createElement('div');
        div_dis.classList.add('dis_time');
        div_dis.style.height = '100%';
        div_dis.style.backgroundColor = "#D5DFE9";
        div_dis.style.position = 'absolute';
        div_dis.style.zIndex = '500';
        div_dis.style.left = '0';
        document.querySelectorAll('.events_time')[i].appendChild(div_dis);
        room_events.push([]);
        for (let j = 0; j < events.length; j++){
            if (events[j].room.id == i + 1) {
                room_events[i].push({
                    id: events[j].id,
                    users: events[j].users,
                    title: events[j].title,
                    start: events[j].dateStart,
                    end: events[j].dateEnd
                });
            }
        }
    }

    for (let o = 0; o < room_events.length; o++) {

        let roomsOfFloor = room_events[o];

        roomsOfFloor.sort((a, b)=>{
            let dateStart_a = Date.parse(a.start);
            let dateStart_b = Date.parse(b.start);
            if (dateStart_a < dateStart_b){
                return -1
            }
            if (dateStart_a > dateStart_b){
                return 1
            }
            return 0;
        });
        if(roomsOfFloor.length === 0){
            let width = (900) * 1.1;
            let div0 = document.createElement('div');
            div0.classList.add('empty_time');
            div0.style.width = width + "px";
            document.querySelector(`.events_time[data-room-id="${o + 1}"]`).appendChild(div0);

        }
        let counter = 480;
        for (let i = 0; i < roomsOfFloor.length; i++) {
                let start = new Date;
                let end = new Date;
                let dateStart = Date.parse(roomsOfFloor[i].start);
                start.setTime(dateStart);
                let day = start.getDate();
                let mounth = start.getMonth();
                let dateEnd = Date.parse(roomsOfFloor[i].end);
                end.setTime(dateEnd);
                start = (start.getHours() * 60) + start.getMinutes();

                end = (end.getHours() * 60) + end.getMinutes();

                if (start >= 480 && start < 1380) {
                    let width = (start - counter) * 1.1;
                    let div = document.createElement('div');
                    div.classList.add('empty_time');
                    div.style.width = width + "px";
                    document.querySelector(`.events_time[data-room-id="${o + 1}"]`).appendChild(div);
                    let width2 = (end - start) * 1.1;
                    counter = end;
                    let div2 = document.createElement('div');
                    div2.classList.add('close_time');
                    div2.style.border = '1px solid #6e8eae';
                    div2.style.boxSizing = 'border-box';
                    div2.dataset.eventTitle = roomsOfFloor[i].title;
                    div2.dataset.mounth = mounth;
                    div2.dataset.day = day;
                    div2.dataset.id = roomsOfFloor[i].id;
                    div2.dataset.roomId = o + 1;
                    let hours = (start - start%60)/60;
                    let minutes = start%60;
                    if (minutes < 10){
                        minutes = "0" + minutes;
                    }
                    div2.dataset.start = hours + ':' + minutes;
                    hours = (end - end%60)/60;
                    minutes = end%60;
                    if (minutes < 10){
                        minutes = "0" + minutes;
                    }
                    div2.dataset.end = hours + ':' + minutes;
                    let users = '';
                    for (let k = 0; k < roomsOfFloor[i].users.length; k++){
                        if (k == roomsOfFloor[i].users.length - 1){
                            users = users + roomsOfFloor[i].users[k].id;
                        }else{
                            users = users + roomsOfFloor[i].users[k].id + ',';
                        }

                    }
                    div2.dataset.usersId = users;
                    div2.style.width = width2 + "px";
                    document.querySelector(`.events_time[data-room-id="${o + 1}"]`).appendChild(div2);
                    if (i === roomsOfFloor.length - 1) {
                        let width3 = (1380 - counter) * 1.1;
                        let div3 = document.createElement('div');
                        div3.classList.add('empty_time');
                        div3.style.width = width3 + "px";
                        document.querySelector(`.events_time[data-room-id="${o + 1}"]`).appendChild(div3);
                    }
                }

                else {

                }

        }
    }

};
/*-----------------------send_update---------------------------------------------------*/
let sendAndUpdate = async (ask,sendData, sendDataNew, globalDate) => {
    if (ask) {
        await $.ajax({
            type: 'POST',
            url: '/graphql',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(sendDataNew),
            dataType: "json",
            success: (data) => {
                events2 = data.data.events;

            }
        });
    } else {

        await $.ajax({
            type: 'POST',
            url: '/graphql',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(sendData),
            dataType: "json",
            success: (data) => {
                events2 = data.data.events;

            }
        });
    }
    await getEventsFromDB(globalDate);
    await updateRoomsList(rooms);
    await updateTimesOfEvents(events2, rooms);

    $('.create_event').css('display', 'block');
    $('.scrollable_section').css('display', "block");
    $('.update_event_wrapper').css('display', 'none');
    $('.date_now').css('display', 'block');
    if (document.querySelector('#global_wrapper').offsetWidth > 660) {
        $('.scrollable_section').scrollLeft(0);
        update_time_now(globalDate);
        let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
        let arr_name = document.querySelectorAll('.room_name');
        for (let i = 0; i < arr_floor.length; i++) {
            arr_floor[i].style.left = 0;
        }
        for (let i = 0; i < arr_name.length; i++) {
            arr_name[i].style.left = 0;
        }
    } else {
        $('.scrollable_section').scrollLeft(0);
        update_time_now(globalDate);
        let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
        let arr_name = document.querySelectorAll('.room_name');
        for (let i = 0; i < arr_floor.length; i++) {
            arr_floor[i].style.left = "16px";
        }
        for (let i = 0; i < arr_name.length; i++) {
            arr_name[i].style.left = "16px";
        }
    }
    if (ask){
        $('.background_modal').css('display', 'block');
        $('.succes_creating').css('display', 'block');
    } else {
        $('.background_modal').css('display', 'block');
        $('.succes_updating').css('display', 'block');
    }

};

    let removeEvent = async (sendData, globalDate)=>{
        await $.ajax({
            type: 'POST',
            url: '/graphql',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(sendData),
            dataType: "json",
            success: (data) => {
                events2 = data.data.events;

            }
        });
        await getEventsFromDB(globalDate);
        await updateRoomsList(rooms);
        await updateTimesOfEvents(events2, rooms);

        $('.create_event').css('display', 'block');
        $('.scrollable_section').css('display', "block");
        $('.update_event_wrapper').css('display', 'none');
        $('.date_now').css('display', 'block');
        if (document.querySelector('#global_wrapper').offsetWidth > 660) {
            $('.scrollable_section').scrollLeft(0);
            update_time_now(globalDate);
            let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
            let arr_name = document.querySelectorAll('.room_name');
            for (let i = 0; i < arr_floor.length; i++) {
                arr_floor[i].style.left = 0;
            }
            for (let i = 0; i < arr_name.length; i++) {
                arr_name[i].style.left = 0;
            }
        } else {
            $('.scrollable_section').scrollLeft(0);
            update_time_now(globalDate);
            let arr_floor = document.querySelectorAll('aside>ul>li>ul>li:first-of-type');
            let arr_name = document.querySelectorAll('.room_name');
            for (let i = 0; i < arr_floor.length; i++) {
                arr_floor[i].style.left = "16px";
            }
            for (let i = 0; i < arr_name.length; i++) {
                arr_name[i].style.left = "16px";
            }
        }
    }

/*-----------------------------------------------------------------*/

$('#rooms>p').click(async (e)=>{

});

/*--------------------------get_recomendation----------------------*/

let getRecomendation = async (date, members, rooms, users)=>{
    let dateForSearch = new Date(date.start.getFullYear(), date.start.getMonth(), date.start.getDate(), 3, 0, 0);
    let itemsEvents = [];
    let itemRooms = [];
    for (let i = 0; i < rooms.length; i++){
        itemRooms.push(rooms[i]);
    }
    dateForSearch = dateForSearch.toISOString();

    await $.ajax({
        type: 'GET',
        url: `/graphql?query={events(dateDay: "${dateForSearch}"){id, title, dateStart, dateEnd, users{id},room{id}}}`,
        dataType: "json",
        success: (data)=>{
            let date = new Date(Date.parse(dateForSearch));
            events = data.data.events;
            let sortDataStart;
            let sortDataEnd;
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            sortDataStart = new Date(year, month, day, 8, 0, 0);
            sortDataEnd = new Date(year, month, day, 23, 0, 0);
            for (let i = 0; i < events.length; i++){
                let itemDateStart = Date.parse(events[i].dateStart);
                let itemDateEnd = Date.parse(events[i].dateEnd);
                if ((itemDateStart >= sortDataStart && itemDateStart <= sortDataEnd) && (itemDateEnd >= sortDataStart && itemDateEnd <= sortDataEnd) ){
                    itemsEvents.push(events[i]);
                }
            }

        }
    });
    for (let k = 0; k < itemRooms.length; k++) {
        let roomId = itemRooms[k].id;
        let room_events = [];
        for (let j = 0; j < itemsEvents.length; j++) {
            if (itemsEvents[j].room.id == roomId) {

                room_events.push({
                    id: itemsEvents[j].id,
                    users: itemsEvents[j].users,
                    title: itemsEvents[j].title,
                    start: itemsEvents[j].dateStart,
                    end: itemsEvents[j].dateEnd
                });
            }
        }

        for (let i = 0; i < room_events.length; i++) {
            if (room_events[i].id !== document.querySelector('.update_blank').dataset.eventId){
                let startOfEvent = Date.parse(date.start);
                let endOfEvent = Date.parse(date.end);
                let startOfItem = Date.parse(room_events[i].start);
                let endOfItem = Date.parse(room_events[i].end);
                let start1 = startOfEvent;
                let end1 = endOfEvent - 60000;
                let start2 = startOfItem;
                let end2 = endOfItem;
                if (((start1 < start2) || (start1 > end2 - 60000))
                    && ((end1 < start2) || (end1 > end2))
                    && ((start2 < start1) || (start2 > end1))) {

                } else {
                    itemRooms[k] = false;
                }
            }
        }
    }
    let usersFloors = [];
    for (let i = 0; i < document.querySelector('.selected_users').childNodes.length; i++){
        usersFloors.push(document.querySelector('.selected_users').childNodes[i].dataset.userFloor);
    }

    itemRooms.sort((a, b)=>{
        let firstFloor = a.floor;
        let secondFloor = b.floor;
        let sumA = 0;
        let sumB = 0;
        for (let j = 0; j < usersFloors.length; j++){
            sumA = sumA + (Math.abs(firstFloor - usersFloors[j]));
            sumB = sumB + (Math.abs(secondFloor - usersFloors[j]));
        }
        if (sumA < sumB){
            return -1
        }
        if (sumA > sumB){
            return 1
        }
        return 0;
    });

    document.querySelector('#rooms').innerHTML = '';
    for (let i = 0; i < itemRooms.length; i++){
        if (itemRooms[i]) {
            if (itemRooms[i].capacity >= document.querySelector('.selected_users').childNodes.length) {
                let room = document.createElement('section');
                room.classList.add('roomInRooms');
                room.dataset.roomId = rooms[i].id;
                room.dataset.roomCapacity = rooms[i].capacity;
                room.innerHTML =
                    `
              <article>${$('#start').val()}—${$('#end').val()}</article>
              <article>${itemRooms[i].title} · ${itemRooms[i].floor} этаж</article>
              `
                document.querySelector('#rooms').appendChild(room);
            }
        }
    }
    if (document.querySelector('#rooms').childNodes.length < 1){
        $('label[for="room"]').css('display', 'none');
        $('#room').css('display', 'none');
        $('#rooms').css('display', 'block');
        $('label[for="rooms"]').css('display', 'block');
        let eventsOnInterval = [];
        for (let i = 0; i < itemsEvents.length; i++) {
            let start = Date.parse(itemsEvents[i].dateStart);
            let end = Date.parse(itemsEvents[i].dateEnd);

            if ((date.start >= start - 360000) && (end  >= date.end - 360000)) {
                eventsOnInterval.push(itemsEvents[i]);
            }
        }

        console.log(eventsOnInterval);

                for (let k = 0; k < rooms.length; k++) {
                    let roomId = rooms[k].id;
                    let room_events = [];
                    for (let j = 0; j < itemsEvents.length; j++) {
                        if (itemsEvents[j].room.id == roomId) {

                            room_events.push({
                                id: itemsEvents[j].id,
                                users: itemsEvents[j].users,
                                title: itemsEvents[j].title,
                                start: itemsEvents[j].dateStart,
                                end: itemsEvents[j].dateEnd
                            });
                        }
                    }

                    for (let l = 0; l < eventsOnInterval.length; l++) {
                        let ask = true;
                        for (let i = 0; i < room_events.length; i++) {
                                let startOfEvent = Date.parse(eventsOnInterval[l].dateStart);
                                let endOfEvent = Date.parse(eventsOnInterval[l].dateEnd);
                                let startOfItem = Date.parse(room_events[i].start);
                                let endOfItem = Date.parse(room_events[i].end);
                                let start1 = startOfEvent;
                                let end1 = endOfEvent - 60000;
                                let start2 = startOfItem;
                                let end2 = endOfItem;
                                if (((start1 < start2) || (start1 > end2 - 60000))
                                    && ((end1 < start2) || (end1 > end2))
                                    && ((start2 < start1) || (start2 > end1))) {

                            } else {
                                    ask = false
                            }
                        }
                        if (ask) {
                            if (rooms[k].capacity >= eventsOnInterval[l].users.length) {
                                let room;
                                for (let p = 0; p < rooms.length; p++) {
                                    if (rooms[p].id == eventsOnInterval[l].room.id) {
                                        room = rooms[p]
                                    }
                                }
                                if (room.capacity >= document.querySelector('.selected_users').childNodes.length) {
                                    document.querySelector('#rooms').innerHTML = document.querySelector('#rooms').innerHTML + `<p class="forSending" data-event-id="${eventsOnInterval[l].id}" data-room-id="${rooms[k].id}">Перенести встречу «${eventsOnInterval[l].title}» в комнату «${rooms[k].title}»</p>`
                                }
                            }
                        }
                    }
                }
    }
    if (document.querySelector('#rooms').childNodes.length < 1){
        let eventsInInterval = [];
        for (let i = 0; i < itemsEvents.length; i++) {
            let start = Date.parse(itemsEvents[i].dateStart);
            let end = Date.parse(itemsEvents[i].dateEnd);

            if ((start > date.start && start < date.end) || (end > date.start && end < date.end)) {
                eventsInInterval.push(itemsEvents[i]);
            }
        }

        console.log(eventsInInterval);

        for (let k = 0; k < rooms.length; k++) {
            let roomId = rooms[k].id;
            let room_events = [];
            for (let j = 0; j < itemsEvents.length; j++) {
                if (itemsEvents[j].room.id == roomId) {

                    room_events.push({
                        id: itemsEvents[j].id,
                        users: itemsEvents[j].users,
                        title: itemsEvents[j].title,
                        start: itemsEvents[j].dateStart,
                        end: itemsEvents[j].dateEnd
                    });
                }
            }

            for (let l = 0; l < eventsInInterval.length; l++) {
                let ask = true;
                for (let i = 0; i < room_events.length; i++) {
                    let startOfEvent = Date.parse(eventsInInterval[l].dateStart);
                    let endOfEvent = Date.parse(eventsInInterval[l].dateEnd);
                    let startOfItem = Date.parse(room_events[i].start);
                    let endOfItem = Date.parse(room_events[i].end);
                    let start1 = startOfEvent;
                    let end1 = endOfEvent - 60000;
                    let start2 = startOfItem;
                    let end2 = endOfItem;
                    if (((start1 < start2) || (start1 > end2 - 60000))
                        && ((end1 < start2) || (end1 > end2))
                        && ((start2 < start1) || (start2 > end1))) {

                    } else {
                        ask = false
                    }
                }
                if (ask) {
                    if (rooms[k].capacity >= eventsInInterval[l].users.length) {
                        let room;
                        for (let p = 0; p < rooms.length; p++) {
                            if (rooms[p].id == eventsInInterval[l].room.id) {
                                room = rooms[p]
                            }
                        }
                        let eventsOnItemRoom = [];
                        for (let f = 0; f < itemsEvents.length; f++){
                            if (itemsEvents[f].room.id == room.id){
                                eventsOnItemRoom.push(itemsEvents[f])
                            }
                        }

                        let askNow = true;

                        for (let i = 0; i < eventsOnItemRoom.length; i++) {
                            if (eventsOnItemRoom[i].id !== eventsInInterval[l].id) {
                                let startOfEvent = Date.parse(date.start);
                                let endOfEvent = Date.parse(date.end);
                                let startOfItem = Date.parse(eventsOnItemRoom[i].dateStart);
                                let endOfItem = Date.parse(eventsOnItemRoom[i].dateEnd);
                                let start1 = startOfEvent;
                                let end1 = endOfEvent - 60000;
                                let start2 = startOfItem;
                                let end2 = endOfItem;
                                if (((start1 < start2) || (start1 > end2 - 60000))
                                    && ((end1 < start2) || (end1 > end2))
                                    && ((start2 < start1) || (start2 > end1))) {

                                } else {
                                    askNow = false;
                                }
                            }
                        }

                        if (room.capacity >= document.querySelector('.selected_users').childNodes.length && askNow) {
                            document.querySelector('#rooms').innerHTML = document.querySelector('#rooms').innerHTML + `<p class="forSending" data-event-id="${eventsInInterval[l].id}" data-room-id="${rooms[k].id}">Перенести встречу «${eventsInInterval[l].title}» в комнату «${rooms[k].title}»</p>`
                        }
                    }
                }
            }
        }


    }
};

/*-----------------------------------------------------------------*/
let updateGlobalDate = (date)=>{
    let day = date.getDate();
    let mounth = date.getMonth();
    let mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    let mounthName = mounths[mounth].substr(0,3);
    let year = date.getFullYear();
    let i = new Date();
    let now = new Date(i.getFullYear(), i.getMonth(), i.getDate(), 3, 0, 0);
    let lastText;
    if (date.getFullYear() == now.getFullYear()
        && date.getMonth() == now.getMonth()
        && date.getDate() - now.getDate() == '1'){
        lastText = "завтра"
    } else if (date.getFullYear() == now.getFullYear()
        && date.getMonth() == now.getMonth()
        && now.getDate() - date.getDate() == '1'){
        lastText = 'вчера'
    } else if (date.getFullYear() == now.getFullYear()
        && date.getMonth() == now.getMonth()
        && now.getDate() == date.getDate()){
        lastText = 'сегодня';
    } else {
        lastText = year;
    }



    document.querySelector('.date_now .date').innerHTML = `${day} ${mounthName}  · ${lastText}`;
    document.querySelector('.date_now .date').dataset.day = day;
    document.querySelector('.date_now .date').dataset.month = mounth;
    document.querySelector('.date_now .date').dataset.year = year;
};
let getUsersFromDB = async function () {
    await $.ajax({
        type: 'GET',
        url: '/graphql?query={users{id, login, homeFloor, avatarUrl}}',
        dataType: "json",
        success: (data)=>{
            users = data.data.users;
        }
    });
};

let getRoomsFromDB = async function () {

    await $.ajax({
        type: 'GET',
        url: '/graphql?query={rooms{id, title, capacity, floor}}',
        dataType: "json",
        success: (data)=>{
            rooms = data.data.rooms;

        }
    });
};

let getEventsFromDB = async function (date) {
    date = date.toISOString();
    await $.ajax({
        type: 'GET',
        url: `/graphql?query={events(dateDay: "${date}"){id, title, dateDay, dateStart, dateEnd, users{id},room{id}}}`,
        dataType: "json",
        success: (data)=>{
            date = new Date(date);

            events2 = [];
            events = data.data.events;
            let sortDataStart;
            let sortDataEnd;
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            sortDataStart = new Date(year, month, day, 8, 0, 0);
            sortDataEnd = new Date(year, month, day, 23, 0, 0);
            for (let i = 0; i < events.length; i++){
                let itemDateStart = Date.parse(events[i].dateStart);
                let itemDateEnd = Date.parse(events[i].dateEnd);
                if ((itemDateStart >= sortDataStart && itemDateStart <= sortDataEnd) && (itemDateEnd >= sortDataStart && itemDateEnd <= sortDataEnd) ){
                    events2.push(events[i])
                }
            }

        }
    });

};

/*-------------------------rooms_list-----------------------------------------------------*/

let updateRoomsList = (rooms)=>{
    let aside = document.querySelectorAll('aside>ul>li');
    for (let i = 0; i < aside.length; i++) {
        document.querySelector('aside>ul').removeChild(aside[i]);
    }
    let time_graphs = document.querySelectorAll('.time_of_events>section');
    for (let i = 0; i < time_graphs.length; i++) {
        document.querySelector('.time_of_events').removeChild(time_graphs[i]);
    }
    let floors_list = [];
    for (let i = 0; i < rooms.length; i++) {
        floors_list.push(rooms[i].floor)
    }
    function unique(arr) {
        let obj = {};

        for (let i = 0; i < arr.length; i++) {
            let str = arr[i];
            obj[str] = true;
        }

        return Object.keys(obj);
    }

    floors_list = unique(floors_list);
    for (let i = 0; i < floors_list.length; i++) {
        let roomsOfFloor = [];
        for (let j = 0; j < rooms.length; j++){
            if (rooms[j].floor == floors_list[i]){
                roomsOfFloor.push(rooms[j]);
            }
        }
        let li = document.createElement('li');
        let ul = document.createElement('ul');
        let li2 = document.createElement('li');
        li2.classList.add("room_floor");
        li2.innerHTML = `${floors_list[i]} этаж`;
        ul.classList.add("floor");
        ul.appendChild(li2);
        let section = document.createElement('section');
        section.classList.add(`times_floor_${floors_list[i]}`);
        for ( let k = 0; k < roomsOfFloor.length; k++){

            let events_time = document.createElement('div');
            events_time.classList.add('events_time');
            events_time.dataset.roomId = roomsOfFloor[k].id;
            section.appendChild(events_time);

            let li3 = document.createElement('li');
            let room_name = document.createElement('div');
            room_name.classList.add('room_name');
            room_name.innerHTML = `${roomsOfFloor[k].title}`;

            let room_capacity = document.createElement('div');
            room_capacity.classList.add('room_capacity');
            room_capacity.innerHTML = ` до ${roomsOfFloor[k].capacity} человек`;

            li3.appendChild(room_name);
            li3.appendChild(room_capacity);
            ul.appendChild(li3)
        }
        li.appendChild(ul);
        document.querySelector('aside>ul').appendChild(li);
        document.querySelector('.time_of_events').appendChild(section);
    }

};

/*----------------------------------------------------------------------------------------*/

let users = [];
let rooms = [];
let events = [];
let events2 = [];


let addToEvent = function (article, event) {
    let id = +article.dataset.userId;
    event.users.push({id: id});
};

let removeFromEvent = function (article, event) {
    for (let i = 0; i <event.users.length; i++) {
        if (event.users[i].id == article.dataset.userId) {
            event.users.splice(i, 1);
        }
    }

};
let removeUsers = function () {
    let list1 = document.querySelector('.selected_users');
    while (list1.firstChild){
        list1.removeChild(list1.firstChild);
    };
    let list2 = document.querySelector('.users_list>section');
    while (list2.firstChild){
        list2.removeChild(list2.firstChild);
    }
};

let createUsers = function(userList, event) {
    for (let i =0; i < userList.length; i++) {
        if (event === false) {
            let article = document.createElement('article');
            article.dataset.userId = userList[i].id;
            article.dataset.userFloor = userList[i].homeFloor;
            article.innerHTML =
            `<div class="user_img"></div>
             <div class="user_name">${userList[i].login} · <a class="user_floor">${userList[i].homeFloor} этаж</a></div>`;
            document.querySelector('.users_list>section').appendChild(article);
            document.querySelector(`article[data-user-id="${userList[i].id}"]>.user_img`).style.backgroundImage = `url(${userList[i].avatarUrl})`;
        } else {

            let hasInEvent = false;
            for (let j = 0; j < event.users.length; j++) {
                if (event.users[j].id == userList[i].id) {
                    hasInEvent = true;
                }
            }
            if (hasInEvent) {

                let article = document.createElement('article');
                article.dataset.userId = userList[i].id;
                article.dataset.userFloor = userList[i].homeFloor;
                article.innerHTML =
                    `<div class="selected_user_img"></div>
                 <div class="selected_user_name">${userList[i].login}</div>
                 <div class="delete_user"></div>`;
                document.querySelector('.selected_users').appendChild(article);
                document.querySelector(`article[data-user-id="${userList[i].id}"]>.selected_user_img`).style.backgroundImage = `url(${userList[i].avatarUrl})`;

            } else {
                let article = document.createElement('article');
                article.dataset.userId = userList[i].id;
                article.dataset.userFloor = userList[i].homeFloor;
                article.innerHTML =
                    `<div class="user_img"></div>
             <div class="user_name">${userList[i].login} · <a class="user_floor">${userList[i].homeFloor} этаж</a></div>`;
                document.querySelector('.users_list>section').appendChild(article);
                document.querySelector(`article[data-user-id="${userList[i].id}"]>.user_img`).style.backgroundImage = `url(${userList[i].avatarUrl})`;

            }
        }
    }
};