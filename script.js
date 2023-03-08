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


// const container = document.querySelector('.container');
// container.addEventListener('click', (e) => {
//     console.log(e.target)
//     e.target.style.stroke = 'red';
// })





const level1 = document.querySelector('.level1');
let result = [];
let n = 0

function addLevelExample(level, sign = 'plus') {
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

        itemText.dataset.result = result[n];
        itemText.addEventListener('click', (e) => {
            let dataSet = itemText.dataset.ball;

            document.getElementById('textStart').style.display = 'none';
            document.getElementById('textChoice').style.display = 'block';
            document.querySelector('.answer').style.display = 'block';

            levelBlock.querySelectorAll(`[data-ball = ${dataSet}]`).forEach((item)=> {
                console.log(item);
                item.style.stroke = 'orange';
            })



        })



        n++;
    })
    console.log(result)

}
addLevelExample(level1, 'plus');


// const table = document.querySelector('.table');

// function tableFill(quantity) {
//     for (let i=0; i<quantity; i++) {
//         let tr = document.createElement('tr');
//         table.append(tr);
//
//         for (let j=0; j<quantity; j++) {
//             let td = document.createElement('td');
//             td.classList.add('cell');
//             tr.append(td);
//
//             let divCell = document.createElement('div');
//             divCell.classList.add('cell__field');
//             td.append(divCell);
//
//             let textExample = document.createElement('p');
//             textExample.classList.add('example');
//
//             divCell.append(textExample);
//             // textExample.textContent = 'Пример';
//
//         }
//     }
//
//     const exampleField = document.querySelectorAll('.example');
//
//     let arrExample = [];
//     let x = 0;
//     exampleField.forEach((exampleItem) => {
//         x++;
//         exampleItem.id = x;
//         let a = Math.floor(Math.random()*10);
//         let b = Math.floor(Math.random()*10);
//
//         exampleItem.textContent = a + ' + ' + b;
//     })
// }

// function levelSetting(level) {
//     switch (level) {
//         case 2:
//             quantity = 3;
//             break;
//         case 3:
//             quantity = 4;
//             break;
//         default:
//             quantity = 2;
//     }
//     tableFill(quantity);
// }
//
// levelSetting(3);



// const cellField = document.querySelectorAll('.cell__field');
//
//
// cellField.forEach((item)=> {
//     item.addEventListener('click', (event) => {
//         event.target.classList.add('decided');
//     })
// })
