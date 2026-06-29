export const formatDuracion = (seconds: number) => {
    if (seconds < 60) return '${seconds}s';

    const minutes = Math.floor(seconds / 60)

    return '${minutes}m';
};