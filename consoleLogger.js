// consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const data = event.detail;

        console.clear(); // очистим консоль для наглядности
        console.log('✅ Форма успешно отправлена!');
        console.log('=========================');
        console.log('📌 ФИО:', data.fullname);
        console.log('📞 Телефон:', data.phone);
        console.log('📧 Email:', data.email);
        console.log('📋 Тема:', data.topic);
        console.log('💬 Сообщение:', data.message);
        console.log('=========================');
        console.log('🕒', new Date().toLocaleString());
    });
});