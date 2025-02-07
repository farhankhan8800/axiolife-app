export const debounce = <T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void => {
    let timeout: NodeJS.Timeout;
  
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };