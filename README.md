# nasa-graphql-d

Схема обращения к открытому API от Nasa. См. https://github.com/Serabass/nasa-graphql-d/blob/master/schema

Данная схема хорошо иллюстрирует подход для обёртки любого вложенного Rest API в GraphQL
с минимальным использованием функциональных модулей, каковыми на данный являются только
директивы, сервер и функция `fetch`.

https://api.nasa.gov

Запуск: 
```
$ npm install # or yarn
$ npm run dev # or yarn dev
```

Для того, чтобы запустить только валидатор схемы (без сервера):
` $ npm run dev-sv`
