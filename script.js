const url_com = 'https://api.github.com/users/'
const butt = document.querySelector('.butt')
const inp = document.querySelector('.inp')
const out = document.querySelector('.out')
const message_error = document.querySelector('.message_error')
const loading_spinner = document.querySelector('.loading_spinner')

let nickname = ''

const get_User_GitHub =  url => {
fetch(url_com + url)
// .then(response=> response.ok ? response.json() : console.error(response))
.then(response=> response.ok ? response.json() :Promise.reject(response))
.then(data=>{
//     console.log(data);
//    console.log('Start'); 
    out.innerHTML = `
    <div><img src='${data.avatar_url}'></div>
    <div>${data.location?data.location:'Локация не указана'}</div>
    <div>Id:${data.id}</div>
    <div>Login:${data.login}</div>
    `
})
.catch(e=>{
 console.log(e);
    create_message_error("Такого пользователя не существует.")
 e.text()
 .then(req=>{
     console.log(req);
 })

})
.finally(e=>{

})
}
const delete_error_message = ()=> message_error.classList.remove('active');

const create_message_error = message => {
    message_error.classList.add('active')
    inp.value = ''
    message_error.innerHTML=`<div> ${message} <button onclick="delete_error_message()">X</button></div> `
    setTimeout(delete_error_message, 5000);
}
// create_message_error()

const loading = (text)=>{
    loading_spinner.innerHTML = text

}

butt.addEventListener('click',e=>{

    loading(`<img src="./spinner.gif">`) 
    setTimeout(() => {
        loading("")
        inp.value.trim()?get_User_GitHub(inp.value.trim()) :create_message_error( 'Поле не может быть пустым')
    }, 2000);


})
 
//Вывести текст ошибки (при неверном нике), поставить spinner (загрузка)