import React, { useEffect, useState } from "react";
import QuestionList from "../components/QuestionList";
const HomePage = () => {
const [questions, setQuestions] = useState([]);
const [error, setError] = useState(null);
// Fetch random questions from the API
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
return (
<div>
<h1>Online Survey</h1>
<QuestionList questions={questions} error={error} />
</div>
);
};
export default HomePage;