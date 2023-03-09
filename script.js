const btnClose = document.querySelector('.modal-btn-start');
const modal = document.querySelector('.modal');
const h2 = document.querySelector('.title-h2');

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


const level1 = document.querySelector('.level1');
let result = [];
let n = 0

function addLevelExample(level, sign) {
    const levelBlock = document.querySelector('.level');
    const textExample = levelBlock.querySelectorAll('text');
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
        itemText.addEventListener('click', (e) => {
            console.log("Выбрали текст - ", e.target)
            // let dataSet = itemText.dataset.ball;

            document.getElementById('textStart').style.display = 'none';
            document.getElementById('textChoice').style.display = 'block';
            document.querySelector('.answer').style.display = 'block';
            document.querySelector('.cover').style.display = 'block';

            let ballTextExample;

            levelBlock.querySelectorAll(`[data-ball = ${dataSet.ball}]`).forEach((item) => {
                item.style.stroke = 'orange';
                ballTextExample = item;
            })



            console.log("ballTextExample ", ballTextExample)
            console.log("1 вариант - ", dataSet.result)
            const verify = document.querySelector('.verify');
            const decision = document.getElementById('decision')
            let hren = ballTextExample.dataset.result;


            verify.addEventListener('click', (e) => {

                console.log(ballTextExample.dataset.result);
                console.log(hren);
                e.preventDefault();
                // e.stopPropagation();
                let resultForm = decision.value;
                console.log(resultForm)
                if (resultForm === dataSet.result) {
                    levelBlock.querySelectorAll(`[data-ball = ${dataSet.ball}]`).forEach((item) => {
                        item.style.stroke = 'red';
                        item.style.fill = 'red';
                    });
                    document.querySelector('.answer').style.display = 'none';
                    document.querySelector('.cover').style.display = 'none';
                    document.getElementById('textStart').style.display = 'block';
                    document.getElementById('textChoice').style.display = 'none';
                    ballTextExample.style.display = 'none';
                    decision.value = '';
                    console.log('Верно!');
                    console.log(result)
                } else {
                    console.log('неправильно!!!!');
                    document.querySelector('.title-error').style.display = 'block';
                    document.querySelector('.answer').style.display = 'none';
                    setTimeout(() => {
                        document.querySelector('.title-error').style.display = 'none';
                        document.querySelector('.answer').style.display = 'block';
                    }, 2000);
                    // document.getElementById("answerform").reset();
                }

                // document.forms.answerForm.elements.answer.value = '';
            })


        })

        n++;
    })
    console.log(result)

}
addLevelExample(level1, 'plus');

