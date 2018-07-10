document.addEventListener('DOMContentLoaded', function() {

    createUsers(users);
/*-----------------------Listeners------------------------------------------------------*/




    $('.scrollable_section').scroll(()=>{
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
            addToEvent(event);
            removeUsers();
            createUsers(users);

    });



    $(".selected_users").click((e)=>{
        let event = e.target;
        if (event.classList.contains('delete_user')) {
            let getParent = function (event) {
                return event.parentElement || event.parentNode;
            };
            let article = getParent(event);
            removeFromEvent(article);
            removeUsers();
            createUsers(users);
        }
    });

    $('.new_event>footer>div:first-of-type, .close_round').click(function () {
        $('.new_event').animate({opacity: 1}, 50, ()=> {
            $(".new_event").css('display', 'none');
            $('.slicers').css("display", "block");
            $('.time_of_events').css("display", "block");
            $('.date_now').css("display", "block");
            $('.create_event').css("display", "block").animate({opacity: 1}, 200);
        });

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

/*----------------------------------------------------------------------------------------*/

let users = [
    {
        id: 1,
        name: 'Лекс Лютер',
        floor: 7,
        avatarUrl: "img/leks.png"
    },
    {
        id: 2,
        name: 'Томас Андерсон',
        floor: 2,
        avatarUrl: "img/tomas.jpg"
    },
    {
        id: 3,
        name: 'Дарт Вейдер',
        floor: 1,
        avatarUrl: "img/dart.jpg"
    },
    {
        id: 4,
        name: 'Кларк Кент',
        floor: 2,
        avatarUrl: ""
    },
    {
        id: 5,
        name: 'Еще Один',
        floor: 69,
        avatarUrl: ""
    },
    {
        id: 6,
        name: 'И Еще',
        floor: 69,
        avatarUrl: ""
    },
    {
        id: 7,
        name: 'И Еще Один',
        floor: 69,
        avatarUrl: ""
    },
    {
        id: 8,
        name: 'Снова Один',
        floor: 69,
        avatarUrl: ""
    },
    {
        id: 9,
        name: 'Последний Один',
        floor: 69,
        avatarUrl: ""
    },
    {
        id: 10,
        name: 'Петя',
        floor: 69,
        avatarUrl: ""
    },
    {
        id: 11,
        name: 'Вася',
        floor: 69,
        avatarUrl: ""
    },
    {
        id: 12,
        name: 'Маша',
        floor: 69,
        avatarUrl: ""
    },
    {
        id: 13,
        name: 'Анастасия',
        floor: 69,
        avatarUrl: ""
    }
];

let events =[
    {   id: 1,
        name: "Тестовое задание в ШРИ",
        users: [1, 2, 3]
    }
];

let addToEvent = function (article) {
    let id = +article.dataset.userId;
    events[0].users.push(id);
};

let removeFromEvent = function (article) {
    for (let i = 0; i <events[0].users.length; i++) {
        if (events[0].users[i] == article.dataset.userId) {
            events[0].users.splice(i, 1);
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

let createUsers = function(userList) {
    for (let i =0; i < userList.length; i++){
        let hasInEvent = false;
        for (let j =0; j < events[0].users.length; j++){
            if (events[0].users[j] == userList[i].id){
                hasInEvent = true;
            }
        }
        if (hasInEvent){
            let article = document.createElement('article');
            article.dataset.userId = userList[i].id;
            article.innerHTML =
                `<div class="selected_user_img"></div>
                 <div class="selected_user_name">${userList[i].name}</div>
                 <div class="delete_user"></div>`;
            document.querySelector('.selected_users').appendChild(article);
            document.querySelector(`article[data-user-id="${userList[i].id}"]>.selected_user_img`).style.backgroundImage = `url(${userList[i].avatarUrl})`;

        } else {
            let article = document.createElement('article');
            article.dataset.userId = userList[i].id;
            article.innerHTML =
                `<div class="user_img"></div>
             <div class="user_name">${userList[i].name} · <a class="user_floor">${userList[i].floor} этаж</a></div>`;
            document.querySelector('.users_list>section').appendChild(article);
            document.querySelector(`article[data-user-id="${userList[i].id}"]>.user_img`).style.backgroundImage = `url(${userList[i].avatarUrl})`;

        }
    }
};