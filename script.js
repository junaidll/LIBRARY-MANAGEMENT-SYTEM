// Global Variables 
let books = [];
let issuedBooks = [];

// Add Book
function addBook() {
    const id = document.getElementById("bookID").value.trim();
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();

    if (id && title && author) {
        const exists = books.some((book) => book.id === id);
        if (exists) {
            showNotification("Book with this ID already exists.", "error");
        } else {
            books.push({ id, title, author });
            showNotification("Book added successfully!", "success");
            resetFields(); // Clear input fields after adding
        }
    } else {
        showNotification("Please fill in all fields.", "error");
    }
}

// Display Books
function displayBooks() {
    const booksTableBody = document.getElementById("booksTableBody");
    booksTableBody.innerHTML = books.length
        ? books.map((book) => `<tr><td>${book.id}</td><td>${book.title}</td><td>${book.author}</td></tr>`).join("")
        : "<tr><td colspan='3'>No books available.</td></tr>";
    showSection("displayBooks");
}

// Issue Book
function issueBook() {
    const bookID = document.getElementById("issueBookID").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const bookIndex = books.findIndex((book) => book.id === bookID);

    if (bookIndex >= 0 && studentName) {
        issuedBooks.push({ ...books[bookIndex], issuedTo: studentName });
        books.splice(bookIndex, 1);
        showNotification("Book issued successfully!", "success");
        resetFields(); // Clear input fields after issuing
    } else {
        showNotification("Invalid Book ID or Student Name.", "error");
    }
}

// Return Book
function returnBook() {
    const bookID = document.getElementById("returnBookID").value.trim();
    const bookIndex = issuedBooks.findIndex((book) => book.id === bookID);

    if (bookIndex >= 0) {
        books.push(issuedBooks[bookIndex]);
        issuedBooks.splice(bookIndex, 1);
        showNotification("Book returned successfully!", "success");
        resetFields(); // Clear input fields after returning
    } else {
        showNotification("No issued book found with this ID.", "error");
    }
}

// Delete Book
function deleteBook() {
    const bookID = document.getElementById("deleteBookID").value.trim();
    const bookIndex = books.findIndex((book) => book.id === bookID);

    if (bookIndex >= 0) {
        books.splice(bookIndex, 1);
        showNotification("Book deleted successfully!", "success");
        resetFields(); // Clear input fields after deleting
    } else {
        showNotification("Book ID not found.", "error");
    }
}

// View Issued Books
function showIssuedBooks() {
    const issuedBooksTableBody = document.getElementById("issuedBooksTableBody");
    issuedBooksTableBody.innerHTML = issuedBooks.length
        ? issuedBooks.map(
              (book) => `<tr><td>${book.id}</td><td>${book.title}</td><td>${book.author}</td><td>${book.issuedTo}</td></tr>`
          ).join("")
        : "<tr><td colspan='4'>No books have been issued.</td></tr>";
    showSection("viewIssuedBooks");
}

// Navigation
function showSection(sectionID) {
    // Hide all sections
    document.querySelectorAll("section").forEach((section) => section.classList.add("hidden"));

    // Show the selected section
    document.getElementById(sectionID).classList.remove("hidden");

    // Show the header for all sections except the welcome page
    document.querySelector("header").style.display = sectionID !== "welcomePage" ? "block" : "none";
}

function goBack() {
    // Go back to the main menu
    showSection("mainMenu");
}

// Exit
function exitSystem() {
    alert("Exiting the system.");
    window.close();
}

// Notifications with Faster Back Navigation
function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = type === "success" ? "success" : "error";
    notification.style.display = "block";

    // Navigate back to the main menu quickly (e.g., 1 second)
    setTimeout(() => {
        goBack();
    }, 500); // Faster return to main menu

    // Keep the notification visible for longer (e.g., 3 seconds)
    setTimeout(() => {
        notification.style.display = "none";
    }, 4000);
}

// Clear All Input Fields
function resetFields() {
    document.querySelectorAll("input").forEach((input) => {
        input.value = ""; // Clear each input field
    });
}
