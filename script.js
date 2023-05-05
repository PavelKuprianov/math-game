const arrColor = ['red', 'yellow', 'green', 'orange', 'blue', 'pink', 'purple' ]

const btnClose = document.querySelector('.modal-btn-start');
const modal = document.querySelector('.modal');
const h2 = document.querySelector('.title-h2');

const verify = document.querySelector('.verify');
let nameUser = '';
let ageUser = '';

const modalViewHandler = () => {
    modal.classList.toggle('modal--open');
}

document.addEventListener('DOMContentLoaded', async ()=> {

    if(navigator.serviceWorker) {
        try {
            const reg = await navigator.serviceWorker.register('/sw.js')  
          console.log('Service worker register success', reg)
        } catch (e) {
            console.log('Service worker register fail')
        }
        
    }

    modalViewHandler();

    btnClose.addEventListener('click', (event) => {
            event.preventDefault();

        //Добавление имени игрока
        const form = document.forms.form;
        let elemForm = form.elements.name.value;
        let elemFormAge = form.elements.age.value;
        if (!elemForm || !elemFormAge || Number(elemFormAge)<1) {
            alert('Вы не корретно заполнили или забыли заполнить одно из полей знакомства! Как мы будем общаться?')
            return;
        }

        h2.textContent = `Привет, ${elemForm}!`
        nameUser = elemForm;
        ageUser = elemFormAge;

        let remains;

        if (Number(ageUser)<=5) {
            remains = 90;            
        } else if (Number(ageUser)<=7) {
            remains  = 600;
        } else {
            remains = 2700;
        }

        countdown(remains); // вызов функции

        modalViewHandler();
    } );
})

function countdown(remains){ // функция обратного отсчета
    let min = remains > 0 ? Math.floor(remains/60)%60 : 0;
    let sec = remains > 0 ? Math.floor(remains)%60 : 0;
    document.getElementById('minute').textContent = min < 10 ? '0' + min : min;
    document.getElementById('second').textContent = sec < 10 ? '0' + sec : sec;

    remains--; // уменьшаем число на единицу
    if (remains<0){
        clearTimeout(timer); // таймер остановится на нуле
        gameOver(gameScore, gameScoreLevel, 'время истекло!');
    } else if (remains === 'end') {
        clearTimeout(timer);
    } else {
        timer = setTimeout(countdown, 1000, remains);
    }

}


let z = 0;
let gameScore = 0;
const level1 = document.getElementById('level1');
const level2 = document.getElementById('level2');
let result = [];
let n = 0;
const buttonLevel = document.querySelector('.button-level');
const previous = document.getElementById('previous');
const thisLevel = document.getElementById('this');
const next = document.getElementById('next');



function selectAction(itemText, n, numberLevel) {
    let arrSign = ['plus', 'plus', 'plus', 'minus', 'minus', 'minus', 'multiply', 'multiply', 'division', 'division' ]
    let sign;

    if (numberLevel === 1) {
        sign = arrSign[Math.floor(Math.random()*6)];
    } else if (numberLevel === 2) {
        sign = arrSign[Math.floor(Math.random()*5+2)];
    } else {
        sign = arrSign[Math.floor(Math.random()*3 + 7)];
    }

    let a = Math.floor(Math.random()*8+2);
    let b = Math.floor(Math.random()*8+2);

    switch (sign) {
        case 'plus':
            itemText.textContent = a + ' + ' + b;
            result[n] = a+b;
            break;
        case 'minus':
            if (a > b ) {
                itemText.textContent = a + ' - ' + b;
                result[n] = a-b;
            } else {
                itemText.textContent = b + ' - ' + a;
                result[n] = b-a;
            }
            break;
        case 'multiply':
            itemText.innerHTML = a + ' &#183; ' + b;
            result[n] = a*b;
            break;
        case 'division':

            let resultD = Math.floor(Math.random()*9 + 2);
            b = Math.floor(Math.random()*9 + 2);
            a = resultD * b;

            itemText.textContent = a + ' : ' + b;
            result[n] = a/b;
            break;
    }
    return result[n]
}



