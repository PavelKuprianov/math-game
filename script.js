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
const level1 = document.querySelector('.level1');
let result = [];
let n = 0
const levelBlock = document.querySelector('.level');

function addLevelExample(level, sign) {
    
    const textExample = level.querySelectorAll('text');
    let quantityExamples = textExample.length
    console.log(quantityExamples)
    textExample.forEach((itemText)=> {
        let a = Math.floor(Math.random()*10);
        let b = Math.floor(Math.random()*10);
        console.log(a + '  ' + b)

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

    let textTags = document.querySelectorAll('text');

    textTags.forEach((textTag)=> {
        console.log(result.length)
        textTag.addEventListener('click', (e) => {
            resultTextExample = e.target.dataset.result;
            let eventTextBlock = e.target
            controlClick();

            levelBlock.querySelectorAll(`[data-ball = '${e.target.dataset.ball}']`).forEach((item) => {
                item.style.stroke = 'orange';
            })

            let ballExample = e.target.dataset.ball;

            calculate(resultTextExample, ballExample, eventTextBlock, z)
            z++;
            console.log('z - ',z)
        });

    })

}
addLevelExample(level1, 'plus');


function calculate(resultTextExample, ballExample, eventTextBlock, z) {
    const verify = document.querySelector('.verify');
    const input = document.getElementById('inputForm');
    input.value = '';

    verify.addEventListener('click', buttonHandler);


    function buttonHandler(e) {
        e.stopPropagation()

        const answer = input.value;
        console.log(ballExample);

        if (resultTextExample == answer) {
            levelBlock.querySelectorAll(`[data-ball = '${ballExample}']`)
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

