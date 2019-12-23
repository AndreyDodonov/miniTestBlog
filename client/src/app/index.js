
let modal;
let posts = [];
const BASE_URL = '/api/post';

// RENDER CARDS

const card = (post) => {
    return `
               <div class="card z-depth-4">
                    <div class="card-content">
                        <span class="card-title">${post.title}</span>
                        <p>${post.text}</p>
                        <small>${post.date}</small>
                    </div>
                    <div class="card-action">
                        <button class="btn btn-medium waves-effect waves-light red">
                            <i class="material-icons left">delete_forever</i> УДОЛИ
                        </button>
                    </div>
                </div>    
    `
};


function renderPosts(_posts = []) {
    const $posts = document.querySelector('#posts');

    if (_posts.length > 0) {
        $posts.innerHTML = _posts.map(post => card(post)).join(' ');
    } else {
        $posts.innerHTML = `<div class="center"> <h5>Постов пока нет</h5> </div>`
    }
}

class PostApi {
    static fetch() {
        return fetch(BASE_URL, {method: 'get'}).then((res) => res.json());
    }

    static create(post) {
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(post),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }
}

// create post
function onCreatePost() {
    const $title = document.querySelector('#title');
    const $text = document.querySelector('#text');

    if ($title.value && $text.value) {
        const newPost = {
            title: $title.value,
            text: $text.value
        };
        PostApi.create(newPost).then(post => {
            posts.push(post);
            renderPosts(posts);
        });
        modal.close();
        $title.value = '';
        $text.value = '';
        M.updateTextFields();
    }

}

document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch().then(backendPosts => {
        posts = backendPosts.concat();
        renderPosts(posts)
    });
    // init modal windows
    modal = M.Modal.init(document.querySelector('.modal'));
    document.querySelector('#createPost').addEventListener('click', onCreatePost);
    // init mobile hamburger menu
    let menuElems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(menuElems);
});






