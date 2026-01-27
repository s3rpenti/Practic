// === БАЗОВЫЙ СИНТАКСИС JS: ФИНАНСОВЫЙ МЕНЕДЖЕР ===
// Задание: реализовать все функции, чтобы приложение работало

let balance = 10000; // начальный баланс
const currency = "RUB"; // валюта
let transactions = []; // массив для хранения операций

// Примеры начальных транзакций
transactions = [
    { id: 1, type: "расход", category: "еда", amount: 500, date: "2024-01-15", description: "Обед в кафе" },
    { id: 2, type: "доход", category: "зарплата", amount: 30000, date: "2024-01-10", description: "Зарплата за январь" },
    { id: 3, type: "расход", category: "транспорт", amount: 1200, date: "2024-01-12", description: "Такси до работы" },
    { id: 4, type: "расход", category: "развлечения", amount: 2500, date: "2024-01-14", description: "Кино" }
];

// Функция для отображения текущего баланса
function showBalance() {
    console.log(`\n💰 ТЕКУЩИЙ БАЛАНС: ${balance} ${currency}`);
}

// Функция для добавления транзакции
function addTransaction(type, category, amount, description) {
    //Добавляем объект транзакции
    const newTransaction = {
        id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
        type: type,
        category: category,
        amount: amount,
        date: new Date().toISOString().split('T')[0], // текущая дата в формате "YYYY-MM-DD"
        description: description
    };
    // Добавляем объект в массив transactions
    transactions.push(newTransaction);
    if (type === "доход") {
        balance += amount;
    } else if (type === "расход") {
        balance -= amount;
    }

    console.log(`✅ Транзакция добавлена: ${description}`);
    showBalance();
}

// Функция для просмотра всех транзакций
function showAllTransactions() {
    console.log("\n📋 ВСЕ ТРАНЗАКЦИИ:");
    console.log("=".repeat(60));

 // Используем forEach для вывода всех транзакций
     transactions.forEach(transaction => {
        const typeIcon = transaction.type === "доход" ? "+" : "-";
        console.log(`${typeIcon} ${transaction.type} ${transaction.category}: ${transaction.amount} ${currency} (${transaction.description}) - ${transaction.date}`);
    });

    console.log("=".repeat(60));
}

// Функция для фильтрации транзакций по типу
function filterTransactionsByType(type) {
    console.log(`\n🔍 ТРАНЗАКЦИИ (${type.toUpperCase()}):`);

     const filteredTransactions = transactions.filter(transaction => 
        transaction.type === type
    );
    
    if (filteredTransactions.length === 0) {
        console.log("Транзакций не найдено");
        return;
    }
    
    filteredTransactions.forEach(transaction => {
        const typeIcon = transaction.type === "доход" ? "+" : "-";
        console.log(`${typeIcon} ${transaction.category}: ${transaction.amount} ${currency} (${transaction.description}) - ${transaction.date}`);
    });
}

// Функция для подсчёта суммы по категории
function getTotalByCategory(category) {
    let total = 0;

    // Используем цикл for для подсчета суммы
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].category === category) {
            if (transactions[i].type === "доход") {
                total += transactions[i].amount;
            } else {
                total -= transactions[i].amount;
            }
        }
    }

    console.log(`\n📊 Общая сумма по категории "${category}": ${total} ${currency}`);
    return total;
}

// Функция для проверки возможности совершить трату
function canAfford(amount) {
    // Проверяем, достаточно ли средств на балансе
    const canAfford = balance >= amount;
    
    if (canAfford) {
        console.log(`✓ Можно совершить трату на ${amount} ${currency}. Доступно: ${balance} ${currency}`);
        return true;
    } else {
        console.log(`✗ Недостаточно средств для траты на ${amount} ${currency}. Доступно: ${balance} ${currency}`);
        return false;
    }
}

// Функция для поиска транзакций по ключевому слову в описании
function searchTransactions(keyword) {
    console.log(`\n🔎 Поиск: "${keyword}"`);
    let found = false;

    // Используем цикл for для поиска транзакций
    const lowerKeyword = keyword.toLowerCase();
    
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const lowerDescription = transaction.description.toLowerCase();
        
        if (lowerDescription.includes(lowerKeyword)) {
            const typeIcon = transaction.type === "доход" ? "➕" : "➖";
            console.log(`${typeIcon} ${transaction.type} ${transaction.category}: ${transaction.amount} ${currency} (${transaction.description}) - ${transaction.date}`);
            found = true;
        }
    }

    if (!found) {
        console.log("Транзакций не найдено.");
    }
}

// Главная функция для тестирования
function runTests() {
    console.log("🚀 ЗАПУСК ФИНАНСОВОГО МЕНЕДЖЕРА");
    console.log("=".repeat(60));

    showBalance();

    // Добавляем новые транзакции
    addTransaction("расход", "еда", 1200, "Продукты на неделю");
    addTransaction("доход", "фриланс", 8000, "Заказ на фрилансе");
    addTransaction("расход", "развлечения", 3500, "Ресторан");

    // Показываем все транзакции
    showAllTransactions();

    // Фильтруем
    filterTransactionsByType("расход");

    // Считаем по категории
    getTotalByCategory("развлечения");

    // Поиск
    searchTransactions("продукты");
    searchTransactions("зарплата");

    // Проверяем возможность траты
    console.log("\n💳 Проверка возможности траты:");
    canAfford(5000);
    canAfford(50000);

    console.log("\n✅ Тестирование завершено!");
}

runTests();