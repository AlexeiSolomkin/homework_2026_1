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

    QUnit.test("Рабоотает с null-значениями на совпадающих ключах", function(assert) {
        const source = { a: null };

        const target = { a: null };

        const expected = { a: null };
        
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать объект с полем null");
    });
});
