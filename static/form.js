document.addEventListener("DOMContentLoaded", function() {
    // get references to the form and the container
    const form = document.getElementById('food-form');
    const foodCardsContainer = document.getElementById('content-section');

    // event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent default form submission behavior
        
        // get input values from the form
        const foodName = document.getElementById('name').value.trim();
        const foodDescription = document.getElementById('description').value.trim();
        const foodImageUrl = document.getElementById('image-url').value.trim();
        const foodRank = parseInt(document.getElementById('rank').value);

        // validate input fields
        if (foodName === '' || foodDescription === '' || foodImageUrl === '' || isNaN(foodRank)) {
            alert('Please fill in all fields correctly.');
            return;
        }   

        // create a new food card with the input data
        createFoodCard(foodName, foodDescription, foodImageUrl, foodRank);
        form.reset(); // reset the form
    });

    // function to create a new food card element and insert it into the container based on its rank
    function createFoodCard(name, description, imageUrl, rank) {
        const card = document.createElement('div');
        card.classList.add('content-item');

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = name;

        const title = document.createElement('h2');
        title.textContent = name;

        const desc = document.createElement('p');
        desc.textContent = description;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            card.remove();
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(deleteBtn);

        // insert the card into the container based on its rank
        const cards = foodCardsContainer.children;
        let inserted = false;

        for (let i = 0; i < cards.length; i++) {
            const cardRank = cards[i].getAttribute(rank);
            if (cardRank <= rank) {
                foodCardsContainer.insertBefore(card, cards[i]);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            foodCardsContainer.appendChild(card);
        }
    }
});