function addLevelExample(level, num, z=0) {


    result.length = 0;
    n = 0;
    level.querySelectorAll(`[data-level = '${num}']`).forEach((itemLevel)=> {
        itemLevel.style.display = 'block';
        itemLevel.style.stroke = '';
        itemLevel.style.fill = '';
        itemLevel.dataset.result = '';
    })



    document.getElementById('textStart').style.display = 'block';
    document.getElementById('textChoice').style.display = 'none';
    document.querySelector('.answer').style.display = 'none';
    document.querySelector('.cover').style.display = 'none';

    level.style.display = 'block';
    const titleLevel = document.querySelector('.title');

    let numberLevel = 0;

    if (level.classList.contains('level1')) {
        titleLevel.textContent ='Уровень 1';
        numberLevel = 1;
    } else if ((level.classList.contains('level2'))) {
        titleLevel.textContent ='Уровень 2';
        numberLevel = 2;
    } else {
        titleLevel.textContent ='Уровень 3';
        numberLevel = 3;
    }

    const textExample = level.querySelectorAll('text');

    let quantityExamples = textExample.length
    textExample.forEach((itemText)=> {
        itemText.style.stroke = '';
        itemText.style.fill = '';

        selectAction(itemText, n, numberLevel)

        let dataSet = itemText.dataset;
        dataSet.result = result[n];

        n++;
    })

    function controlClick() {
        document.getElementById('textStart').style.display = 'none';
        document.getElementById('textChoice').style.display = 'block';
        document.querySelector('.answer').style.display = 'flex';
        document.querySelector('.cover').style.display = 'block';

    }

    let textTags = level.querySelectorAll('text');

    textTags.forEach((textTag)=> {
        textTag.addEventListener('click', (e) => {
            resultTextExample = e.target.dataset.result;
            let eventTextBlock = e.target
            controlClick();

            level.querySelectorAll(`[data-ball = '${e.target.dataset.ball}']`).forEach((item) => {
                item.style.stroke = 'orange';
            })

            let ballExample = e.target.dataset.ball;

            calculate(level, resultTextExample, ballExample, eventTextBlock, z, numberLevel)
            z++;

        });

    })

}

function nextHandler(numberLevel, gameScore) {
    currentScore = gameScore - currentScore;
    next.style.display = 'none';
    document.querySelector('.title-result').style.display = 'none';
    document.querySelector('.title-score').style.display = 'none';
    gameScoreLevel.push(currentScore);


    let param = `level${numberLevel+1}`;
    startLevel(param, numberLevel+1);
}

let gameScoreLevel=[];
let currentScore = 0;

function calculate(level, resultTextExample, ballExample, eventTextBlock, z, numberLevel) {
    const verify = document.querySelector('.verify');
    const input = document.getElementById('inputForm');
    input.value = '';

    verify.addEventListener('click', buttonHandler);

    function buttonHandler(e) {
        e.stopPropagation()

        const answer = input.value;

        if (resultTextExample == answer) {
            level.querySelectorAll(`[data-ball = '${ballExample}']`)
                .forEach((item) => {
                item.style.stroke = arrColor[ballExample];
                item.style.fill = arrColor[ballExample];
            })
            gameScore +=10;
                document.querySelector('.answer').style.display = 'none';
                document.querySelector('.cover').style.display = 'none';
                document.getElementById('textStart').style.display = 'block';
                document.getElementById('textChoice').style.display = 'none';
                eventTextBlock.style.display = 'none';
                document.querySelector('.title-correctly').style.display = 'block';
                document.querySelector('.answer').style.display = 'none';
                setTimeout(() => {
                    document.querySelector('.title-correctly').style.display = 'none';
                }, 1000);
                resultTextExample = '';
                input.value ='';

                if (Number(z+1)=== result.length) {
                    document.getElementById('textStart').style.display = 'none';
                    document.getElementById('textOffer').style.display = 'none';
                    document.querySelector('.title-result').style.display = 'block';
                    document.querySelector('.title-score').style.display = 'block';
                    document.querySelector('.title-score').textContent = `Общий счёт - ${gameScore}`;
                    if(numberLevel === 1) {

                        // thisLevel.style.display = 'block';
                        next.style.display = 'block';
                        next.addEventListener('click', (e)=> {
                            e.stopPropagation()
                            document.getElementById('verify').removeEventListener('click', buttonHandler)

                            nextHandler(numberLevel, gameScore)
                        })
                        next.removeEventListener('click', nextHandler)

                    } else if (numberLevel === 2) {

                        next.style.display = 'block';
                        next.addEventListener('click', (e)=> {
                            nextHandler(numberLevel, gameScore)
                        })

                    } else {
                        gameScoreLevel.push(gameScore)
                        gameOver(gameScore, gameScoreLevel);
                    }
                }

        } else {
                document.querySelector('.title-error').style.display = 'block';
                document.querySelector('.answer').style.display = 'none';
                input.value ='';
                setTimeout(() => {
                    document.querySelector('.title-error').style.display = 'none';
                    document.querySelector('.answer').style.display = 'block';
                }, 2000);

                gameScore -=1;
                buttonHandler()
        }
        
        document.getElementById('verify').removeEventListener('click', buttonHandler)
        return z
    }

}

