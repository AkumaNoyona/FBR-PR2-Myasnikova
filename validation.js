// validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // не перезагружаем страницу

        // Сбрасываем предыдущие ошибки
        clearErrors();

        let isValid = true;

        // 1. ФИО
        const fullname = document.getElementById('fullname');
        const fullnameVal = fullname.value.trim();
        if (fullnameVal === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else {
            const words = fullnameVal.split(' ').filter(w => w.length > 0);
            if (words.length < 2) {
                showError(fullname, 'Введите минимум два слова (фамилию и имя)');
                isValid = false;
            }
        }

        // 2. Телефон
        const phone = document.getElementById('phone');
        const phoneVal = phone.value.trim();
        const phoneDigits = phoneVal.replace(/\D/g, ''); // только цифры
        if (phoneVal === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length !== 10) {
            showError(phone, 'Введите 10 цифр номера (код и номер)');
            isValid = false;
        }

        // 3. Email
        const email = document.getElementById('email');
        const emailVal = email.value.trim();
        if (emailVal === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailVal.includes('@') || !emailVal.includes('.')) {
            showError(email, 'Введите корректный email (например: name@domain.ru)');
            isValid = false;
        }

        // 4. Согласие (checkbox)
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            // Покажем ошибку рядом с чекбоксом (можно добавить help под ним)
            const parent = agreement.closest('.field');
            const help = document.createElement('p');
            help.classList.add('help', 'is-danger');
            help.textContent = 'Необходимо согласие на обработку данных';
            parent.appendChild(help);
            isValid = false;
        }

        // Если все поля корректны
        if (isValid) {
            // Собираем данные
            const formData = {
                fullname: fullnameVal,
                phone: phoneVal,
                email: emailVal,
                topic: document.getElementById('topic').value || 'Не выбрана',
                message: document.getElementById('message').value.trim() || '(не заполнено)'
            };

            // Генерируем событие для консольного логгера
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);

            // Показываем уведомление об успехе
            alert('Форма отправлена! Данные в консоли.');

            // Можно очистить форму или показать successMessage
            const successMsg = document.getElementById('successMessage');
            if (successMsg) {
                successMsg.style.display = 'block';
            }
        }
    });

    // Функция показа ошибки под полем
    function showError(input, message) {
        input.classList.add('is-danger');
        // Ищем родительский .field
        const field = input.closest('.field');
        if (field) {
            const help = document.createElement('p');
            help.classList.add('help', 'is-danger');
            help.textContent = message;
            field.appendChild(help);
        }
    }

    // Функция очистки всех предыдущих ошибок
    function clearErrors() {
        // Убираем класс is-danger у всех полей
        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        // Удаляем все элементы .help.is-danger
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
    }

    // Очищаем ошибку при вводе в поле
    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const field = this.closest('.field');
            if (field) {
                const errorMsg = field.querySelector('.help.is-danger');
                if (errorMsg) errorMsg.remove();
            }
        });
    });
});