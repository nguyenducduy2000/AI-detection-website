function getRandomDate() {
    // Get the current date and time
    const now = new Date();

    // Calculate the timestamp for 1 month ago
    const oneMonthAgoTimestamp = now.getTime() - 30 * 24 * 60 * 60 * 1000; // Assuming 30 days in a month

    // Generate a random number between the timestamp for 1 month ago and the current timestamp
    const randomTimestamp = Math.floor(Math.random() * (now.getTime() - oneMonthAgoTimestamp)) + oneMonthAgoTimestamp;

    // Create a new Date object using the random timestamp to get the random date
    return new Date(randomTimestamp);
}
module.exports = getRandomDate;
