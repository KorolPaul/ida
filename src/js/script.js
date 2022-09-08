function checkForm(){
    let form = document.querySelector('.form');
    let fileTypes = ["application/pdf",".doc",".docx","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if(form) {
        let err = 0;
        let name = form.querySelector('#name');
        let tel = form.querySelector('#tel');
        let email = form.querySelector('#email');
        let message = form.querySelector('#mess');
        let successP = form.querySelector('.form_success');
        let file_data = $('#file').prop('files')[0];

        if(name.value == "") {
            name.parentElement.classList.add('error')
            err++;
        }else{
            name.parentElement.classList.remove('error')
        }

        if(tel.value == "") {
            tel.parentElement.classList.add('error')
            err++;
        }else{
            tel.parentElement.classList.remove('error')
        }

        if(!validateEmail(email.value)) {
            email.parentElement.classList.add('error')
            err++;
        }else{
            email.parentElement.classList.remove('error')
        }

        if(typeof file_data !== "undefined") {

            if (fileTypes.includes(file_data.type)) {
                $('.attach').removeClass('error')
            } else {
                $('.attach').addClass('error')
                err++;
            }
        }
        if (message.value == "") {
            message.parentElement.classList.add('error')
            err++;
        } else {
            message.parentElement.classList.remove('error')
        }



        if(err==0){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('input[name="_token"]').val()
                }
            });
            let form_data = new FormData();
            form_data.append('file', file_data);
            form_data.append('name', name.value);
            form_data.append('tel', tel.value);
            form_data.append('email', email.value);
            form_data.append('mess', message.value);
            form_data.append('frompage', form.querySelector('#frompage').value);
            $.ajax({
                url: "/form",
                method: 'post',
                data: form_data,
                processData: false,
                contentType: false,
                dataType    : 'text',
                success: function(result){
                    console.log(result);
                    if(result=="ok"){
                        form.reset();
                        successP.classList.remove('hidden');
                        form.classList.add('successed');
                    }
                }
            });
        }

    }

}

function setText(el){
   if(el.value!= "") {
       let fn = el.value.split(/(\\|\/)/g).pop()
       document.querySelector('#filelabel').innerHTML = fn;
   }else{
       document.querySelector('#filelabel').innerHTML = 'Прикрепить резюме или другие файлы';
   }
}

function validateEmail(email){
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function loadMoreVacncies(el){
    let page = parseInt(el.dataset.page);
    let perpage = el.dataset.perpage
    let total = el.dataset.total
    let nextPage = page+1;
    el.dataset.page = nextPage;
    let form_data = new FormData();
    form_data.append('page', page);
    form_data.append('perpage', perpage);

    $.ajax({
        url: "/loadvacancies",
        method: 'post',
        data: form_data,
        processData: false,
        contentType: false,
        dataType    : 'text',
        success: function(result){
            let r = JSON.parse(result)
            for (let i=0; i< r.length; i++) {
               res = stringToHtml(r[i])
               document.querySelector('.vacancies').append(res)
            }
            vacancyEl();
            animateElements();
            if(nextPage*perpage>=total) {
                el.remove();
            }
        }
    });

}

function stringToHtml(s){
    let temp = document.createElement('div');
    temp.innerHTML = s;
    return temp.firstChild;
}
document.querySelectorAll('.menu_link, .footer_menu-link').forEach( el => {
    el.addEventListener('click', (e)=>{
        let href= el.getAttribute('href');
        if(href[0]=="#"){
            el.setAttribute('href', "/" + href);
        }
    });
});
