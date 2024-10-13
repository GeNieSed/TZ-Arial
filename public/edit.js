async function loadEmployeeData() {
  // Функция для загрузки данных сотрудника по ID
  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get("id"); //Получение  id из url

  if (!employeeId) {
    // Проверка на id
    document.getElementById("message").innerText = "ID сотрудника не найден";
    return;
  }

  try {
    const response = await fetch(`/api/employee/${employeeId}`);
    if (!response.ok) {
      // GET запрос на сервер для получения данных сотрудника
      throw new Error("Ошибка загрузки данных");
    }

    const employeeData = await response.json();

    // Заполнение полей формы данными сотрудника
    document.getElementById("surname").value = employeeData.surname || "";
    document.getElementById("name").value = employeeData.name || "";
    document.getElementById("patronymic").value = employeeData.patronymic || "";
    document.getElementById("phoneNumber").value =
      employeeData.phoneNumber || "";
    document.getElementById("address").value = employeeData.address || "";
    document.getElementById("passport").value = employeeData.passport || "";
    document.getElementById("postTitle").value = employeeData.postTitle || "";
    document.getElementById("departmentTitle").value =
      employeeData.departmentTitle || "";
    document.getElementById("statusTitle").value =
      employeeData.statusTitle || "";
    document.getElementById("patch").value = employeeData.patch || "";
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    document.getElementById("message").innerText =
      "Ошибка загрузки данных сотрудника";
  }
}

// Функция для отправки обновленных данных на сервер
async function updateEmployeeData() {
  const employeeId = new URLSearchParams(window.location.search).get("id");

  const updatedData = {
    surname: document.getElementById("surname").value,
    name: document.getElementById("name").value,
    patronymic: document.getElementById("patronymic").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    address: document.getElementById("address").value,
    passport: document.getElementById("passport").value,
    postTitle: document.getElementById("postTitle").value,
    departmentTitle: document.getElementById("departmentTitle").value,
    statusTitle: document.getElementById("statusTitle").value,
    patch: document.getElementById("patch").value,
  };
  try {
    const response = await fetch(`/api/employee/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      document.getElementById("message").innerText =
        "Данные сотрудника успешно обновлены";
    } else {
      throw new Error("Ошибка обновления данных");
    }
  } catch (error) {
    // Обработка ошибки при загрузки данных
    console.error("Ошибка обновления данных:", error);
    document.getElementById("message").innerText =
      "Ошибка при обновлении данных сотрудника";
  }
}

// Добавление обработчиков событий
document.addEventListener("DOMContentLoaded", () => {
  loadEmployeeData();

  // Использование маски
  const inputPhone = document.getElementById("phoneNumber");
  const maskOptions = {
    mask: "+7 (000) 000-00-00",
    lazy: false,
  };
  new IMask(inputPhone, maskOptions);
  const inputPassport = document.getElementById("passport");
  const maskOptionsTwo = {
    mask: "0000 000000",
  };
  new IMask(inputPassport, maskOptionsTwo);
});
// При нажатии на кнопку используй функцию
document
  .getElementById("updateButton")
  .addEventListener("click", updateEmployeeData);
