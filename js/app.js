/* 
    - The JSONPlaceholder API supports limiting results using this formated URL: 
      https://jsonplaceholder.typicode.com/${resource}?_limit=${number}

*/

/* -- Set The Nmuber Input Limitation Or 'max' Attribute -- */

const numberInput = document.getElementById('number__input');
const controllers = Array.from(document.querySelectorAll('.controls__list .controls__item'));

controllers.forEach(controller => {
    controller.addEventListener('click', function (e) {
        
        // Remove 'active' Class From All Lis
        controllers.forEach(controller => controller.classList.remove('active'));

        // Add 'active' Class To The Selected Li
        e.currentTarget.classList.add('active');

        // Get The Limitation Value Of Each Resource From The Selected Li
        let dataLimit = e.currentTarget.dataset.limit;
        
        // Add The 'dataLimit' As A 'max' Attribute In The Number Input
        numberInput.setAttribute('max', dataLimit);

    });
});

/* -- Get Data From The 'JSONPlaceholder API' -- */

const dataGetter = document.getElementById('data__getter');

function getData() {

    // Clear The Results Div If Its Contain Childrens
    if (resultsDiv.children.length > 0) { resultsDiv.innerHTML = '' };

    // Get The Entred Number Input Value
    let number = numberInput.value; 

    // Handle If The User Does Not Enter Anything
    if (number == '' || number == null) {
        errorHandler('Input field must be non-empty!');
    } else {

        // Get The 'resource' From The Active Control Item 
        let resource = document.querySelector('.controls__list .controls__item.active').dataset.resource;

        // Fetch Data
        fetch(`https://jsonplaceholder.typicode.com/${resource}?_limit=${number}`)
            .then(response => response.json())
            .then(data => manageData(data, resource, number))
            .catch(error => errorHandler('Falied to fetch data. try again!'));

    };

};

// getData() Trigger
dataGetter.addEventListener('click', getData);

// errorHandler() Function
function errorHandler(message) { alert(message) }

// manageData() Function
function manageData(data, resource, number) {

    // Check For The 'resource' Before Displaying Data
    if (resource === 'posts') { displayPosts(data) }
    else if (resource === 'comments') { displayComments(data) }
    else if (resource === 'albums') { displayAlbums(data) }
    else if (resource === 'photos') { displayPhotos(data) }
    else if (resource === 'todos') { displayTodos(data) }
    else if (resource === 'users') { displayUsers(data) }

    // Set The Object That Contains All Data Before Add It To The Local Storage
    const userDataForamt = {
        ordersNumber: number,
        resourceType: resource,
        resourceData: data
    }

    // Add The Setted Data To The Local Storage
    addDataToLS(userDataForamt);
    
};

/* -- Create All The Displaying Data Fucntions -- */

const resultsDiv = document.getElementById('results');

function displayPosts(data) {

    data.forEach(postObject => {
        
        // Extract Post Data Using Desctructuring
        let { id: postId, title, body } = postObject;

        // Create The HTML Markup
        const postCard = `
            <div class="swiper-slide results__item" id="post__card">
                <span class="item__id">${postId < 10 ? `0${postId}` : postId}</span>
                <div class="post__content">
                    <h3 class="title">${title}</h3>
                    <p class="body">${body}</p>
                </div>
            </div>
        `;

        // Append The Created 'postCard' To The 'resultsDiv'
        resultsDiv.insertAdjacentHTML("beforeend", postCard);

    });

};

function displayComments(data) {

    data.forEach(commentObject => {
        
        // Extract Comment Data Using Desctructuring
        let { id: commentId, name, email, body } = commentObject;

        // Create The HTML Markup
        const commentCard = `
            <div class="swiper-slide results__item" id="comment__card">
                <span class="item__id">${commentId < 10 ? `0${commentId}` : commentId}</span>
                <div class="comment__content">
                    <div class="details__box">
                        <i class="ri-user-fill"></i>
                        <p>${name}</p>
                    </div>
                    <div class="details__box">
                        <i class="ri-mail-line"></i>
                        <p>${email}</p>
                    </div>
                    <p class="body">${body}</p>
                </div>
            </div>
        `;

        // Append The Created 'commentCard' To The 'resultsDiv'
        resultsDiv.insertAdjacentHTML("beforeend", commentCard);

    });

};

function displayPhotos(data) {

    data.forEach(photoObject => {
        
        // Extract Photo Data Using Desctructuring
        let { id: photoId, title, thumbnailUrl } = photoObject;

        // Create The HTML Markup
        const photoCard = `
            <div class="swiper-slide results__item" id="photo__card">
                <span class="item__id">${photoId < 10 ? `0${photoId}` : photoId}</span>
                <div class="photo__content">
                    <h3 class="title">${title}</h3>
                    <div class="photo__holder">
                        <!-- <i class="ri-file-copy-2-fill" id="copy__path" onclick="copyPhotoPath(this)"></i> -->
                        <a href="${thumbnailUrl}" download="" id="download__photo">
                            <i class="ri-download-cloud-fill"></i>
                        </a>
                        <img src="${thumbnailUrl}" alt="Photo">
                    </div>
                </div>
            </div>
        `;

        // Append The Created 'photoCard' To The 'resultsDiv'
        resultsDiv.insertAdjacentHTML("beforeend", photoCard);

    });

};

