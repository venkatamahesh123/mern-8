import React, { useEffect, useState } from "react";
const QuestionList = () => {
const [questions, setQuestions] = useState([]);
const [ratings, setRatings] = useState({});
const [error, setError] = useState(null);
useEffect(() => {
const fetchQuestions = async () => {
try {
const response = await fetch(
"http://localhost:5000/api/questions/random"
);
if (!response.ok) {
throw new Error("Failed to fetch questions");
}
const data = await response.json();
setQuestions(data);
} catch (err) {
setError(err.message);
}
};
fetchQuestions();
}, []);
// Handle rating change for a specific question
const handleRatingChange = (questionId, rating) => {
setRatings((prevRatings) => ({
...prevRatings,
[questionId]: rating,
}));
};
// Handle form submission
const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch("http://localhost:5000/api/ratings", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ ratings }), // Send the ratings object to the backend
});
if (!response.ok) {
throw new Error("Failed to submit ratings");
}
const data = await response.json();
console.log("Ratings submitted successfully:", data);
alert("Ratings submitted successfully!");
} catch (error) {
console.error("Error submitting ratings:", error.message);
alert("Error submitting ratings. Please try again.");
}
};
return (
<div>
<h2>Rating the following Survey:</h2>
{error && <p style={{ color: "red" }}>{error}</p>}
<form onSubmit={handleSubmit}>
<ul>
{questions.map((question) => (
<li key={question._id}>
<p>{question.questionText}</p>
<label>
Rate:
<select
value={ratings[question._id] || ""}
onChange={(e) =>
handleRatingChange(question._id, e.target.value)
}
>
<option value="" disabled>
Select a rating
</option>
<option value="1">1 - Poor</option>
<option value="2">2 - Fair</option>
<option value="3">3 - Good</option>
<option value="4">4 - Very Good</option>
<option value="5">5 - Excellent</option>
</select>
</label>
</li>
))}
</ul>
<button type="submit">Submit Ratings</button>
</form>
</div>
);
};
export default QuestionList;
