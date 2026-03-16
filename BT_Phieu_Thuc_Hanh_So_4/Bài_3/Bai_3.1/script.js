const form = document.getElementById('regForm');
const inputs = ['fullname', 'email', 'phone', 'password', 'confirmPassword', 'terms'];

function showError(id, message) {
    const element = document.getElementById(id);
    const errorSpan = document.getElementById(`err-${id}`);
    if (element) element.classList.add('invalid');
    if (errorSpan) errorSpan.innerText = message;
}

function clearError(id) {
    const element = document.getElementById(id);
    const errorSpan = document.getElementById(`err-${id}`);
    if (element) element.classList.remove('invalid');
    if (errorSpan) errorSpan.innerText = '';
}

const validateFullname = () => {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (val === "") { showError('fullname', "Họ tên không được để trống"); return false; }
    if (val.length < 3) { showError('fullname', "Họ tên phải ít nhất 3 ký tự"); return false; }
    if (!regex.test(val)) { showError('fullname', "Họ tên chỉ chứa chữ cái và khoảng trắng"); return false; }
    clearError('fullname'); return true;
};

const validateEmail = () => {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === "") { showError('email', "Email không được trống"); return false; }
    if (!regex.test(val)) { showError('email', "Định dạng email sai (ví dụ: name@domain.com)"); return false; }
    clearError('email'); return true;
};

const validatePhone = () => {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    if (!regex.test(val)) { showError('phone', "Số điện thoại phải có 10 số và bắt đầu bằng 0"); return false; }
    clearError('phone'); return true;
};

const validatePassword = () => {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(val)) { 
        showError('password', "Mật khẩu ≥ 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số"); 
        return false; 
    }
    clearError('password'); return true;
};

const validateConfirm = () => {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm === "" || confirm !== pass) {
        showError('confirmPassword', "Mật khẩu xác nhận không khớp");
        return false;
    }
    clearError('confirmPassword'); return true;
};

const validateGender = () => {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) { showError('gender', "Vui lòng chọn giới tính"); return false; }
    clearError('gender'); return true;
};

const validateTerms = () => {
    const checked = document.getElementById('terms').checked;
    if (!checked) { showError('terms', "Bạn phải đồng ý với điều khoản"); return false; }
    clearError('terms'); return true;
};

inputs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('blur', () => {
        if (id === 'fullname') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'phone') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirm();
        if (id === 'terms') validateTerms();
    });

    el.addEventListener('input', () => clearError(id));
});

document.getElementsByName('gender').forEach(radio => {
    radio.addEventListener('change', validateGender);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirm();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();

    if (isFullnameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmValid && isGenderValid && isTermsValid) {
        document.getElementById('regContainer').style.display = 'none';
        document.getElementById('successArea').style.display = 'block';
        document.getElementById('displayUser').innerText = document.getElementById('fullname').value;
    }
});

document.getElementById('fullname').addEventListener('input', function() {
    document.getElementById('nameCount').innerText = this.value.length;
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    this.innerText = (type === 'password') ? '👁️' : '🙈';
});

document.getElementById('password').addEventListener('input', function() {
    const pass = this.value;
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    let color = "#eee";
    let width = "0%";
    let label = "";

    if (pass.length > 0) {
        if (strength <= 1) { width = "30%"; color = "#dc3545"; label = "Yếu"; }
        else if (strength <= 3) { width = "60%"; color = "#ffc107"; label = "Trung bình"; }
        else { width = "100%"; color = "#28a745"; label = "Mạnh"; }
    }

    bar.style.width = width;
    bar.style.backgroundColor = color;
    text.innerText = label;
    text.style.color = color;
});