function displayAlbums(data) {

    data.forEach(albumObject => {
        
        // Extract Album Data Using Desctructuring
        let { id: albumId, title } = albumObject;

        // Create The HTML Markup
        const albumCard = `
            <div class="swiper-slide results__item" id="album__card">
                <span class="item__id">${albumId < 10 ? `0${albumId}` : albumId}</span>
                <div class="album__content">
                    <h3 class="title">${title}</h3>
                </div>
            </div>
        `;

        // Append The Created 'albumCard' To The 'resultsDiv'
        resultsDiv.insertAdjacentHTML("beforeend", albumCard);

    });

};

function displayTodos(data) {

    data.forEach(todoObject => {
        
        // Extract Todo Data Using Desctructuring
        let { id: todoId, title, completed } = todoObject;

        // Create The HTML Markup
        const todoCard = `
            <div class="swiper-slide results__item" id="todo__card">
                <span class="item__id">${todoId < 10 ? `0${todoId}` : todoId}</span>
                <div class="todo__content">
                    <h3 class="title">${title}</h3>
                    <div class="details__box">
                        <i class="ri-calendar-check-fill"></i>
                        <p>${completed ? "Completed" : "Pending"}</p>
                    </div>
                </div>
            </div>
        `;

        // Append The Created 'todoCard' To The 'resultsDiv'
        resultsDiv.insertAdjacentHTML("beforeend", todoCard);

    });

};

function displayUsers(data) {

    data.forEach(userObject => {
        
        // Extract User Data Using Desctructuring
        let { id: userId, name, username, email, phone, website } = userObject;

        // Create The HTML Markup
        const userCard = `
            <div class="swiper-slide results__item" id="user__card">
                <span class="item__id">${userId < 10 ? `0${userId}` : userId}</span>
                <div class="user__content">
                    <div class="user__info">
                        <img src="imgs/avatar.png" alt="Avatar">
                        <h2 class="name">${name}</h2> 
                        <h2 class="username">@${username}</h2> 
                    </div>

                    <div class="user__details">
                        <div class="details__box">
                            <i class="ri-mail-line"></i>
                            <p>${email}</p>
                        </div>
                        <div class="details__box">
                            <i class="ri-phone-fill"></i>
                            <p>${phone}</p>
                        </div>
                        <div class="details__box">
                            <i class="ri-global-line"></i>
                            <a href=""><p>${website}</p></a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append The Created 'userCard' To The 'resultsDiv'
        resultsDiv.insertAdjacentHTML("beforeend", userCard);

    });

};

/* -- Show / Hide App Guide -- */

const guideScreen = document.querySelector('.guide__screen');
const openGuideBtn = document.getElementById('open__guide');
const closeGuideBtn = document.getElementById('close__guide');

const openGuide = () => { guideScreen.classList.add('show') };

const closeGuide = () => { guideScreen.classList.remove('show') };

/* -- Copy The Photo Path Or URL Or Src -- */

const statusBox = document.getElementById('status__box');

/*

! This function is stoped because i add the ability to download the photo not copy its path (URL)

function copyPhotoPath(copyBtn) {

    // Get The Photo Element
    const photoEl = copyBtn.nextElementSibling;

    // Get The 'photoEl' Src Attribute
    const photoUrl = photoEl.src;
    
    // Use The Clipboard API To Copy The Url
    navigator.clipboard.writeText(photoUrl).then(() => {

        // Set The Status Box Class
        statusBox.setAttribute('class', 'success');

        // Set The Success 'statusBox' Format
        statusBox.innerHTML = `
            <i class="ri-checkbox-circle-fill"></i>
            <p>Photo Url Copied</p>
        `;

        // Show The 'statusBox'
        statusBox.classList.add('show');

        // Hide The 'statusBox' 
        setTimeout(() => { statusBox.classList.remove('show'); }, 3000);

    }).catch((error) => {

        // Set The Status Box Class
        statusBox.setAttribute('class', 'success');

        // Set The Success 'statusBox' Format
        statusBox.innerHTML = `
            <i class="ri-close-circle-fill"></i>
            <p>Failed To Copy Photo Url</p>
        `;

        // Show The 'statusBox'
        statusBox.classList.add('show');

        // Hide The 'statusBox' 
        setTimeout(() => { statusBox.classList.remove('show'); }, 3000);

    });
    
};

*/

/* -- Save & Manage Data In Local Storage -- */

function addDataToLS(dataObj) { localStorage.setItem('userData', JSON.stringify(dataObj)) };

function getDataFromLS() {

    // Check If There Is A Data In Local Storage
    if (localStorage.getItem('userData')) {

        // Get Data Stored In Local Storage
        const userData = JSON.parse(localStorage.getItem('userData')); 

        // Manage The Getted Data 
        manageDataFromLS(userData);

    };

}

document.addEventListener('DOMContentLoaded', getDataFromLS);

function manageDataFromLS(userData) {

    // Extract User Data Getted From Local Storage Using Desctructuring
    let { ordersNumber, resourceData, resourceType } = userData;

    // Remove 'active' Class From All Lis
    controllers.forEach(controller => controller.classList.remove('active'));

    // Set The Active Control Item Depends On 'resourceType'
    document.querySelector(`.controls__list .controls__item[data-resource=${resourceType}]`).classList.add('active');

    // Set The Number Input Value
    numberInput.value = ordersNumber;

    // Check For The 'resource' Before Displaying Data
    if (resourceType === 'posts') { displayPosts(resourceData) }
    else if (resourceType === 'comments') { displayComments(resourceData) }
    else if (resourceType === 'albums') { displayAlbums(resourceData) }
    else if (resourceType === 'photos') { displayPhotos(resourceData) }
    else if (resourceType === 'todos') { displayTodos(resourceData) }
    else if (resourceType === 'users') { displayUsers(resourceData) }

};
