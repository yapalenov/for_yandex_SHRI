document.addEventListener('DOMContentLoaded', function() {

    /*-----------------------Listeners------------------------------------------------------*/

    $(".close_time_3_1").click(()=> {
        $(".close_time_3_1"
).
    css('background', '#8594A2');
    $(".update_block").css("display", "block").animate({opacity: 1}, 200);
    let handler = ()=>
    {
        $(document).one('click', function (e) {
            let div = $(".close_time_3_1");
            let div2 = $(".update_button");
            let div3 = $(".update_blank");
            let div4 = $(".update_block");

            if (e.target === div[0]
                || e.target === div2[0]
                || e.target === div3[0]
                || e.target === div4[0]) {
                handler();
            } else {
                $(".update_block").css('display', 'none').animate({opacity: 0}, 200);
                $(".close_time_3_1").css('background', '');
            }
        });
    }
    ;
    setTimeout(handler(), 100)
})
    ;

    $(".close_time_1_1").click(()=> {
        console.log('dd');
    $(".close_time_1_1").css('background', '#8594A2');
    $(".update_block_touch").css("display", "block").animate({opacity: 1}, 200);
    let handler = ()=>
    {
        $(document).one('click', function (e) {
            let div = $(".close_time_1_1");
            let div2 = $(".update_block_touch");
            let div3 = $(".update_blank");
            let div4 = $(".update_button");
            if (e.target === div[0]
                || e.target === div2[0]
                || e.target === div3[0]
                || e.target === div4[0]) {
                handler();
            } else {
                $(".update_block_touch").css('display', 'none').animate({opacity: 0}, 200);
                $(".close_time_1_1").css('background', '');
            }
        });
    }
    ;
    setTimeout(handler(), 100)
})
    ;

    $(window).resize(()=> {
    if(document.querySelector('#global_wrapper').offsetWidth > 660) {
            if (document.querySelector('#global_wrapper').classList.contains('mobile')){
                    document.querySelector('#global_wrapper').classList.remove('mobile')
            }
            if (!document.querySelector('#global_wrapper').classList.contains('desctop')){
                document.querySelector('#global_wrapper').classList.add('desctop')
            }
            $('.scrollable_section').scrollLeft(0);
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

    $('.scrollable_section').scroll(()=> {
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

})
    ;
});

    