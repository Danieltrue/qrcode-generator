//element
const name = document.getElementById('name');
const plate = document.getElementById('plate');
const chassis =  document.getElementById('chassis');
const id = document.getElementById('id');
const form = document.querySelector('form');
const qr = document.querySelector('.qrcode');
const qrbox = document.querySelector('.qr-modal');
const error = document.querySelector('.msg');

//function

//SHOW QR CODE
    function showQr() {
        new QRCode(qr,{
            text: `${name.value.toUpperCase()}
NUMBER PLATE: ${plate.value.toUpperCase()}
CHASSIS: ${chassis.value.toUpperCase()}
http://www.npf.gov.ng/tinted/permit/index.index.php?abuja=${id.value}`,
            width: 300,
            height: 300,
        })
    }

    function showError(clas,msg) {
        error.classList.add(clas);
        error.innerText = msg;
        setTimeout(function(){
            error.classList.remove('show');
        },1000)
    }

    function submitCode(e) {   
        //for each throw text 
            if(name.value === '' || plate.value === '' || chassis.value === '' || id.value === '') {
                showError('show','Please Enter Detail')
            } else if (chassis.value.length < 17 || chassis.value.length > 17) {
                    showError('show','Check Your Chassis Length')
            } else {
                showQr();
                qrbox.classList.add('open');
            }
        e.preventDefault();
    };

    //fshow modal
    function showModal(e) {
       
        if(e.target.classList.contains('qr-modal')) {
            qrbox.classList.remove('open');
            const text = [name,plate,chassis,id];
            text.forEach((inp) => {
                inp.value = '';
                //removing theqr generated after closing the generated one
                while(qr.firstElementChild) {
                    qr.firstElementChild.remove()
                }
            })
        }
    }

//events
form.addEventListener('submit',submitCode);
qrbox.addEventListener('click',showModal);