export const parseDate = (date: any) => {
    return String(date.$y) + "-" + String(date.$M+1) + "-" + String(date.$D);
}

export function countDaysBetweenDates(date1Str: string, date2Str: string): number {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    
    // Calculate the difference in milliseconds
    const differenceInMs = Math.abs(date2.getTime() - date1.getTime());
    
    // Convert milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(differenceInMs / millisecondsPerDay);
    
    return daysDifference;
}