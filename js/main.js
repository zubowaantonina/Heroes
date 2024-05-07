const dropDownBlock = document.querySelector('.header-container .dropdown')

const renderMoviesList = (movie) => {
    //выбор фильма
    movie.forEach((item) => {
        dropDownBlock.insertAdjacentHTML('beforeend', `
       
        <option value="${item}">${item}</option>
        `)
    })
}
const createCard = (item) => {
    const cards = document.querySelector('.wrapper');
    const card = document.createElement('div');

    card.innerHTML = `
        <div class="card">
            <img src="${item.photo}" alt="superhero_photo" />
          
            <div class="drawn_content">
                <h1 class="name">${item.name}</h1>
                <div class="title actor">Actor: <span>${item.actors}</span></div>
                <div class="title movies">Movies: <span>${item.movies}</span></div>
                <div class="title species">Species: <span>${item.species}</span></div>
                <div class="title gender">Gender: <span>${item.gender}</span></div>
                <div class="title birthDay">Birthday: <span>${item.birthDay}</span></div>
                <div class="title deathDay">Deathday: <span>${item.deathDay}</span></div>
                <div class="title status">Status: <span>${item.status}</span></div>
            </div>
        </div>`;
    cards.appendChild(card);
}
fetch('./../dbHeroes.json')
    .then(res => res.json())
    .then(result => result.forEach(item => createCard(item)))
    .catch(error => console.log(error.message));

dropDownBlock.addEventListener('change', (e) => {

    const cards = document.querySelector('.wrapper');
    cards.innerHTML = '';
    fetch('./../dbHeroes.json')
        .then(res => res.json())
        .then(result => result.forEach(item => {
            if (item.movies) {
                if (item.movies.includes(e.target.value)) {
                    createCard(item);
                }
            }
            if (e.target.value === '') {
                createCard(item);
            }
        }))
        .catch(error => console.log(error.message));
})
fetch('./../dbHeroes.json').then((res) => res.json())
    .then((data) => {
        //коллекция фильмов
        const movies = new Set()
        data.forEach((item) => {
            movies.add(item.movies)
        })
        let movie = Array.from(movies)
        movie = movie.flat();
        movie = [...new Set(movie)];
        let valueToRemove = undefined;
        movie = movie.filter(item => item !== valueToRemove);
        //    console.log(movies);
        //  console.log(movie);

        renderMoviesList(movie)
    })