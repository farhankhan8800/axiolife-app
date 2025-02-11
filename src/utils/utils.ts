 export function getRandomColor(value:number) {
    let color;
    do {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      const hex = `#${r.toString(16).padStart(2, '0')}${g
        .toString(16)
        .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

      if (hex.toUpperCase() !== '#FFFFFF') {
        color = `rgba(${r}, ${g}, ${b}, 0.${value})`;
      }
    } while (!color);

    return color;
  }


 export function formatFullReadableTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}