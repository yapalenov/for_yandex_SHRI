module.exports.index = function (req, res) {
  res.send(`
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Переговорки</title>
    <meta name=viewport content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/bundle.css">
    <script src="scripts/bundle.js"></script>
   
</head>
<body>
    <div id="global_wrapper">
        <header>
            <div class="logo"></div>
            <div class="create_event"><span>Создать встречу</span></div>
        </header>
        <div class="date_now">
            <div class="arr"><div class="arr_img"></div></div>
            <div class="date">14 дек · Сегодня</div>
            <div class="arr"><div class="arr_img"></div></div>
        </div>
        <section class="scrollable_section">
            <div class="time_list">
                <ul class="time">
                    <li>8:00</li>
                    <li>9</li>
                    <li>10</li>
                    <li class="absol"></li>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                    <li>15</li>
                    <li>16</li>
                    <li>17</li>
                    <li>18</li>
                    <li>19</li>
                    <li>20</li>
                    <li>21</li>
                    <li>22</li>
                    <li>23</li>
                </ul>
            </div>
            <section class="scrollable_section_y">

            <aside>
                <ul>

                </ul>
            </aside>
            <div class="slicers">
                <div class="slicer first"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer absolutely"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
                <div class="slicer"></div>
            </div>
            <div class="time_of_events">

            </div>
            </section>
        </section>
        <section class="update_event_wrapper">
            <section class="update_event">
                <h1>Редактирование встречи</h1>
                <div class="close_round"><div class="round_img"></div></div>
                <div class="inline_box">
                    <label for="name">Тема</label>
                    <input id="name" value="Тестовое задание в ШРИ" type="text" placeholder="О чем будете говорить?">
                </div>
                <div class="inline_box">
                    <label for="date">Дата</label>
                    <input id="date" type="text" value="14 декабря, 2017" placeholder="14 декабря, 2017">
                </div>
                <div class="inline_box">
                    <label for="start">Начало</label>
                    <input id="start" value="16:00" type="text" placeholder="12:00">
                </div>
                <span>—</span>
                <div class="inline_box">
                    <label for="end">Конец</label>
                    <input id="end" value="16:30" type="text" placeholder="13:00">
                </div>
                <div class="inline_box">
                    <label for="users">Участники</label>
                    <input type="text" id="users" placeholder="Например, Тор Одинович">
                    <section class="users_list">
                        <section class="addUser">

                        </section>
                    </section>
                </div>

                <section class="selected_users">

                </section>

                <div class="inline_box rooms">
                    <label for="room">Ваша переговорка</label>
              
                    <label id="label_rooms" for="rooms">Рекомендуемые переговорки</label>
                    <div id="rooms">
                      
                    </div>
                   
                    <div id="room">
                    <div class="after"></div>
                        <article>16:00—16:30</article>
                        <article>Готем · 4 этаж</article>
                    </div>
                </div>



            </section>
            <footer>
                <div><span>Отмена</span></div>
                <div><span>Удалить встречу</span></div>
                <div class="create_event_foot"><span>Создать встречу</span></div>
                <div><span>Сохранить</span></div>
                
            </footer>
        </section>
        <section class="update_block">
            <div class="before"></div>
            <div class="update_blank">
                <h1></h1><div class="update_button"></div>
                <div class="time_updt">14 декабря, 15:00—17:00 <span class="updt" style='padding-right:5px;'></span>·<span class="updt" style='padding-left:5px;'></span> Жёлтый дом</div>
                <div class="img_updt"></div><div class="description_updt">Дарт Вейдер<span> и 12 участников</span></div>
            </div>
        </section>
        <section class="background_modal">
            <article class="succes_creating">
               <div class="succes_logo"></div>
               <h1>Встреча создана!</h1>
               <div class="succes_date">1</div>
               <div class="succes_room"></div>
               <div class="succes_button">Хорошо</div>  
            </article>
            <article class="succes_updating">
               <div class="succes_logo"></div>
               <h1>Встреча изменена!</h1>
               <div class="succes_date"></div>
               <div class="succes_room"></div>
               <div class="succes_button">Хорошо</div>  
            </article>
            <article class="ask_delete">
                <div class="delete_logo"></div>
                <h1>Встреча будет <br id="br1"> удалена <br id="br2"> безвозвратно</h1>
                <div class="buttons">
                  <div class="ask_close">Отмена</div>
                  <div class="delete_button">Удалить</div>
                </div>
            </article>
            
        </section>
        <section class="calendar_container">
		<div class="arr_container"></div>
		<div class="arr_container"></div>
		<article>
			<div class="month"></div>
			<table cellpadding="0">
				<tr>
					<td class="day">Пн</td>
					<td class="day">Вт</td>
					<td class="day">Ср</td>
					<td class="day">Чт</td>
					<td class="day">Пт</td>
					<td class="day">Сб</td>
					<td class="day">Вс</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</article>
		<article>
			<div class="month"></div>
			<table cellpadding="0">
				<tr>
					<td class="day">Пн</td>
					<td class="day">Вт</td>
					<td class="day">Ср</td>
					<td class="day">Чт</td>
					<td class="day">Пт</td>
					<td class="day">Сб</td>
					<td class="day">Вс</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</article>
		<article>
			<div class="month"></div>
			<table cellpadding="0">
				<tr>
					<td class="day">Пн</td>
					<td class="day">Вт</td>
					<td class="day">Ср</td>
					<td class="day">Чт</td>
					<td class="day">Пт</td>
					<td class="day">Сб</td>
					<td class="day">Вс</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</article>
	</section>
    </div>
</body>
</html>
    `);
};
