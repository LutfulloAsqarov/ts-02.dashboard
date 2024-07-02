const tbody = document.querySelector("tbody");
const categoriesList = document.querySelector(".categories__list");
// console.log(category);

const API_URL = "https://dummyjson.com";

async function fetchData(api, category = "") {
    let url = `${api}/products`;
    if (category && category !== "all") {
        url = `${api}/products/category/${category}`;
    } else {
        url = `${api}/products`;
    }
    let data = await fetch(url);
    data.json()
        .then((res) => createCart(res))
        .catch((err) => console.log(err));
}

fetchData(API_URL);

async function fetchCategories(api) {
    let categoriesData = await fetch(`${api}/products/categories`);
    categoriesData
        .json()
        .then((res) => mapCategories(res))
        .catch((err) => console.log(err));
}

fetchCategories(API_URL);

function createCart(data) {
    let carts = "";

    data.products.forEach((el) => {
        carts += `
            <tr class="products__cart">
            <td class="products__cart__brand">
                <div class="products__cart__img">
                    <img src=${el.images[0]} alt="image" />
                </div>
                ${el.brand}
            </td>
            <td>${el.title}</td>
            <td>${el.price}$</td>
        </tr>
        `;
    });

    tbody.innerHTML = carts;
}

function mapCategories(categoriesData) {
    let categories = `<li>all</li>`;

    categoriesData.forEach((category) => {
        categories += `
            <li>${category.slug}</li>
        `;
    });
    categoriesList.innerHTML = categories;
}

categoriesList.addEventListener("click", (e) => {
    let categoryValue = e.target.innerHTML;
    fetchData(API_URL, categoryValue);
});
