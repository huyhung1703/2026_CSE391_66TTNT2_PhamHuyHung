let students = [];
let sortDir = 0;

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const statsArea = document.getElementById('statsArea');

const getRank = (score) => {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
};

function renderTable(dataToRender) {
    tableBody.innerHTML = '';
    
    if (dataToRender.length === 0) {
        document.getElementById('noResult').style.display = 'block';
    } else {
        document.getElementById('noResult').style.display = 'none';
        dataToRender.forEach((sv, index) => {
            const row = document.createElement('tr');
            if (sv.score < 5) row.classList.add('bg-warning');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${sv.name}</td>
                <td>${sv.score.toFixed(1)}</td>
                <td>${getRank(sv.score)}</td>
                <td><button class="btn-delete" data-id="${sv.id}">Xóa</button></td>
            `;
            tableBody.appendChild(row);
        });
    }
    updateStats(dataToRender);
}

function updateStats(data) {
    const total = data.length;
    const avg = total > 0 
        ? (data.reduce((sum, sv) => sum + sv.score, 0) / total).toFixed(2) 
        : "0.0";
    statsArea.innerHTML = `Tổng số SV: ${total} | Điểm trung bình: ${avg}`;
}

function applyFilters() {
    const keyword = document.getElementById('searchName').value.toLowerCase().trim();
    const rankFilter = document.getElementById('filterRank').value;

    let result = students.filter(sv => {
        const matchesName = sv.name.toLowerCase().includes(keyword);
        const matchesRank = rankFilter === "all" || getRank(sv.score) === rankFilter;
        return matchesName && matchesRank;
    });

    if (sortDir !== 0) {
        result.sort((a, b) => {
            return sortDir === 1 ? a.score - b.score : b.score - a.score;
        });
    }

    renderTable(result);
}

function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Dữ liệu không hợp lệ! Vui lòng kiểm tra lại tên và điểm (0-10).");
        return;
    }

    students.push({ id: Date.now(), name, score });

    nameInput.value = '';
    scoreInput.value = '';
    nameInput.focus();

    applyFilters();
}

btnAdd.addEventListener('click', addStudent);
scoreInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addStudent(); });

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        students = students.filter(sv => sv.id !== idToDelete);
        applyFilters();
    }
});

document.getElementById('searchName').addEventListener('input', applyFilters);
document.getElementById('filterRank').addEventListener('change', applyFilters);

document.getElementById('sortScore').addEventListener('click', () => {
    if (sortDir === 0) sortDir = 1;
    else if (sortDir === 1) sortDir = -1;
    else sortDir = 0;

    const icons = { '0': '↕', '1': '▲', '-1': '▼' };
    document.getElementById('sortIcon').innerText = icons[sortDir];
    applyFilters();
});