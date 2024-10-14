const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express(); //Использование npm с помощью констакты

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Статическая папка для отображения файлов

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}); //использование .env позволяет скрыть данные о бд, повышая безопасность

// Подключение к базе данных
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err);
    process.exit(1);
  }
  console.log("Подключено к MySQL");
});

// Отображение главной страницы
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

// Маршрут для загрузки данных сотрудников
app.get("/api/data", (req, res) => {
  const sql = `
    SELECT Employee.ID_employee, Employee.surname, Employee.name, Employee.patronymic, 
           Contact.phone_number AS phoneNumber, Contact.address, 
           Passport.series_numer AS passport, 
           Post.title AS postTitle, Department.title AS departmentTitle, 
           Status.title AS statusTitle, Finances.patch
    FROM Employee
    JOIN Post ON Employee.ID_post = Post.ID_post
    JOIN Status ON Employee.ID_status = Status.ID_status
    JOIN Finances ON Employee.ID_employee = Finances.ID_employee
    JOIN Contact ON Employee.ID_employee = Contact.ID_employee
    JOIN Passport ON Employee.ID_employee = Passport.ID_employee
    JOIN Department ON Employee.ID_department = Department.ID_department;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Ошибка загрузки данных из базы данных:", err);
      return res
        .status(500)
        .json({ error: "Ошибка загрузки данных из базы данных" });
    }
    res.json(results);
  });
});

// Маршрут для поиска сотрудников по ФИО
app.get("/api/search", (req, res) => {
  const { fio } = req.query;
  if (!fio)
    return res.status(400).json({ error: "Необходимо указать ФИО для поиска" });

  const fioParts = fio.split(" ");
  const [surname, name, patronymic] = [
    fioParts[0] || "",
    fioParts[1] || "",
    fioParts[2] || "",
  ];

  const sql = `
    SELECT Employee.ID_employee, Employee.surname, Employee.name, Employee.patronymic, 
           Post.title AS postTitle, Status.title AS statusTitle, 
           Department.title AS departmentTitle, Finances.patch
    FROM Employee
    JOIN Post ON Employee.ID_post = Post.ID_post
    JOIN Status ON Employee.ID_status = Status.ID_status
    JOIN Finances ON Employee.ID_employee = Finances.ID_employee
    JOIN Department ON Employee.ID_department = Department.ID_department
    WHERE Employee.surname LIKE ? AND Employee.name LIKE ? AND Employee.patronymic LIKE ?
  `;

  db.query(
    sql,
    [`%${surname}%`, `%${name}%`, `%${patronymic}%`],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Ошибка поиска данных в базе данных" });
      }
      res.json(results);
    }
  );
});

// Маршрут для фильтрации сотрудников по статусу, отделу и должности
app.get("/api/filter", (req, res) => {
  const { status, department, post } = req.query;

  let sql = `
    SELECT Employee.ID_employee, Employee.surname, Employee.name, Employee.patronymic, 
           Post.title AS postTitle, Department.title AS departmentTitle, 
           Status.title AS statusTitle, Finances.patch
    FROM Employee
    JOIN Post ON Employee.ID_post = Post.ID_post
    JOIN Status ON Employee.ID_status = Status.ID_status
    JOIN Finances ON Employee.ID_employee = Finances.ID_employee
    JOIN Department ON Employee.ID_department = Department.ID_department
  `;

  const conditions = [];
  const values = [];

  if (status && status !== "Все") {
    conditions.push("Status.title = ?");
    values.push(status);
  }
  if (department && department !== "Все") {
    conditions.push("Department.title = ?");
    values.push(department);
  }
  if (post && post !== "Все") {
    conditions.push("Post.title = ?");
    values.push(post);
  }

  if (conditions.length) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Ошибка при фильтрации данных:", err);
      return res.status(500).json({ error: "Ошибка при фильтрации данных" });
    }
    res.json(results);
  });
});

// Маршрут для добавления нового сотрудника
app.post("/api/addEmployee", (req, res) => {
  const {
    surname,
    name,
    patronymic,
    phoneNumber,
    address,
    passport,
    postTitle,
    deportamentTitle,
    statusTitle,
    patch,
  } = req.body;

  // Вставка данных сотрудника и зависимых данных в базу
  const getPostIdSql = `SELECT ID_post FROM Post WHERE title = ?`;
  db.query(getPostIdSql, [postTitle], (err, postResults) => {
    if (err || postResults.length === 0) {
      console.error("Ошибка получения ID_post:", err);
      return res.status(500).json({ error: "Ошибка получения должности" });
    }
    const ID_post = postResults[0].ID_post;
    // Статус
    const getStatusIdSql = `SELECT ID_status FROM Status WHERE title = ?`;
    db.query(getStatusIdSql, [statusTitle], (err, statusResults) => {
      if (err || statusResults.length === 0) {
        console.error("Ошибка получения ID_status:", err);
        return res.status(500).json({ error: "Ошибка получения статуса" });
      }
      const ID_status = statusResults[0].ID_status;
      // Должность
      const getDepartmentIdSql = `SELECT ID_department FROM Department WHERE title = ?`;
      db.query(
        getDepartmentIdSql,
        [deportamentTitle],
        (err, departmentResults) => {
          if (err || departmentResults.length === 0) {
            console.error("Ошибка получения ID_department:", err);
            return res.status(500).json({ error: "Ошибка получения отдела" });
          }
          const ID_department = departmentResults[0].ID_department;
          // Сотрудник
          const employeeSql = `INSERT INTO Employee (surname, name, patronymic, ID_post, ID_department, ID_status) VALUES (?, ?, ?, ?, ?, ?)`;
          db.query(
            employeeSql,
            [surname, name, patronymic, ID_post, ID_department, ID_status],
            (err, result) => {
              if (err) {
                console.error("Ошибка добавления сотрудника:", err);
                return res
                  .status(500)
                  .json({ error: "Ошибка добавления сотрудника" });
              }

              const employeeId = result.insertId;

              // Добавление контактов, паспорта и финансовых данных сотрудника
              const contactSql = `INSERT INTO Contact (phone_number, address, ID_employee) VALUES (?, ?, ?)`;
              db.query(
                contactSql,
                [phoneNumber, address, employeeId],
                (err) => {
                  if (err)
                    return res
                      .status(500)
                      .json({ error: "Ошибка добавления контакта" });
                  // Паспорт
                  const passportSql = `INSERT INTO Passport (series_numer, ID_employee) VALUES (?, ?)`;
                  db.query(passportSql, [passport, employeeId], (err) => {
                    if (err)
                      return res
                        .status(500)
                        .json({ error: "Ошибка добавления паспорта" });
                    // Заработная плата
                    const financeSql = `INSERT INTO Finances (patch, date_work, ID_employee) VALUES (?, CURDATE(), ?)`;
                    db.query(financeSql, [patch, employeeId], (err) => {
                      if (err)
                        return res.status(500).json({
                          error: "Ошибка добавления данных в финансы",
                        });

                      res
                        .status(200)
                        .json({ message: "Сотрудник успешно добавлен" });
                    });
                  });
                }
              );
            }
          ); // Дата ставиться автоматически
        }
      );
    });
  });
});

// Маршрут для обновления данных сотрудника
app.put("/api/employee/:id", (req, res) => {
  const employeeId = req.params.id;
  const {
    surname,
    name,
    patronymic,
    phoneNumber,
    address,
    passport,
    postTitle,
    departmentTitle,
    statusTitle,
    patch,
  } = req.body;

  const sqlUpdate = `
      UPDATE Employee
      JOIN Contact ON Employee.ID_employee = Contact.ID_employee
      JOIN Passport ON Employee.ID_employee = Passport.ID_employee
      JOIN Finances ON Employee.ID_employee = Finances.ID_employee
      SET Employee.surname = ?, Employee.name = ?, Employee.patronymic = ?,
          Contact.phone_number = ?, Contact.address = ?, Passport.series_numer = ?,
          Employee.ID_post = (SELECT ID_post FROM Post WHERE title = ?),
          Employee.ID_department = (SELECT ID_department FROM Department WHERE title = ?),
          Employee.ID_status = (SELECT ID_status FROM Status WHERE title = ?),
          Finances.patch = ?
      WHERE Employee.ID_employee = ?`;

  db.query(
    sqlUpdate,
    [
      surname,
      name,
      patronymic,
      phoneNumber,
      address,
      passport,
      postTitle,
      departmentTitle,
      statusTitle,
      patch,
      employeeId,
    ],
    (err) => {
      if (err) {
        console.error("Ошибка обновления данных сотрудника:", err);
        return res
          .status(500)
          .json({ error: "Ошибка обновления данных сотрудника" });
      }
      res.json({ message: "Данные сотрудника успешно обновлены" });
    }
  );
});
// Маршрут редактирование определенного сотрудника
app.get("/api/employee/:id", (req, res) => {
  const employeeId = req.params.id;

  const sql = `
      SELECT Employee.surname, Employee.name, Employee.patronymic,
             Contact.phone_number AS phoneNumber, Contact.address,
             Passport.series_numer AS passport,
             Post.title AS postTitle, Department.title AS departmentTitle,
             Status.title AS statusTitle, Finances.patch
      FROM Employee
      JOIN Contact ON Employee.ID_employee = Contact.ID_employee
      JOIN Passport ON Employee.ID_employee = Passport.ID_employee
      JOIN Post ON Employee.ID_post = Post.ID_post
      JOIN Department ON Employee.ID_department = Department.ID_department
      JOIN Status ON Employee.ID_status = Status.ID_status
      JOIN Finances ON Employee.ID_employee = Finances.ID_employee
      WHERE Employee.ID_employee = ?`;

  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error("Ошибка при получении данных сотрудника:", err);
      return res
        .status(500)
        .json({ error: "Ошибка загрузки данных сотрудника" });
    }
    res.json(results[0]);
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
