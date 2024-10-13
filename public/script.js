document.addEventListener("DOMContentLoaded", async () => {
  const dataTable = document.getElementById("data-table");
  const searchInput = document.getElementById("search-input"); // Поле ввода для поиска
  const statusSelect = document.getElementById("status"); // Выпадающий список для статуса

  // Функция для загрузки данных сотрудников
  async function fetchData(query = "", status = "") {
    try {
      let url = "/api/data"; // базовый URL

      // Определяем URL для поиска или фильтрации
      if (query) {
        url = `/api/search?fio=${encodeURIComponent(query)}`;
      } else if (status) {
        url = `/api/filter?status=${encodeURIComponent(status)}`;
      }

      // Делаем запрос к сформированному URL
      const response = await fetch(url);
      const data = await response.json();

      dataTable.innerHTML = "";

      data.forEach((item, number) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                  <td>
            <button class="edit-button" data-id="${item.ID_employee}" ${
          item.status === "Уволен" ? "disabled" : ""
        }>Редактировать</button>
          </td>
          <td>${number + 1}</td>
          <td>${item.surname}</td>
          <td>${item.name}</td>
          <td>${item.patronymic}</td>
          <td>${item.title}</td>
          <td class="status">${item.status}</td>
          <td>${item.patch}</td>
        `;

        // Если статус "Уволен", окрашиваем строку в красный цвет
        if (item.status === "Уволен") {
          tr.style.color = "red";
        }

        dataTable.appendChild(tr);
      });

      setupEditButtons();
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  }

  function setupEditButtons() {
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const employeeId = event.target.getAttribute("data-id");
        window.location.href = `/create.html?id=${employeeId}`;
      });
    });
  }

  // Обработчик для поиска по ФИО
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      fetchData(query); // Передаем query, оставляя статус пустым
    }
  });

  // Обработчик для фильтрации по статусу
  statusSelect.addEventListener("change", () => {
    const selectedStatus = statusSelect.value;
    fetchData("", selectedStatus); // Передаем статус, оставляя query пустым
  });
  // Обработчик для фильтрации по статусу
  statusSelect.addEventListener("change", () => {
    const selectedStatus = statusSelect.value;
    if (selectedStatus === "Все") {
      fetchData(); // Загружаются все сотрудники
    } else {
      fetchData("", selectedStatus); // Фильтрация по выбранному статусу
    }
  });
  // Загрузка всех данных при инициализации
  fetchData();
});
