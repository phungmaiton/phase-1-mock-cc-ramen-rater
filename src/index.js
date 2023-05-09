// write your code here

const ramenMenu = document.querySelector('#ramen-menu');
const ramenDetails = document.querySelector('#ramen-detail');
const ratingDisplay = document.querySelector('#rating-display');
const commentDisplay = document.querySelector('#comment-display');
const detailImage = document.querySelector('.detail-image');
const detailName = document.querySelector('#detail-name');
const detailRestaurant = document.querySelector('#detail-restaurant');

//Render Ramen

fetch ('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(ramenObject => {
        ramenObject.forEach(ramen => renderRamen(ramen));
        defaultRamen(ramenObject);
    })

const renderRamen = (ramen) => {
    const ramenImage = document.createElement('img');
    ramenImage.src = ramen.image;
    ramenMenu.appendChild(ramenImage);


    ramenImage.addEventListener('click', () => {
        ratingDisplay.innerHTML = ramen.rating;
        commentDisplay.innerHTML = ramen.comment;
        detailImage.src = ramen.image;
        detailName.innerHTML = ramen.name;
        detailRestaurant.innerHTML = ramen.restaurant;
    })

}

//Create Ramen

const ramenForm = document.querySelector('#new-ramen');

ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ramenName = document.querySelector('#new-name').value;
    const ramenRestaurant = document.querySelector('#new-restaurant').value;
    const ramenImage = document.querySelector('#new-image').value;
    const ramenRating = document.querySelector('#new-rating').value;
    const ramenComment = document.querySelector('#new-comment').value;

    document.querySelector('#new-name').value = '';
    document.querySelector('#new-restaurant').value = '';
    document.querySelector('#new-image').value = '';
    document.querySelector('#new-rating').value = '';
    document.querySelector('#new-comment').value = '';

    fetch('http://localhost:3000/ramens',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": ramenName,
            "restaurant": ramenRestaurant,  
            "image": ramenImage,
            "rating": parseInt(ramenRating),
            "comment": ramenComment 
        })
    })
    .then(resp => resp.json())
    .then(ramen => renderRamen(ramen))

  })

//Default

function defaultRamen(ramenObject) {
    const defaultRamen = ramenObject[0];
    ratingDisplay.innerHTML = defaultRamen.rating;
    commentDisplay.innerHTML = defaultRamen.comment;
    detailImage.src = defaultRamen.image;
    detailName.innerHTML = defaultRamen.name;
    detailRestaurant.innerHTML = defaultRamen.restaurant;
}

//Update Rating

const updateForm = document.querySelector('#edit-ramen');

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRating = document.querySelector('#new-rating');
    const newComment = document.querySelector('#new-comment');
    
    fetch(`http://localhost:3000/ramens/${ramen.id}`,{
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "rating": parseInt(newRating.value),
            "comment": newComment.value
        })
    })
        .then(resp => resp.json())
        .then(ramen => renderRamen(ramen))
})
