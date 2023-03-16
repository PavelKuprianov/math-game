const arrColor = ['red', 'yellow', 'green', 'orange', 'blue', 'pink', 'purple' ]

const btnClose = document.querySelector('.modal-btn-start');
const modal = document.querySelector('.modal');
const h2 = document.querySelector('.title-h2');

const verify = document.querySelector('.verify');

const modalViewHandler = () => {
    modal.classList.toggle('modal--open');
}

document.addEventListener('DOMContentLoaded', ()=> {
    modalViewHandler();

btnClose.addEventListener('click', (event) => {
        event.preventDefault();

    //Добавление имени игрока
    const form = document.forms.form;
    let elemForm = form.elements.name.value
    if (!elemForm) {
        alert('Вы не заполнили поле с именем! Как мы будем общаться?')
        return;
    }
    h2.textContent = `Привет, ${elemForm}!`

        modalViewHandler();
    } );
})
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

function selectAction(itemText, n) {
    let arrSign = ['plus', 'minus', 'multiply', 'plus', 'plus', 'minus', 'multiply', 'plus', 'plus', 'minus', 'plus']
    let sign = arrSign[Math.floor(Math.random()*10)];

    let a = Math.floor(Math.random()*10);
    let b = Math.floor(Math.random()*10);

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
            itemText.textContent = a + ' x ' + b;
            result[n] = a*b;
            break;
        case 'division':
            if (a > b ) {
                if(b===0) {
                    while (b===0) {
                        b = Math.floor(Math.random()*10)
                    }
                }
                itemText.textContent = a + ' : ' + b;
                result[n] = a/b;
            } else {
                if(a===0) {
                    while (a===0) {
                        a = Math.floor(Math.random()*10)
                    }
                }
                itemText.textContent = b + ' : ' + a;
                result[n] = b/a;
            }
            break;
    }
    return result[n]
}


// const levelBlock = document.getElementById('level1');

function addLevelExample(level, num) {
    result.length = 0;
    n = 0;
    console.log(result)
    level.querySelectorAll(`[data-level = '${num}']`).forEach((itemLevel)=> {
        itemLevel.style.display = 'block';
        itemLevel.style.stroke = '';
        itemLevel.style.fill = '';
        itemLevel.dataset.result = '';
    })

    console.log(level)

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
        titleLevel.textContent ='Уровень 2';
        numberLevel = 3;
    }

    const textExample = level.querySelectorAll('text');

    let quantityExamples = textExample.length
    console.log(quantityExamples)
    textExample.forEach((itemText)=> {
        itemText.style.stroke = '';
        itemText.style.fill = '';

        selectAction(itemText, n)

        console.log(result[n]);
        let dataSet = itemText.dataset;
        dataSet.result = result[n];
        console.log('itemText - ', itemText);

        n++;
    })


    function controlClick() {
        document.getElementById('textStart').style.display = 'none';
        document.getElementById('textChoice').style.display = 'block';
        document.querySelector('.answer').style.display = 'block';
        document.querySelector('.cover').style.display = 'block';

    }

    let textTags = level.querySelectorAll('text');

    textTags.forEach((textTag)=> {
        console.log(result)
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
            console.log('z - ',z)
            console.log(level)
        });

    })

}


function calculate(level, resultTextExample, ballExample, eventTextBlock, z, numberLevel) {
    const verify = document.querySelector('.verify');
    const input = document.getElementById('inputForm');
    input.value = '';

    verify.addEventListener('click', buttonHandler);


    function buttonHandler(e) {
        e.stopPropagation()

        const answer = input.value;
        console.log(ballExample);

        if (resultTextExample == answer) {
            level.querySelectorAll(`[data-ball = '${ballExample}']`)
                .forEach((item) => {
                    console.log(ballExample)
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
                console.log('Верно!');
                console.log(z);
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
                            next.style.display = 'none';
                            document.querySelector('.title-result').style.display = 'none';
                            document.querySelector('.title-score').style.display = 'none';
                            document.getElementById('verify').removeEventListener('click', buttonHandler)

                            startLevel('level2');
                        })

                        // thisLevel.addEventListener('click', cleenLevel)

                    } else if (numberLevel === 2) {
                        // previous.style.display = 'block';
                        // thisLevel.style.display = 'block';
                        next.style.display = 'block';
                    } else {
                        // previous.style.display = 'block';
                        // thisLevel.style.display = 'block';
                    }

                }

        } else {
                console.log('неправильно!!!!');
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

function startLevel(param) {
 console.log(param)

        document.querySelectorAll('.level').forEach((elLev)=> {
            elLev.style.display = 'none';
            if (elLev.id === param) {
                elLev.style.display = 'block';
                addLevelExample(level2, 2)
            }
        })


}


function cleenLevel () {

        thisLevel.style.display = 'none';
        next.style.display = 'none';
        level1.style.display = 'none';

        document.querySelector('.title-result').style.display = 'none';
        document.querySelector('.title-score').style.display = 'none';

        // document.getElementById('verify').removeEventListener('click', buttonHandler)
        addLevelExample(level1, 1);

}
