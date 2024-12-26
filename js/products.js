import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 初始化 Supabase
const supabaseUrl = "https://ouhmuenydxyzotcbhkkm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91aG11ZW55ZHh5em90Y2Joa2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Nzk4OTQsImV4cCI6MjA1MDI1NTg5NH0.9Yf4kVtgTZtw1sFUlAwF1NN7IofniZlitZJfzyFWAww";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    const productData = [
        { id: "Stick", elementId: "product_1" },
        { id: "Instant noodle", elementId: "product_2" },
        { id: "BY2", elementId: "product_3" },
        { id: "Mask", elementId: "product_4" },
        { id: "pro Version", elementId: "product_5" },
        { id: "Dryer", elementId: "product_6" },
        { id: "Gum", elementId: "product_7" },
        { id: "Fake Mouse", elementId: "product_8" },
        { id: "Chew", elementId: "product_9" },
        { id: "Duck", elementId: "product_10" }
    ];

    for (const product of productData) {
        try {
            // 從 Supabase 的 product_picture Bucket 中獲取圖片公開 URL
            const { data, error } = supabase.storage.from('product_picture').getPublicUrl(`${product.id}.png`);
            if (error) throw error;

            console.log(`成功獲取 ${product.id} 的圖片: ${data.publicUrl}`);
            
            // 找到對應的 HTML 區塊，並更新圖片
            const productElement = document.querySelector(`#${product.elementId} img`);
            if (productElement) {
                productElement.src = data.publicUrl; // 更新圖片的來源 URL
            }
        } catch (err) {
            console.error(`無法取得 ${product.id} 的圖片:`, err.message);
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.querySelector('.filter-series');
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.querySelectorAll('.product-grid-item'));

    // 監聽篩選器變化
    filterForm.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            filterProducts();
        }
    });

    function filterProducts() {
        const checkedBoxes = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'));
        const selectedCategories = checkedBoxes.map(checkbox => checkbox.value);

        // 如果沒有選中任何篩選器，則顯示所有產品
        if (selectedCategories.length === 0) {
            products.forEach(product => product.style.display = 'block');
            return;
        }

        products.forEach(product => {
            const productCategories = product.querySelector('.product-dscrp').classList;
            const matches = selectedCategories.some(category => productCategories.contains(category));
            product.style.display = matches ? 'block' : 'none';
        });
    }
});