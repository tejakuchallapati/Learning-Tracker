const calculateProgress = (completedDays, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate total duration in days
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // Ensure we don't divide by zero
    if (totalDays <= 0) return 0;

    // Calculate percentage
    const percentage = Math.round((completedDays / totalDays) * 100);

    return percentage > 100 ? 100 : percentage;
};

module.exports = { calculateProgress };
