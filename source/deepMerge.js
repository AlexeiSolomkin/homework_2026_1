'use strict';
/**
 * Функция, рекурсивно объединяющая два объекта.
 * Массивы не объединяются рекурсивно, а просто заменяются.
 * Оба параметра должны быть объектами.
 * Не мутирует исходные объекты.
 * Результат не делит ссылку с target/source.
 * Приоритет при конфликте - у второго объекта.
 * Ключи, встречающиеся только в одном из объектов, копируются как есть.
 * @param {Object} source - изначальный объект
 * @param {Object} target - объект, который имеет приоритет при конфликте
 * 
 * @example
 * const source = {
 *   user: { name: 'Alice', age: 25, address: { city: 'Wonderland', zip: 12345 } },
 *   hobbies: ['reading', 'gaming']
 * };
 * 
 * const target = {
 *   user: { age: 30, address: { country: 'Fantasyland' } },
 *   hobbies: ['traveling'],
 *   isActive: true
 * };
 * 
 * const result = deepMerge(source, target);
 * // result:
 * // {
 * //   user: { name: 'Alice', age: 30, address: { city: 'Wonderland', zip: 12345, country: 'Fantasyland' } },
 * //   hobbies: ['traveling'],
 * //   isActive: true
 * // }
 * 
 *  * @example
 * // Если хотя бы одно из значений по ключу — не plain object, берётся значение из target:
 * const result = deepMerge({ items: [1,2] }, { items: [3] }); 
 * // result: { items: [3] }
 * 
 * @returns {Object|null} новый объединенный объект
 */
const deepMerge = (source, target) => {
    if (source === null && target === null) return null;
    if (source === null) return structuredClone(target);
    if (target === null) return structuredClone(source);

    let mergedObject = {};
    const keys = new Set([
        ...Object.keys(source),
        ...Object.keys(target),
    ]);

    for (let key of keys) {
        const hasSourceKey = Object.hasOwn(source, key);
        const hasTargetKey = Object.hasOwn(target, key);

        if (hasSourceKey && hasTargetKey) {
            let sourceValue = source[key];
            let targetValue = target[key];

            const sourceValueIsPlain =
                sourceValue !== null && typeof sourceValue === 'object' &&
                (Object.getPrototypeOf(sourceValue) === Object.prototype || Object.getPrototypeOf(sourceValue) === null);

            const targetValueIsPlain =
                targetValue !== null && typeof targetValue === 'object' &&
                (Object.getPrototypeOf(targetValue) === Object.prototype || Object.getPrototypeOf(targetValue) === null);
            
            mergedObject[key] = (sourceValueIsPlain && targetValueIsPlain)
                ? deepMerge(sourceValue, targetValue)
                : structuredClone(targetValue);

        } else if (hasSourceKey) { 
            mergedObject[key] = structuredClone(source[key]);
        } else {
            mergedObject[key] = structuredClone(target[key]);
        }
    }
    return mergedObject;
};
