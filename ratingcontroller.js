import Rating from "../models/Rating.js";
class RatingController {
static async submitRatings(req, res) {
try {
console.log("Request body:", req.body); // Log the entire request body
const { ratings } = req.body;
if (!ratings || typeof ratings !== "object") {
throw new Error("Invalid ratings format");
}
console.log("Ratings to save:", ratings); // Log the ratings object
// Save each rating to the database
const ratingPromises = Object.entries(ratings).map(
([questionId, rating]) => {
console.log(
`Saving rating for questionId: ${questionId}, rating: ${rating}`
); // Log each rating
if (rating < 1 || rating > 5) {
throw new Error(
`Invalid rating value for questionId: ${questionId}`
);
}
return new Rating({
userId: "someUserId", // Replace with actual user ID if available
questionId,
rating,
}).save();
}
);
await Promise.all(ratingPromises);
res.status(201).json({ message: "Ratings submitted successfully" });
} catch (error) {
console.error("Error submitting ratings:", error);
res
.status(500)
.json({ message: "Error submitting ratings", error: error.message });
}
}
}
export default RatingController; // Ensure this is exported as default