document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-container');
    const grandTotalEl = document.querySelector('.grand-total');

    const updateGrandTotal = () => {
        let total = 0;
        cartContainer.querySelectorAll('.cart-item .item-total').forEach(el => total += parseFloat(el.textContent));
        grandTotalEl.textContent = total.toFixed(2);
    };

    const updateItemTotal = (itemEl) => {
        const unitPrice = parseFloat(itemEl.querySelector('.unit-price').textContent);
        const quantity = parseInt(itemEl.querySelector('.quantity').textContent);
        itemEl.querySelector('.item-total').textContent = (unitPrice * quantity).toFixed(2);
        updateGrandTotal();
    };

    cartContainer.addEventListener('click', e => {
        const itemEl = e.target.closest('.cart-item');
        if (!itemEl) return;

        const quantityEl = itemEl.querySelector('.quantity');

        if (e.target.classList.contains('plus-btn')) {
            quantityEl.textContent = parseInt(quantityEl.textContent) + 1;
            updateItemTotal(itemEl);
        } else if (e.target.classList.contains('minus-btn')) {
            let qty = parseInt(quantityEl.textContent);
            if (qty > 1) {
                quantityEl.textContent = qty - 1;
                updateItemTotal(itemEl);
            }
        } else if (e.target.classList.contains('delete-btn')) {
            itemEl.remove();
            updateGrandTotal();
        } else if (e.target.closest('.like-btn')) {
            const likeBtn = e.target.closest('.like-btn');
            likeBtn.classList.toggle('liked');
            const heartIcon = likeBtn.querySelector('i');
            if (heartIcon) { // For Font Awesome icon swap
                heartIcon.classList.toggle('far', !likeBtn.classList.contains('liked'));
                heartIcon.classList.toggle('fas', likeBtn.classList.contains('liked'));
                // For FA6: heartIcon.classList.toggle('fa-regular', !likeBtn.classList.contains('liked'));
                // For FA6: heartIcon.classList.toggle('fa-solid', likeBtn.classList.contains('liked'));
            }
        }
    });

    // Initial calculation
    cartContainer.querySelectorAll('.cart-item').forEach(updateItemTotal);
    if (cartContainer.querySelectorAll('.cart-item').length === 0) {
        updateGrandTotal(); // Ensure 0.00 if cart is empty initially
    }
});