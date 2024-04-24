document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('food-form');
    const foodCardsContainer = document.getElementById('content-section');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const foodName = document.getElementById('name').value.trim();
        const foodDescription = document.getElementById('description').value.trim();
        const foodImageUrl = document.getElementById('image-url').value.trim();
        const foodRank = parseInt(document.getElementById('rank').value);

        if (foodName === '' || foodDescription === '' || foodImageUrl === '' || isNaN(foodRank)) {
            alert('Please fill in all fields correctly.');
            return;
        }   

        const newFoodCard = createFoodCard(foodName, foodDescription, foodImageUrl, foodRank);
        insertFoodCard(newFoodCard, foodRank);
        form.reset();
    });

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

        return card;
    }

    function insertFoodCard(card, rank) {
        const cards = foodCardsContainer.children;
        let inserted = false;

        for (let i = 0; i < cards.length; i++) {
            const cardRank = parseInt(cards[i].querySelector('h2').textContent);
            if (cardRank < rank) {
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