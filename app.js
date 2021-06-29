const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
//create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let names = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    names.textContent = doc.data().names;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(names);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('cafes').doc(id).delete();
    })    
}

//geting data
//db.collection('cafes').get().then((snapshot) => {
    //snapshot.docs.forEach(doc => {
        //renderCafe(doc);
    //});
//});

//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        names: form.names.value,
        city: form.city.value
    });

    form.names.value = '';
    form.city.value = '';
})

//real-time-listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']')
            cafeList.removeChild(li);
        }
    })
})