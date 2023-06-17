// Get elements by class name
const layoutContainer = document.getElementsByClassName('layout-container')[0];
const loadMoreButton = document.getElementsByClassName('load-more-btn')[0].firstElementChild;
const sliderMode = document.querySelectorAll('input')[0];

// Define variables
let posts = [];
let newPosts = [];

// Fetch data
fetch('./data.json').then(res => {
    res.json().then(data => {
        posts = data;
        // Showing 4 posts when first time is loaded
        for(let i = 0; i < 4; i++) {
            newPosts.push(posts.shift());
        }
        displayPosts(newPosts);
    });
});

// Functionality
function displayPosts(postsArr) {
    postsArr.forEach(post => {
        layoutContainer.innerHTML += 
        `
            <div class="card">
                <div class="card-header">
                    <div class="avatar col-2">
                        <a href="${post.source_link}" target='_blank'>
                            <img src="${post.profile_image}" alt="${post.type}" />
                        </a>
                    </div>
                    <h5 class="card-author col-8">
                        <a href="${post.source_link}" target="_blank">${post.name}</a>
                    </h5>
                    <div class="post-date col-6">
                        <p>${new Date(post.date).toDateString()}</p>
                    </div>
                    <div class="caption col-12">
                        <span>${post.caption}</span>
                    </div>
                </div>
                <div class="card-img">
                    <a href="${post.image}" target="_blank">
                        <img src='${post.image}' alt="${post.type}" />
                    </a>
                </div>
                <div class="card-footer">
                    <div class="col-12" style="text-align:center">
                        Likes: ${post.likes}
                    </div>
                    <div class="col-12"> <hr /> </div>
                    <div class="col-4 like">Like</div>
                    <div class="col-4 comment">Comment</div>
                    <div class="col-4 share">Share</div>
                </div>
            </div>
        `;
    });
}

// Event Listeners
sliderMode.addEventListener('change', function (ev) {
    const slider = document.getElementsByClassName('slider')[0];
    
    if (ev.target.checked) {
        document.body.style.background = '#1c1e21';
        document.body.style.color = 'white';
        document.body.querySelectorAll('a').forEach(aEl => {
            aEl.style.color = 'white';
        });
        slider.style.setProperty('color', 'black');
    } else {
        document.body.style.background = '#f9fafd';
        document.body.style.color = '#000000';
        document.body.querySelectorAll('a').forEach(aEl => {
            aEl.style.color = 'black';
        });
    }
});

loadMoreButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    let tempPosts = [];

    if (posts.length > 0) {
        for (let i = 0; i < 4; i++) {
            tempPosts.push(posts.shift());
        }
    
        let tempEl = document.createElement('div');
        tempEl.classList.add('layout-container');
    
        tempPosts.forEach(post => {
            tempEl.innerHTML +=
            `
                <div class="card">
                    <div class="card-header">
                        <div class="avatar col-2">
                            <a href="${post.source_link}" target='_blank'>
                                <img src="${post.profile_image}" alt="${post.type}" />
                            </a>
                        </div>
                        <h5 class="card-author col-8">
                            <a href="${post.source_link}" target="_blank">${post.name}</a>
                        </h5>
                        <div class="post-date col-6">
                            <p>${new Date(post.date).toDateString()}</p>
                        </div>
                        <div class="caption col-12">
                            <span>${post.caption}</span>
                        </div>
                    </div>
                    <div class="card-img">
                        <a href="${post.image}" target="_blank">
                            <img src='${post.image}' alt="${post.type}" />
                        </a>
                    </div>
                    <div class="card-footer">
                        <div class="col-12" style="text-align:center">
                            Likes: ${post.likes}
                        </div>
                        <div class="col-12"> <hr /> </div>
                        <div class="col-4 like">Like</div>
                        <div class="col-4 comment">Comment</div>
                        <div class="col-4 share">Share</div>
                    </div>
                </div>
            `;
        });

        document.body.appendChild(tempEl);
        tempEl.scrollIntoView({ behavior: 'smooth' });

        if (sliderMode.checked) {
            document.body.querySelectorAll('a').forEach(aEl => {
                aEl.style.color = 'white';
            });
        } else {
            document.body.querySelectorAll('a').forEach(aEl => {
                aEl.style.color = 'black';
            });
        }

        newPosts.push(...tempPosts);
    } else {
        alert('There are no more posts to show!');
    }
});

// Show button for mobile version
window.addEventListener('scroll', function () {
    if (window.innerWidth < 768) {
        if (window.scrollY > 0) {
            loadMoreButton.style.background = '#dbdbdb';
            loadMoreButton.style.opacity = "1";
        } else {
            loadMoreButton.style.background = '#fff';
            loadMoreButton.style.opacity = "0.1";
        }
    } else {
        loadMoreButton.style.opacity = "0.1";
    }
})
