function attachEvents() {
    
    const selectPostElement = document.getElementById('posts');

    const loadPostsButton = document.getElementById('btnLoadPosts');
    loadPostsButton.addEventListener('click', loadPostsButtonClick);

    const viewPostButton = document.getElementById('btnViewPost');
    viewPostButton.addEventListener('click', viewPostButtonClick);

    const postsUrl = `http://localhost:3030/jsonstore/blog/posts/`;
    const commentsUrl = `http://localhost:3030/jsonstore/blog/comments/`;

    function loadPostsButtonClick(){

        //create option element for each post from the server response
        fetch(postsUrl)
            .then(response => response.json())
            .then(data => {
                
                for (const key of Object.keys(data)) {
                    
                    let optionElement = document.createElement('option');
                    optionElement.value = key;
                    optionElement.text = data[key].title;
                    selectPostElement.appendChild(optionElement);
                }
            })
    }

    function viewPostButtonClick(){

        clearPreviousCommentDetails();

        //post data request
        fetch(postsUrl + selectPostElement.value)
            .then(response => response.json())
            .then(postData => {

                document.getElementById('post-title').textContent = postData.title;

                let postBodyElement = document.createElement('li');
                postBodyElement.textContent = postData.body;
                document.getElementById('post-body').appendChild(postBodyElement);
                
            })

        //comments data request
        fetch(commentsUrl)
            .then(response => response.json())
            .then(commentsData => {

                let currPostComments = [];

                //get all the comments for the current post
                for (const key in commentsData) {
                    if(commentsData[key].postId === selectPostElement.value){
                        currPostComments.push(commentsData[key]);
                    }
                }

                //attach li element for each comment
                for (const comment of currPostComments) {
                    
                    let commentLiElement = document.createElement('li');
                    commentLiElement.textContent = comment.text;
                    document.getElementById('post-comments').appendChild(commentLiElement);
                }
            })
    }

    //clear previous post details when a request for new post is made.
    function clearPreviousCommentDetails(){

        document.getElementById('post-body').innerHTML = '';
        document.getElementById('post-comments').innerHTML = '';
    }
}

attachEvents();