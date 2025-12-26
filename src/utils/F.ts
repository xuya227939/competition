/**
 * Functional utilities with proper TypeScript support
 */

/**
 * 支持类型的Object.entries函数
 * 返回一个给定对象自身可枚举属性的键值对数组，但保留正确的类型信息
 *
 * @example
 * const obj = { name: 'John', age: 30 };
 * const entries = F.entries(obj); // 类型为 [string, string | number][]
 * // 相比普通的Object.entries，F.entries能正确推断值的类型
 */
export function entries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
    return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * 支持类型的Object.keys函数
 * 返回一个包含给定对象所有可枚举属性的数组，但保留正确的键类型
 *
 * @example
 * const obj = { name: 'John', age: 30 };
 * const keys = F.keys(obj); // 类型为 (keyof typeof obj)[]
 */
export function keys<T extends object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
}

/**
 * 支持类型的Object.values函数
 * 返回一个包含给定对象所有可枚举属性值的数组，但保留正确的值类型
 *
 * @example
 * const obj = { name: 'John', age: 30 };
 * const values = F.values(obj); // 类型为 (string | number)[]
 */
export function values<T extends object>(obj: T): Array<T[keyof T]> {
    return Object.values(obj) as Array<T[keyof T]>;
}

/**
 * 提供更强类型支持的entries函数变体
 * 允许指定更精确的键和值类型
 *
 * @example
 * interface User {
 *   name: string;
 *   age: number;
 *   active?: boolean;
 * }
 * const user: User = { name: 'John', age: 30 };
 * const entries = F.entriesOf<User>(user); // 类型为 [keyof User, User[keyof User]][]
 */
export function entriesOf<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
    return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * F 命名空间导出，使用方式为 F.entries, F.keys 等
 */
const F = {
    entries,
    keys,
    values,
    entriesOf
};

export default F;
