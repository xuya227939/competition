/**
 * Vike-compatible navigation hook
 * Replaces @tanstack/react-router useNavigate for SSR compatibility
 */
export function useVNavigate() {
    return (path: string) => {
        if (typeof window !== 'undefined') {
            window.location.href = path;
        }
    };
}
