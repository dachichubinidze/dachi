let mainDivwraper = document.getElementById('div-wraper')
let overlay = document.getElementById('overlay-block')
let content = document.getElementById('content')
let closeIcon = document.getElementById('close')

function ajaxFunction(url, callback){
    let request = new XMLHttpRequest;
    request.open('GET', url)
    request.addEventListener('load', function(){
        let dataInfoJs = JSON.parse(request.responseText)
        callback(dataInfoJs);
    })
    request.send();
}
ajaxFunction('https://jsonplaceholder.typicode.com/posts', function(dataInfoJs){
    printData(dataInfoJs)
});

function printData(dataInfoJs){
    dataInfoJs.forEach(element => {
        createPost(element)
    });
}

function createPost(item){
    let divwraper = document.createElement('div')
    divwraper.classList = 'posts'
    divwraper.setAttribute('data-id', item.id)

    let h3Tag = document.createElement('h3')
    h3Tag.textContent = item.id

    let h2Tag = document.createElement('h2')
    h3Tag.textContent = item.title

    divwraper.appendChild(h3Tag)
    divwraper.appendChild(h2Tag)

    divwraper.addEventListener('click', function(event){
        let id = event.target.getAttribute('data-id')
        openOverlay(id);
    })
    mainDivwraper.appendChild(divwraper)
}

function openOverlay(id) {
    overlay.classList.add('active')
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`
    ajaxFunction(url, function(dataInfoJs){
        overlayFunction(dataInfoJs);
    })
}

function overlayFunction(item){
    let description = document.createElement('p')
    description.textContent = item.body

    content.appendChild(description)
}

closeIcon.addEventListener('click', function(){
    overlay.classList.remove('active')
    content.innerHTML = ''
})