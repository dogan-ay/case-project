const data = [
    { extension: '.com', kayıt: 10, yenileme: 9, transfer: 8 },
    { extension: '.org', kayıt: 12, yenileme: 11, transfer: 10 },
    { extension: '.tr', kayıt: 15, yenileme: 14, transfer: 13 },
    { extension: '.com', kayıt: 11, yenileme: 10, transfer: 9 },
    { extension: '.org', kayıt: 13, yenileme: 12, transfer: 11 },
    { extension: '.tr', kayıt: 16, yenileme: 15, transfer: 14 },
    { extension: '.com', kayıt: 17, yenileme: 16, transfer: 15 },
    { extension: '.org', kayıt: 18, yenileme: 17, transfer: 16 },
    { extension: '.tr', kayıt: 19, yenileme: 18, transfer: 17 },
    { extension: '.com', kayıt: 20, yenileme: 19, transfer: 18 },
    { extension: '.org', kayıt: 21, yenileme: 20, transfer: 19 },
    { extension: '.tr', kayıt: 22, yenileme: 21, transfer: 20 },
    { extension: '.com', kayıt: 23, yenileme: 22, transfer: 21 },
    { extension: '.org', kayıt: 24, yenileme: 23, transfer: 22 },
    { extension: '.tr', kayıt: 25, yenileme: 24, transfer: 23 },
    { extension: '.com', kayıt: 26, yenileme: 25, transfer: 24 },
    { extension: '.org', kayıt: 27, yenileme: 26, transfer: 25 },
    { extension: '.tr', kayıt: 28, yenileme: 27, transfer: 26 },
    { extension: '.com', kayıt: 29, yenileme: 28, transfer: 27 },
    { extension: '.org', kayıt: 30, yenileme: 29, transfer: 28 },
    { extension: '.tr', kayıt: 31, yenileme: 30, transfer: 29 },
    { extension: '.com', kayıt: 32, yenileme: 31, transfer: 30 },
    { extension: '.org', kayıt: 33, yenileme: 32, transfer: 31 },
    { extension: '.tr', kayıt: 34, yenileme: 33, transfer: 32 },
];

let currentCurrency = 'USD'; // Başlangıçta dolar
let exchangeRate = 33; // TL/USD kur oranı örneği
let currentPage = 1;
const rowsPerPage = 6;

document.addEventListener('DOMContentLoaded', function() {
    renderTable('.com');

    document.querySelectorAll('input[name="extension"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            currentPage = 1;
            renderTable(event.target.value);
        });
    });

    document.getElementById('currencyButton').addEventListener('click', () => {
        currentCurrency = currentCurrency === 'USD' ? 'TRY' : 'USD';
        renderTable(document.querySelector('input[name="extension"]:checked').value);
    });

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = parseInt(event.target.getAttribute('data-page'));
            renderTable(document.querySelector('input[name="extension"]:checked').value);
        });
    });
});

function renderTable(extensionFilter) {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = '';

    const filteredData = data.filter(row => row.extension === extensionFilter);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    paginatedData.forEach(row => {
        const kayıt = currentCurrency === 'USD' ? row.kayıt : (row.kayıt * exchangeRate).toFixed(2);
        const yenileme = currentCurrency === 'USD' ? row.yenileme : (row.yenileme * exchangeRate).toFixed(2);
        const transfer = currentCurrency === 'USD' ? row.transfer : (row.transfer * exchangeRate).toFixed(2);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.extension}</td>
            <td>${kayıt} ${currentCurrency}</td>
            <td>${yenileme} ${currentCurrency}</td>
            <td>${transfer} ${currentCurrency}</td>
        `;
        tableBody.appendChild(tr);
    });

    renderPagination(filteredData.length);
}

function renderPagination(totalRows) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === currentPage ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
        pagination.appendChild(li);
    }

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = parseInt(event.target.getAttribute('data-page'));
            renderTable(document.querySelector('input[name="extension"]:checked').value);
        });
    });
}