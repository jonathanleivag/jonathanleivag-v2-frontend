const getMonthsDiff = (start: string, end: string | null) => {
    const startDate = new Date(start + "/01");
    const endDate = end ? new Date(end + "/01") : new Date();

    return (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
}

export default getMonthsDiff;
