// add.js- добавление новых сотрудников
//
const form = document.getElementById("addEmployeeForm");
const notification = document.getElementById("notification");

// Функция вывода сообщения
function showNotification(message) {
  notification.textContent = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000); //Продолжительнсть сообщения 3 секунды
}
const inputPhone = document.getElementById("phoneNumber");
const maskOptionsPhone = {
  mask: "+7 (000) 000-00-00", //Маска ввода для телефона
  lazy: false,
};
new IMask(inputPhone, maskOptionsPhone);

const inputPassport = document.getElementById("passport");
const maskOptionsPassport = {
  mask: "0000 000000", // Маска ввода для паспорта
};
new IMask(inputPassport, maskOptionsPassport);
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Заполнение полей формы данными сотрудника
  const data = {
    surname: document.getElementById("surname").value,
    name: document.getElementById("name").value,
    patronymic: document.getElementById("patronymic").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    address: document.getElementById("address").value,
    passport: document.getElementById("passport").value,
    postTitle: document.getElementById("postTitle").value,
    deportamentTitle: document.getElementById("deportamentTitle").value,
    statusTitle: document.getElementById("statusTitle").value,
    patch: document.getElementById("patch").value,
  };
  try {
    const response = await fetch("/api/addEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      showNotification("Сотрудник успешно добавлен");
      form.reset();
    } else {
      console.error(result.error);
      showNotification("Ошибка при добавлении сотрудника");
    }
  } catch (error) {
    console.error("Error adding employee:", error);
    showNotification("Ошибка при добавлении сотрудника");
  }
});
