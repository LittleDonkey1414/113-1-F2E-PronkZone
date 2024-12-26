$(document).ready(function () {
    // 下拉選單切換
    $('.cart > li > a').click(function (event) {
        event.preventDefault(); // 阻止默認跳轉行為
        $(this).toggleClass('active'); // 切換樣式
        $(this).next('ul').slideToggle(200); // 展開/收起子選單
    });
});

function scrollGallery(direction) {
    const gallery = document.querySelector('.scroll_gallery');
    const scrollAmount = 300; // 每次滑動的距離
    gallery.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 初始化 Supabase
const supabaseUrl = "https://ouhmuenydxyzotcbhkkm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91aG11ZW55ZHh5em90Y2Joa2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Nzk4OTQsImV4cCI6MjA1MDI1NTg5NH0.9Yf4kVtgTZtw1sFUlAwF1NN7IofniZlitZJfzyFWAww";
const supabase = createClient(supabaseUrl, supabaseKey);

// 從 URL 解析商品 ID
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
    console.log("解析出的商品 ID:", productId);
    loadProductDetails(productId);
} else {
    alert("未提供商品 ID，將返回商品列表！");
    window.location.href = "products.html";
}

async function loadProductDetails(productId) {
    try {
        console.log("解析出的商品 ID:", productId);

        // 從 Supabase 查詢商品資料
        const { data: product, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .maybeSingle(); // 使用 maybeSingle() 代替 single()

        if (error) throw error;
        if (!product) {
            throw new Error("未找到商品資料，請確認商品 ID 是否正確！");
        }

        console.log("查詢結果:", product);

        // 更新商品內容（檢查元素是否存在）
        if (document.getElementById('product-image')) {
            document.getElementById('product-image').src = product.image_url;
        }
        if (document.getElementById('product-name')) {
            document.getElementById('product-name').textContent = product.name;
        }
        if (document.getElementById('product-description')) {
            document.getElementById('product-description').textContent = product.description;
        }
        if (document.getElementById('product-specifications')) {
            document.getElementById('product-specifications').textContent = product.specifications;
        }
        if (document.getElementById('product-packaging')) {
            const packagingContent = product.packaging || "無包裝資料";
            document.getElementById('product-packaging').textContent = packagingContent;
            console.log("包裝及內容物:", packagingContent);
        }
        if (document.getElementById('ad-image-1')) {
            document.getElementById('ad-image-1').src = product.ads_url1;
        }
        if (document.getElementById('ad-image-2')) {
            document.getElementById('ad-image-2').src = product.ads_url2;
        }
        if(document.getElementById('ad-image-3')) {
            document.getElementById('ad-image-3').src = product.ads_url3;
        }

    } catch (err) {
        console.error("無法加載商品資料：", err.message);
        alert("商品資料加載失敗：" + err.message);
        window.location.href = "products.html";
    }
}