'use strict';

QUnit.module("Тестируем функцию deepMerge", function() {
    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345
                }
            },
            hobbies: ["reading", "gaming"]
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Работает при глубокой рекурсии на нескольких уровнях", function(assert) {
        const source = {
            a: { b: { c: 1, d: { e: 2 } }, x: 1 },
            k: 5
        };

        const target = {
            a: { b: { c: 3, d: { f: 4 } }, y: 2 },
            k: 7
        };

        const expected = {
            a: { b: { c: 3, d: { e: 2, f: 4 } }, x: 1, y: 2 },
            k: 7
        };
        
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Рекурсивно объединяет вложенные plain-объекты");
    });

    QUnit.test("Работает с null-значениями на совпадающих ключах", function(assert) {
        const source = { a: null };

        const target = { a: null };

        const expected = { a: null };
        
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать объект с полем null");
    });

    QUnit.test("Работает с null-объектом", function(assert) {
        const source = null;

        const target = { a: 1 };

        const expected = { a: 1 };
        
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Null объект должен заменяться объектом target ");
    });

    QUnit.test("Массивы заменяются целиком значением из target", function(assert) {
        const source = { a: [1, 2], b: { x: 1 } };

        const target = { a: [3], b: [9] };

        const expected = { a: [3], b: [9] };
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, " ");
    });

    QUnit.test("Работает на совпадающих ключах с разными типами (примитив слева, объект справа)", function(assert) {
        const source = { a: 1 };

        const target = { a: { b: 2 } };

        const expected = { a: { b: 2 } };
        
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "При конфликте на совпадающих ключах должно возвращать target ");
    });

    QUnit.test("Работает на совпадающих ключах с разными типами (объект слева, примитив справа)", function(assert) {
        const source = { a: { b: 2 } };

        const target = { a: 1 };

        const expected = { a: 1 };
        
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "При конфликте на совпадающих ключах с разными типами должно возвращать target ");
    });

    QUnit.test("Результат не делит ссылку с target при конфликте", function(assert) {
        const source = { a: 0 };

        const target = { a: { b: 2 } };

        const result = deepMerge(source, target);
        result.a.b = 42;

        assert.deepEqual(target.a, { b: 2 }, "Изменение результата не трогает target");
        assert.notStrictEqual(result.a, target.a, "Ссылки на объект 'a' разные");
    });
});
