// TODO: - load quizes for few seconds, and use kayrawan logo as loader

const main = document.querySelector('main')
window.addEventListener('load', init)

function init() {
    // showLevels()
}

function showLevels() {
    let html = ''

    const ref = db.collection('level')
    ref
        .get()
        .then(snap=>{
            snap.docs.forEach(doc => {
                let sec = doc.id
                html += `
                    <section onclick="showSpecs()">
                        <h1>${sec}</h1>
                    </section>
                `
                main.innerHTML = html
            });

        })    
}

function showSpecs() {
    const docRef = db.collection('level').doc('ts')
    console.log(docRef.id);
    docRef.get().then((snap)=>{
        console.log(snap);
        // snap.forEach(doc => {
        //     console.log(doc.data());
        // });
    })
}

function showShit() {
    let html = ''
        const docRef = db.collection('level').doc('bt').collection('accounting')
        console.log(docRef);

    docRef.get().then((snap)=>{
        snap.forEach(doc => {
            console.log(doc.id);
        });
    })
}