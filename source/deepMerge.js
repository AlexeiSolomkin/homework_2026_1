'use strict';
/**
 * Функция, рекурсивно объединяющая два объекта, не меняя их. 
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
 * @returns {Object} новый объединенный объект
 */
const deepMerge = function (source, target) {
    let mergedObject = {};
    const keys = new Set([
        ...Object.keys(source),
        ...Object.keys(target),
    ]);

    for (let key of keys) {
        if (Object.hasOwn(source, key) && Object.hasOwn(target, key)) {
            let sourceValue = source[key];
            let targetValue = target[key];
            if (sourceValue !== null && targetValue !== null && Object.getPrototypeOf(sourceValue) === Object.prototype && Object.getPrototypeOf(targetValue) === Object.prototype) {
                let mergedValue = deepMerge(sourceValue, targetValue);
                mergedObject[key] = mergedValue;
            } else {
                mergedObject[key] = targetValue;
            }
        } else if (Object.hasOwn(source, key)) { 
            mergedObject[key] = source[key];
        } else {
            mergedObject[key] = target[key];
        }
    }
    return mergedObject;
}