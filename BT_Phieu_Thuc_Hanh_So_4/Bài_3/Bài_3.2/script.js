let currentStep = 1;

function updateProgress() {
    const circles = document.querySelectorAll('.step-circle');
    const progressActive = document.getElementById('progressActive');
    
    circles.forEach((circle, index) => {
        if (index < currentStep) circle.classList.add('active');
        else circle.classList.remove('active');
    });

    const activeWidth = ((currentStep - 1) / (circles.length - 1)) * 100;
    progressActive.style.width = activeWidth + "%";
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    updateProgress();
    
    if (step === 3) showSummary();
}

function showSummary() {
    const summary = document.getElementById('summary');
    summary.innerHTML = `
        <p><strong>Họ tên:</strong> ${document.getElementById('fullname').value}</p>
        <p><strong>Ngày sinh:</strong> ${document.getElementById('dob').value}</p>
        <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
    `;
}

function nextStep(step) {
    if (validateStep(step)) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep(step) {
    currentStep--;
    showStep(currentStep);
}

function validateStep(step) {
    let isValid = true;
    if (step === 1) {
        const name = document.getElementById('fullname').value;
        if (name.length < 3) {
            document.getElementById('err-fullname').innerText = "Tên quá ngắn";
            isValid = false;
        } else {
            document.getElementById('err-fullname').innerText = "";
        }
    }
    if (step === 2) {
        const email = document.getElementById('email').value;
        if (!email.includes('@')) {
            document.getElementById('err-email').innerText = "Email không hợp lệ";
            isValid = false;
        } else {
            document.getElementById('err-email').innerText = "";
        }
    }
    return isValid;
}

document.getElementById('mainForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert(" Đăng ký thành công!");
});