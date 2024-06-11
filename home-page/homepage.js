// Keep dark mode from login page
const body = document.querySelector("body");
const darkMode = localStorage.getItem('dark') === 'true';
body.classList.toggle('dark', darkMode);

// Store username and update in navbar
document.addEventListener("DOMContentLoaded", () => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        document.getElementById("account-info").textContent = `Hi, ${storedUsername}`;
    }
    loadPosts();
});

// Toggle the dropdown menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenuIcon = document.querySelector('.fa-bars');
    const navMobile = document.querySelector('.nav-mobile');
    hamburgerMenuIcon.addEventListener('click', () => {
        navMobile.classList.toggle('openMenu');
    });
});

// Variables
const newPostBtn = document.querySelector('#post-button');
const newPostTextArea = document.querySelector('#new-post');
const newPostContainer = document.querySelector('#newPostContainer');
const sortButton = document.querySelector('#sort-by');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('#search-bar');
const signOutButton = document.querySelector('#sign-out');
let postsArray = JSON.parse(localStorage.getItem('posts')) || [];
let sortOption = 'newest'; // Default sort option

// Event Listeners
newPostBtn.addEventListener('click', createPost);
sortButton.addEventListener('change', sortPostArray);
searchButton.addEventListener('click', searchPosts);
signOutButton.addEventListener('click', signOut);

// Functions
function createPost() {
    const postContent = newPostTextArea.value;
    if (postContent.trim() === "") return;
    const post = createPostElement(postContent);
    newPostContainer.appendChild(post);
    postsArray.push({ content: postContent, timestamp: Date.now(), likes: 0, comments: [] });
    savePosts();
    newPostTextArea.value = '';
    sortAndDisplayPosts(); // Sort and display posts after creating a new one
}

function createPostElement(content, timestamp = Date.now(), likes = 0, comments = []) {
    const dateTimeString = new Date(timestamp).toLocaleString();
    const post = document.createElement('div');
    post.classList.add('post');

    const postText = document.createElement('h4');
    postText.textContent = `${content} - Posted on: ${dateTimeString}`;
    post.appendChild(postText);

    const closeBtn = createButton('x', 'close-btn', () => {
        post.remove();
        postsArray = postsArray.filter(p => p.timestamp !== timestamp);
        savePosts();
    });
    post.appendChild(closeBtn);

    const likeBtn = createLikeButton(likes, timestamp);
    post.appendChild(likeBtn);

    const commentSection = createCommentSection(comments, timestamp);
    post.appendChild(commentSection);

    return post;
}

function createButton(text, className, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.addEventListener('click', onClick);
    return button;
}

function createLikeButton(likes, timestamp) {
    const likeBtn = document.createElement('button');
    likeBtn.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> ${likes}`;
    likeBtn.addEventListener('click', () => {
        const post = postsArray.find(p => p.timestamp === timestamp);
        post.likes++;
        likeBtn.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> ${post.likes}`;
        savePosts();
    });
    return likeBtn;
}

function createCommentSection(comments, timestamp) {
    const commentSection = document.createElement('div');
    const commentList = document.createElement('ul');
    commentList.classList.add('comment-list');
    comments.forEach(comment => {
        const commentListItem = createCommentElement(comment.content, comment.timestamp, timestamp);
        commentList.appendChild(commentListItem);
    });
    const commentInput = document.createElement('textarea');
    commentInput.classList.add('comment-input'); // Add this line
    const commentSubmitButton = createButton('Add Comment', '', () => {
        const commentText = commentInput.value;
        if (commentText.trim() === "") return;
        const commentTimestamp = Date.now();
        const commentListItem = createCommentElement(commentText, commentTimestamp, timestamp);
        commentList.appendChild(commentListItem);
        const post = postsArray.find(p => p.timestamp === timestamp);
        post.comments.push({ content: commentText, timestamp: commentTimestamp });
        savePosts();
        commentInput.value = '';
        updateCommentListHeight(commentList); // Update comment list height if needed
    });

    commentSection.appendChild(commentList);
    commentSection.appendChild(commentInput);
    commentSection.appendChild(commentSubmitButton);

    updateCommentListHeight(commentList); // Update comment list height if needed

    return commentSection;
}

function createCommentElement(content, commentTimestamp, postTimestamp) {
    const dateTimeString = new Date(commentTimestamp).toLocaleString();
    const commentListItem = document.createElement('div');
    commentListItem.textContent = `${content} - Posted on: ${dateTimeString}`;

    const closeBtn = createButton('x', 'close-btn', () => {
        commentListItem.remove();
        const post = postsArray.find(p => p.timestamp === postTimestamp);
        post.comments = post.comments.filter(c => c.timestamp !== commentTimestamp);
        savePosts();
    });
    commentListItem.appendChild(closeBtn);

    return commentListItem;
}

function updateCommentListHeight(commentList) {
    if (commentList.children.length > 4) {
        commentList.style.maxHeight = '200px'; // Adjust this value as needed
        commentList.style.overflowY = 'scroll';
    } else {
        commentList.style.maxHeight = '';
        commentList.style.overflowY = '';
    }
}

function sortPostArray() {
    sortOption = sortButton.value;
    sortAndDisplayPosts();
}

function sortAndDisplayPosts() {
    if (postsArray.length > 0) {
        if (sortOption === 'oldest') {
            postsArray.sort((a, b) => a.timestamp - b.timestamp);
        } else {
            postsArray.sort((a, b) => b.timestamp - a.timestamp);
        }
        displayPosts();
    }
}

function displayPosts() {
    newPostContainer.innerHTML = '';
    postsArray.forEach(post => {
        const postElement = createPostElement(post.content, post.timestamp, post.likes, post.comments);
        newPostContainer.appendChild(postElement);
    });
}

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(postsArray));
}

function loadPosts() {
    postsArray = JSON.parse(localStorage.getItem('posts')) || [];
    sortAndDisplayPosts();
}

function searchPosts() {
    const query = searchInput.value.toLowerCase();
    const filteredPosts = postsArray.filter(post => post.content.toLowerCase().includes(query));
    newPostContainer.innerHTML = '';
    filteredPosts.forEach(post => {
        const postElement = createPostElement(post.content, post.timestamp, post.likes, post.comments);
        newPostContainer.appendChild(postElement);
    });
}

function signOut() {
    localStorage.removeItem('username');
    window.location.href = '../login-page/login.html';
}
