// Helper to update the grand total
function updateGrandTotal() {
    let total = 0;
    document.querySelectorAll('.item-total').forEach(span => {
        total += parseFloat(span.textContent);
    });
    document.querySelector('.grand-total').textContent = total.toFixed(2);
}

// Handle plus/minus buttons
document.querySelectorAll('.cart-item').forEach(item => {
    const minusBtn = item.querySelector('.minus-btn');
    const plusBtn = item.querySelector('.plus-btn');
    const quantitySpan = item.querySelector('.quantity');
    const unitPrice = parseFloat(item.querySelector('.unit-price').textContent);
    const itemTotal = item.querySelector('.item-total');

    minusBtn.addEventListener('click', () => {
        let qty = parseInt(quantitySpan.textContent);
        if (qty > 1) {
            qty--;
            quantitySpan.textContent = qty;
            itemTotal.textContent = (unitPrice * qty).toFixed(2);
            updateGrandTotal();
        }
    });

    plusBtn.addEventListener('click', () => {
        let qty = parseInt(quantitySpan.textContent);
        qty++;
        quantitySpan.textContent = qty;
        itemTotal.textContent = (unitPrice * qty).toFixed(2);
        updateGrandTotal();
    });

    // Delete button
    item.querySelector('.delete-btn').addEventListener('click', () => {
        item.remove();
        updateGrandTotal();
    });

    // Like button
    item.querySelector('.like-btn').addEventListener('click', function() {
        this.querySelector('i').classList.toggle('fas');
        this.querySelector('i').classList.toggle('far');
        this.style.color = this.style.color === 'red' ? '' : 'red';
    });
});