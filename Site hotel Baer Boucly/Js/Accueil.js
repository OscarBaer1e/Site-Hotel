document.getElementById('Formulaire').addEventListener('submit', function(event) {
    event.preventDefault();
    displayResults();
});

function augmente(type) {
    let A = document.getElementById(type);
    let B = parseInt(A.innerText);

    if (type === 'C') {
        let C = parseInt(document.getElementById('A').innerText);
        if (C === 0) {
            alert("Vous devez avoir au moins un adulte pour ajouter un enfant.");
            return;
        }
    }

    A.innerText = B + 1;

    if (type === 'C') {
        let agesEnfants = document.getElementById('agesEnfants');
        let enfantsHTML = '';
        for (let i = 0; i < B + 1; i++) {
            enfantsHTML += `
                <td>
                    <input type="number" id="ageEnfant${i}" name="ageEnfant${i}" min="0" max="17" placeholder="Âge">
                </td>
            `;
        }
        agesEnfants.innerHTML = enfantsHTML;
    }
}

function enleve(type) {
    let A = document.getElementById(type);
    let B = parseInt(A.innerText);

    if (B > 0) {
        A.innerText = B - 1;

        let agesEnfants = document.getElementById('agesEnfants');
        agesEnfants.removeChild(agesEnfants.lastElementChild);

        if (B - 1 === 0) {
            let agesEnfantsTitre = document.getElementById('ageEnfantsTitre');
            agesEnfantsTitre.style.display = 'none';
        }
    }
}


function clearForm() {
    document.getElementById('Formulaire').reset();
    document.getElementById('A').innerText = '0';
    document.getElementById('C').innerText = '0';
    document.getElementById('D').innerText = '0';
    document.getElementById('resultat2').innerHTML = '';
    
    let agesEnfants = document.getElementById('agesEnfants');
    agesEnfants.innerHTML = '';
}

document.getElementById('départ').addEventListener('change', function() {
    let D = document.getElementById('arrivée').value;
    let F = document.getElementById('départ').value;

    if (D && F && D > F) {
        alert("La date de départ ne peut pas être précédente à la date d'arrivée.");
        document.getElementById('départ').value = '';
    } else {
        document.getElementById('départ').classList.add('selected');
    }
});

document.getElementById('arrivée').addEventListener('change', function() {
    document.getElementById('arrivée').classList.add('selected');
});

document.getElementById('info').addEventListener('focus', function() {
    if (this.value === 'Lieu de séjour') {
        this.value = '';
        this.style.color = 'black';
    }
});

document.getElementById('info').addEventListener('blur', function() {
    if (this.value === '') {
        this.value = 'Lieu de séjour';
        this.style.color = '#aaa';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let infoField = document.getElementById('info');
    if (infoField.value === '') {
        infoField.value = 'Lieu de séjour';
        infoField.style.color = '#aaa';
    }
});

function displayResults() {
    let info = document.getElementById('info').value;
    let arrivée = document.getElementById('arrivée').value;
    let depart = document.getElementById('départ').value;
    let C = document.getElementById('A').innerText;
    let FF = document.getElementById('C').innerText;
    let RD = document.getElementById('D').innerText;
    let CA = document.getElementById('b').checked ? "Oui" : "Non";

    let agesEnfants = "";
    let nbEnfants = parseInt(FF);
    if (nbEnfants > 0) {
        for (let i = 0; i < nbEnfants; i++) {
            let ageEnfant = document.getElementById(`ageEnfant${i}`).value;
            agesEnfants += ageEnfant + ", ";
        }
        agesEnfants = agesEnfants.slice(0, -2);
    }

    let resultHTML = `
        <p><strong>Lieu de séjour:</strong> ${info}</p>
        <p><strong>Arrivée:</strong> ${arrivée}</p>
        <p><strong>Départ:</strong> ${depart}</p>
        <p><strong>Adulte:</strong> ${C}</p>
        <p><strong>Enfant:</strong> ${FF}</p>
        <p><strong>Âge des enfants:</strong> ${agesEnfants}</p>
        <p><strong>Chambre:</strong> ${RD}</p>
        <p><strong>Je voyage pour le travail:</strong> ${CA}</p>
    `;

    document.getElementById('resultat2').innerHTML = resultHTML;
}



