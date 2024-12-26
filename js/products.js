import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 初始化 Supabase
const supabaseUrl = "https://ouhmuenydxyzotcbhkkm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91aG11ZW55ZHh5em90Y2Joa2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Nzk4OTQsImV4cCI6MjA1MDI1NTg5NH0.9Yf4kVtgTZtw1sFUlAwF1NN7IofniZlitZJfzyFWAww";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    const productData = [
        { id: "Stick", elementId: "product1" },
        { id: "Instant noodle", elementId: "product2" },
        { id: "BY2", elementId: "product3" },
        { id: "Mask", elementId: "product4" },
        { id: "pro Version", elementId: "product5" },
        { id: "Dryer", elementId: "product6" },
        { id: "Gum", elementId: "product7" },
        { id: "Fake Mouse", elementId: "product8" },
        { id: "Chew", elementId: "product9" },
        { id: "Duck", elementId: "product10" }
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
async function loadProducts() {
    const { data: products, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error("無法加載商品資料：", error.message);
        return;
    }

    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-grid-item';
        productItem.innerHTML = `
            <a href="products_pages.html?id=${product.id}" class="product-dscrp">
                <img src="${product.image_url}" alt="${product.name}" class="product-img">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </a>
        `;
        productGrid.appendChild(productItem);
    });
}

document.addEventListener('DOMContentLoaded', loadProducts);