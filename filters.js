// Enhanced filter functionality for all product pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filters for each product grid
    document.querySelectorAll('.bg-white.p-4.rounded-lg').forEach(filterSection => {
        const applyBtn = filterSection.querySelector('button');
        const priceMin = filterSection.querySelector('input[placeholder="Min"]');
        const priceMax = filterSection.querySelector('input[placeholder="Max"]');
        const typeSelect = filterSection.querySelectorAll('select')[0];
        const subTypeSelect = filterSection.querySelectorAll('select')[1];
        const productCount = filterSection.closest('.container').querySelector('.text-gray-500');
        const productGrid = filterSection.nextElementSibling;

        applyBtn.addEventListener('click', function() {
            applyFilters({
                minPrice: parseFloat(priceMin.value) || 0,
                maxPrice: parseFloat(priceMax.value) || Infinity,
                type: typeSelect.value.toLowerCase(),
                subType: subTypeSelect.value.toLowerCase(),
                productGrid,
                productCount
            });
        });

        // Auto-apply when select changes
        [typeSelect, subTypeSelect].forEach(select => {
            select.addEventListener('change', () => applyBtn.click());
        });
    });
});

function applyFilters({minPrice, maxPrice, type, subType, productGrid, productCount}) {
    let visibleCount = 0;
    
    productGrid.querySelectorAll('.bg-white.rounded-lg').forEach(product => {
        try {
            const priceText = product.querySelector('.text-green-600').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
            const productTitle = product.querySelector('h3').textContent.toLowerCase();
            const productDesc = product.querySelector('p').textContent.toLowerCase();

            const priceMatch = price >= minPrice && price <= maxPrice;
            const typeMatch = !type || productTitle.includes(type) || productDesc.includes(type);
            const subTypeMatch = !subType || productDesc.includes(subType);

            if (priceMatch && typeMatch && subTypeMatch) {
                product.style.display = 'block';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        } catch (e) {
            console.error('Error filtering product:', e);
        }
    });

    if (productCount) {
        productCount.textContent = `(${visibleCount} products)`;
    }
}
