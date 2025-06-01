# React + TypeScript Table Application

## Описание проекта

Это React-приложение с использованием TypeScript, которое реализует:

- Таблицу с динамическим количеством колонок (от 5 до 15), формируемых из данных API
- Бесконечную прокрутку (Infinite Scroll) с подгрузкой данных постранично
- Форму добавления новых записей с валидацией полей:
  - Все поля обязательны
  - Email проверяется на корректность
  - Возраст — число от 1 до 100
- Отправку формы на сервер (json-server) с обновлением таблицы после успешной записи
- Тестирование компонентов и API-запросов с помощью Jest, React Testing Library и MSW (Mock Service Worker)
- Использование json-server для имитации REST API

---

### Запуск json-server (мок-сервер API)

```bash
npm run server
```

По умолчанию json-server запустится на [http://localhost:3001](http://localhost:3001)

### Запуск React-приложения

```bash
npm start
```

Откроется в браузере [http://localhost:3000](http://localhost:3000)

---

## Скрипты проекта

* `npm start` — запуск React-приложения
* `npm run server` — запуск json-server
* `npm test` — запуск тестов

---

## Структура проекта

```
/src
  /components
    Form.tsx          
    Table.tsx            
    ScrollWrapper.tsx    
    Form.test.tsx       
    Table.test.tsx       
  setupTests.ts         
db.json                 
jest.config.js           
package.json            
tsconfig.json            
README.md               
```

---

## Описание функционала

### Таблица (Table.tsx)

* Загружает данные с API с пагинацией (\_page, \_limit)
* Использует бесконечную прокрутку для подгрузки следующих страниц
* Динамически формирует колонки и строки по ключам объектов данных

### Форма (Form.tsx)

* Поля: name, email, age, city, country
* Валидация:

    * Все поля обязательны
    * Email проверяется регулярным выражением
    * Возраст должен быть числом от 1 до 100
* При отправке отправляет POST-запрос на сервер
* После успешной отправки очищает поля и обновляет таблицу

### Тесты

* Используются Jest и React Testing Library
* Mock Service Worker (MSW) мокирует API-запросы
* Проверяется отображение таблицы, валидация и отправка формы

---

## Используемые технологии и библиотеки

* React + TypeScript
* axios
* react-infinite-scroll-component
* json-server
* Jest
* React Testing Library
* MSW