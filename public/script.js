document.addEventListener("DOMContentLoaded", async () => {
  const dataTable = document.getElementById("data-table");
  const searchInput = document.getElementById("search-input");
  const statusSelect = document.getElementById("status");
  const departmentSelect = document.getElementById("department");
  const postSelect = document.getElementById("post");

  async function fetchData(
    query = "",
    status = "",
    department = "",
    post = ""
  ) {
    try {
      let url = "/api/data";

      if (query) {
        url = `/api/search?fio=${encodeURIComponent(query)}`;
      } else if (status || department || post) {
        url = `/api/filter?status=${encodeURIComponent(
          status
        )}&department=${encodeURIComponent(
          department
        )}&post=${encodeURIComponent(post)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      dataTable.innerHTML = "";

      data.forEach((item, number) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><button class="edit-button" data-id="${item.ID_employee}" ${
          item.statusTitle === "Уволен" ? "disabled" : ""
        }>Редактировать</button></td>
          <td>${number + 1}</td>
          <td>${item.surname}</td>
          <td>${item.name}</td>
          <td>${item.patronymic}</td>
          <td>${item.phoneNumber || ""}</td>
          <td>${item.address || ""}</td>
          <td>${item.passport || ""}</td>
          <td>${item.postTitle || ""}</td>
          <td>${item.departmentTitle || ""}</td>
          <td>${item.statusTitle || ""}</td>
          <td>${item.patch || ""}</td>
        `;

        if (item.statusTitle === "Уволен") {
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

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      fetchData(query);
    }
  });

  statusSelect.addEventListener("change", () => {
    const selectedStatus = statusSelect.value;
    const selectedDepartment = departmentSelect.value;
    const selectedPost = postSelect.value;
    fetchData("", selectedStatus, selectedDepartment, selectedPost);
  });

  departmentSelect.addEventListener("change", () => {
    const selectedStatus = statusSelect.value;
    const selectedDepartment = departmentSelect.value;
    const selectedPost = postSelect.value;
    fetchData("", selectedStatus, selectedDepartment, selectedPost);
  });

  postSelect.addEventListener("change", () => {
    const selectedStatus = statusSelect.value;
    const selectedDepartment = departmentSelect.value;
    const selectedPost = postSelect.value;
    fetchData("", selectedStatus, selectedDepartment, selectedPost);
  });

  fetchData();
});