addLevelExample(level1, 1); //Первоначальный запуск всей игры

function startLevel(param, numberLevel) {

        document.querySelectorAll('.level').forEach((elLev)=> {
            elLev.style.display = 'none';
            if (elLev.id === param) {
                elLev.style.display = 'block';
                addLevelExample(elLev, numberLevel)
            }
        })
}

// setTimeout(gameOver, timer, gameScore, gameScoreLevel, 'время истекло!')

function gameOver (gameScore, gameScoreLevel, message = 'ты молодец!') {
    const modalFinal = document.querySelector('.modal-final');
    const modalViewFinal = () => {
        modalFinal.classList.add('modal--open');
    }
    const modalTitleFinal = document.querySelector('.modal-title-final');
    const modalTextFinal = document.querySelector('.modal-text-final');
    const item1 = document.getElementById('item1');
    const item2 = document.getElementById('item2');
    const item3 = document.getElementById('item3');

    modalTitleFinal.textContent = `${nameUser}, ${message}`;
    let sum1 = 0;
    if (gameScoreLevel[0]) {
        sum1 = gameScoreLevel[0];
        item1.textContent = `Баллы, набранные в 1 уровне - ${gameScoreLevel[0]}`;   
    }
    let sum2 = 0;
    if (gameScoreLevel[1]) {
        sum2 = gameScoreLevel[1];
        item2.textContent = `Баллы, набранные во 2 уровне - ${gameScoreLevel[1]}`;  
    }
    let sum3 = 0;
    if (gameScoreLevel[3]-gameScoreLevel[0]-gameScoreLevel[1]) {
        sum3 = gameScoreLevel[3]-gameScoreLevel[0]-gameScoreLevel[1]
        item3.textContent = `Баллы, набранные в 3 уровне - ${gameScoreLevel[3]-gameScoreLevel[0]-gameScoreLevel[1]}`;
    }
    if (message === 'время истекло!') {
        if ((sum1 + sum2 + sum3) == 120) {
            document.getElementById('img-final').src = 'img/apple_jam.png';
            document.querySelector('.img-text').textContent = 'Ты заслужил яблочное варенье!'
        } else if ((sum1 + sum2 + sum3) < 120 && ((sum1 + sum2 + sum3) >= 50) ) {
            document.getElementById('img-final').src = 'img/3apple.png';
            document.querySelector('.img-text').textContent = 'Ты все решил, но есть недочеты!'
        } else if ((sum1 + sum2 + sum3) <= 50 && ((sum1 + sum2 + sum3) > 20) ){
            document.getElementById('img-final').src = 'img/2apple.png';
            document.querySelector('.img-text').textContent = 'Неплохо, но есть еще над чем работать!'
 
        } else if ((sum1 + sum2 + sum3) <= 20 && ((sum1 + sum2 + sum3) > 0) ){
            document.getElementById('img-final').src = 'img/apple.png';
            document.querySelector('.img-text').textContent = 'Маловато решено, надо еще потрудиться! Пока только одно яблоко!'
 
        }
         else {
            document.getElementById('img-final').src = 'img/cone.png';
            document.querySelector('.img-text').textContent = 'Тебе надо подучиться, пока твоя только шишка!'
 
        }
        modalTextFinal.textContent = `Сумма набранных тобой баллов состаляет ${sum1 + sum2 + sum3}`;
    } else {
        if (gameScore == 120) {
            document.getElementById('img-final').src = 'img/apple_jam.png';
            document.querySelector('.img-text').textContent = 'Ты заслужил яблочное варенье!'
        } else {
            document.getElementById('img-final').src = 'img/apple_basket.png';
            document.querySelector('.img-text').textContent = 'Ты немного недобрал баллов, поэтому варенье будешь варить сам!'
        }
        modalTextFinal.textContent = `Сумма набранных тобой баллов состаляет ${gameScore}`;
        countdown('end');
        document.getElementById('rocket').style.display = 'none';
    }

    modalViewFinal();
}

document.querySelector('.btn-final').addEventListener('click', ()=> {
    window.location.reload();
})
