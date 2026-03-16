const productPrices = {
    "Laptop": 20000000,
    "Iphone": 25000000,
    "AirPods": 5000000
};

const form = document.getElementById('orderForm');
const fields = ['product', 'quantity', 'deliveryDate', 'address', 'note'];

function updateUI() {

    const product = document.getElementById('product').value;
    const qty = parseInt(document.getElementById('quantity').value) || 0;
    const total = (productPrices[product] || 0) * qty;
    document.getElementById('totalDisplay').innerText = total.toLocaleString('vi-VN') + "đ";

    const noteVal = document.getElementById('note').value;
    const countLabel = document.getElementById('currentChar');
    countLabel.innerText = noteVal.length;
    countLabel.style.color = noteVal.length > 200 ? "red" : "#666";
}

document.getElementById('product').addEventListener('change', updateUI);
document.getElementById('quantity').addEventListener('input', updateUI);
document.getElementById('note').addEventListener('input', () => {
    updateUI();
    clearError('note');
});

function showError(id, msg) {
    document.getElementById(id).classList.add('invalid');
    document.getElementById(`err-${id}`).innerText = msg;
}

function clearError(id) {
    document.getElementById(id).classList.remove('invalid');
    document.getElementById(`err-${id}`).innerText = '';
}

const validateProduct = () => {
    const val = document.getElementById('product').value;
    if (!val) { showError('product', "Vui lòng chọn một sản phẩm"); return false; }
    clearError('product'); return true;
};

const validateQuantity = () => {
    const val = parseInt(document.getElementById('quantity').value);
    if (isNaN(val) || val < 1 || val > 99) { showError('quantity', "Số lượng từ 1 - 99"); return false; }
    clearError('quantity'); return true;
};

const validateDeliveryDate = () => {
    const val = document.getElementById('deliveryDate').value;
    if (!val) { showError('deliveryDate', "Vui lòng chọn ngày giao"); return false; }
    
    const selectedDate = new Date(val).setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);
    const maxDate = today + (30 * 24 * 60 * 60 * 1000);

    if (selectedDate < today) { showError('deliveryDate', "Không được chọn ngày quá khứ"); return false; }
    if (selectedDate > maxDate) { showError('deliveryDate', "Không quá 30 ngày từ hôm nay"); return false; }
    
    clearError('deliveryDate'); return true;
};

const validateAddress = () => {
    const val = document.getElementById('address').value.trim();
    if (val.length < 10) { showError('address', "Địa chỉ phải từ 10 ký tự trở lên"); return false; }
    clearError('address'); return true;
};

const validateNote = () => {
    const val = document.getElementById('note').value;
    if (val.length > 200) { showError('note', "Ghi chú không được quá 200 ký tự"); return false; }
    clearError('note'); return true;
};

const validatePayment = () => {
    const checked = document.querySelector('input[name="payment"]:checked');
    if (!checked) { document.getElementById('err-payment').innerText = "Vui lòng chọn phương thức thanh toán"; return false; }
    document.getElementById('err-payment').innerText = ""; return true;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = [
        validateProduct(), validateQuantity(), validateDeliveryDate(), 
        validateAddress(), validateNote(), validatePayment()
    ].every(v => v === true);

    if (isValid) {
        const summary = `
            <p><strong>Sản phẩm:</strong> ${document.getElementById('product').value}</p>
            <p><strong>Số lượng:</strong> ${document.getElementById('quantity').value}</p>
            <p><strong>Ngày giao:</strong> ${document.getElementById('deliveryDate').value}</p>
            <p><strong>Tổng tiền:</strong> ${document.getElementById('totalDisplay').innerText}</p>
        `;
        document.getElementById('summaryContent').innerHTML = summary;
        document.getElementById('confirmOverlay').style.display = 'flex';
    }
});

document.getElementById('btnFinalCancel').onclick = () => {
    document.getElementById('confirmOverlay').style.display = 'none';
};

document.getElementById('btnFinalOk').onclick = () => {
    alert("🎉 Đặt hàng thành công! Cảm ơn bạn.");
    location.reload();
};

fields.forEach(id => {
    document.getElementById(id).addEventListener('blur', () => {
        if (id === 'product') validateProduct();
        if (id === 'quantity') validateQuantity();
        if (id === 'deliveryDate') validateDeliveryDate();
        if (id === 'address') validateAddress();
        if (id === 'note') validateNote();
    });
    document.getElementById(id).addEventListener('input', () => clearError(id));
});