const students = [
  {
    name: "Angeline Karen",
    subject: "English",
    score: 93,
  },
  {
    name: "Vania Natalie",
    subject: "Math",
    score: 90,
  },
  {
    name: "Sieren Chelga",
    subject: "Biology",
    score: 95,
  },
  {
    name: "Edward Jefferson",
    subject: "English",
    score: 96,
  },
  {
    name: "Shannon Halim",
    subject: "English",
    score: 92,
  },
];

// Map: creates a new array which the results are obtained from a callback function on every element of the parent array

// Create a new array with the students' name and their each word count
let studentNameDetails = students.map((student) => {
  let mapContainer = {};

  mapContainer.name = student.name;

  let wordCount = student.name.length;
  mapContainer.wordCount = wordCount;

  return mapContainer;
});

console.log(studentNameDetails);

// Filter: filter out the elements of an array and only return those that fulfilled the attached criteria

// Function to return the largest score
function highestScore(array) {
  var largest = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > largest) {
      largest = array[i];
    }
  }
  return largest;
}

// Filter from the english students and return student that has the highest score
const englishBestStudent = students.filter((student) => {
  var scores = students.map((studentScore) => studentScore.score);
  var highest = highestScore(scores);
  if (student.subject == "English" && student.score == highest) {
    console.log(
      `${student.name} has the highest ${student.subject} score of ${student.score}!`
    );
  }
});

// Reduce: executes provided function for every element of the array to reduce it to a single value
const getStudentsFromEachSubject = students.reduce((subject, details) => {
  const key = details["subject"];
  // If an array is not present for the key yet, create an empty array
  if (!subject[key]) {
    subject[key] = [];
  }
  // Push the object
  subject[key].push(details.name, details.score);
  return subject;
}, {});

console.log(getStudentsFromEachSubject);
