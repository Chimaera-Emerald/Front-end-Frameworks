// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON response
//    - returns the first 5 items
//    - logs each item's title
const getPostById = async (id) => {
  const res = await fetch(BASE_URL + "/posts/" + id);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

// 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".
const fetchPosts = async () => {
  try {
    const res = await fetch(BASE_URL + "/posts");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const firstFive = data.slice(0, 5);
    firstFive.forEach(item => console.log(item.title));
    return firstFive;
  } catch (error) {
    console.log("Failed to load posts");
  }
};
// 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false
//    - returns the parsed JSON object

// Call getPostById(1) and log the result.
getPostById(1)
  .then(post => console.log(post))
  .catch(error => console.log("Failed to load post:", error));

// Call getPostById(99999) — what happens? Handle it.
getPostById(99999)
  .then(post => console.log(post))
  .catch(error => console.log("Failed to load post:", error));