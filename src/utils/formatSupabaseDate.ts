// utils/formatSupabaseDate.ts
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 将 Supabase timestamptz 转换为用户本地可读时间
 * @param dateString Supabase 返回的时间字符串 (UTC，例如 "2025-10-24T03:12:34.123Z")
 * @param format 可选的输出格式（默认 "YYYY-MM-DD HH:mm:ss"）
 * @param tz 可选，指定时区（默认使用用户系统时区）
 */
export function formatSupabaseDate(dateString?: string | null, format: string = 'YYYY-MM-DD HH:mm:ss', tz?: string): string {
    if (!dateString) return '';

    try {
        const userTZ = tz || dayjs.tz.guess(); // 自动识别用户时区
        return dayjs.utc(dateString).tz(userTZ).format(format);
    } catch (error) {
        console.error('formatSupabaseDate error:', error);
        return dateString;
    }
}
