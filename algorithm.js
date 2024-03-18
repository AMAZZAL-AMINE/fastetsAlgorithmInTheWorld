const api = 'http://localhost:3000/usernames';
const batchSize = 1000; // Adjust batch size as needed
let usernames = [];
//sroling event
let currentPage = 1;
const fetchUsernames = async () => {
    const response = await fetch(`${api}?page=${currentPage}&limit=${batchSize}`);
    const data = await response.json();
    usernames = [...usernames, ...data];
    console.log(currentPage);
    currentPage++;
    console.log(batchSize);
    displayUsernames();
};

const displayUsernames = () => {
    const ul = document.getElementById('usernames');
    ul.innerHTML = ''; // Clear previous items
    
    usernames.forEach(username => {
        const li = document.createElement('li');
        li.textContent = username;
        ul.appendChild(li);
    });
};

fetchUsernames();
document.getElementById('usernames').addEventListener('scroll', function() {
    console.log('End of list');
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        fetchUsernames();
    }
});

const alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(' ');
const alpha = document.getElementById('alphaSearch');

alphabet.forEach(letter => {
    const button = document.createElement('button');
    const div = document.createElement('div');
    button.textContent = letter;
    div.appendChild(button);
    button.onclick = async () => {
        const response =  await fetch(`${api}?letter=${letter}`);
        const data = await response.json();
        usernames = data;
        console.log(usernames);
        displayUsernames();
    };
    alpha.appendChild(div);
} );