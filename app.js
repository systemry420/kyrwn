const main = document.querySelector('main')
window.addEventListener('load', init)

function init() {
    showLevels()
}

function showLevels() {
    let html = ''
    db.collection('level').get().then((snap)=>{
        snap.docs.forEach(doc => {
            let lev = doc.id
            console.log(lev);
            html += `
                <section>
                    <h1>${lev}</h1>
                </section>
            `
            main.innerHTML = html
        });
    })
}