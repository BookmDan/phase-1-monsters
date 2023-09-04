
document.addEventListener('DOMContentLoaded', () => {
  // call function to fetch and display monsters here 
  fetch('http://localhost:3000/monsters?_limit=50')
    .then((response) => response.json())
    .then((data) => {
      // process retrieved data here 
      const monsterCont = document.getElementById('monster-container');

      data.forEach((monster) => {
        displayMonster(monster);
      })
    })
    .catch((error) => {
      console.error('Error fetching monsters:', error);
    });
    
    const monsterForm = document.getElementById('monster-form');
    monsterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const description = document.getElementById('description').value;
      // create Monster objet 
      const newMonster = {
        name,
        age: int(age),
        description
      }
      
      const forwardButton = document.getElementById('forward');
      forwardButton.addEventListener('click', () => {
        loadNextMonsters();
      })
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newMonster),
      })
      .then((response) => response.json())
        .then((createdMonster) => {
          displayMonster(createdMonster);
          monsterForm.reset();
      })
      .catch((err) => {
        console.error('Error creating monster:', err);
      })
    })
  })
  
  function displayMonster(monster) {
    const monsterDiv = document.createElement('div');
    const name = document.createElement('h2');
    const age = document.createElement('p');
    const description = document.createElement('p');
  
    name.textContent = `Name: ${monster.name}`;
    age.textContent = `Age: ${monster.age}`;
    description.textContent = `Description: ${monster.description}`;
  
    monsterDiv.appendChild(name);
    monsterDiv.appendChild(age);
    monsterDiv.appendChild(description);
  
    monsterCont.appendChild(monsterDiv);
}


// add to monster container
// get monster 
// manipulate add eventlistener to monster and push it bac to json 

function loadNextMonsters() {
  currentPage += 1 
  fetch(`http://localhost:3000/monster?_limit=50&_page=${currentPage}`)
    .then((responst) => response.json())
    .then((data) => {
      data.forEach((monster) => {
        displayMonster(monster);
    })
    })
    .catch((err) => {
      console.error('Error fetching monsters', err);
  })
}