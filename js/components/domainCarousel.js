import { mockDomainTypes } from "../../db/domainTypes.js";

const renderCarousel = data => {
    const html = data.map((item) => `
                <div
                    class="d-flex  bg-gray-100 border border-gray-400 align-items-center justify-content-center px-3 py-2 rounded-lg">
                    <h5 class="pl-1 m-0 font-weight-bold">${item.domain}</h5>
                    <s class="px-2 m-0">${item.price}</s>
                    <h5 class="pr-1 m-0 font-weight-bold">$${item.discountedPrice}</h5>
                </div>
    `).join("");

    document.getElementById("multiple-carousel").innerHTML = html;

}

renderCarousel(mockDomainTypes)
