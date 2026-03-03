// Шаг 1. Создание объекта
const student = {
  id: Date.now(),
  name: "anna",
  prefix: "ann",
  status: "active",
  getStatus() {
    return this.status;
  }
};

console.log(student);

// Сюда нужно вставить РЕАЛЬНЫЙ вывод после первого запуска
const SNAPSHOT_STEP1 = `{
  id: 1772560946093,
  name: 'anna',
  prefix: 'ann',
  status: 'active',
  getStatus: [Function: getStatus]
}`;


// Шаг 2. Изменение состояния
student.deactivate = function () {
  this.status = "inactive";
};

student.deactivate();

console.log(student);

// Сюда нужно вставить РЕАЛЬНЫЙ вывод после второго запуска
const SNAPSHOT_STEP2 = `{
  id: 1772560946093,
  name: 'anna',     
  prefix: 'ann',    
  status: 'inactive',
  getStatus: [Function: getStatus],
  deactivate: [Function (anonymous)]
}`;