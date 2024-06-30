document.addEventListener('DOMContentLoaded', function() {
    
    // Funkcija za validaciju unosa i prikazivanje poruke
    function validirajIPrikaziPoruku() {
        const punoIme = document.getElementById('fullName').value;
        const sifra = document.getElementById('customFormat').value;
        const ocenaJave = document.querySelector('input[name="javaRating"]:checked');
        const izabraniInteresi = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el => el.value);
        const odabranaBoja = document.getElementById('colorSelect').value;
        const odabraniFont = document.getElementById('fontSelect').value;
        const finalnaPoruka = document.getElementById('finalMessage');
        const porukaGreske = document.getElementById('errorMessage');
        const porukaNaHoveru = document.getElementById('hoverMessage');

        let jeValidno = true;
        let poruka = '';
        let greska = '';

        // Validacija punog imena
        if (!/^[A-Z][a-z]* [A-Z][a-z]*$/.test(punoIme)) {
            document.getElementById('nameFeedback').textContent = 'Los Unos';
            document.getElementById('nameFeedback').style.color = 'red';
            jeValidno = false;
        } else {
            document.getElementById('nameFeedback').textContent = 'Dobar Unos';
            document.getElementById('nameFeedback').style.color = 'green';
        }

        // Validacija šifre
        if (!/^[A-Za-z]{3}-\d{2,3}-[A-Za-z]$/.test(sifra)) {
            document.getElementById('formatFeedback').textContent = 'Los Unos';
            document.getElementById('formatFeedback').style.color = 'red';
            jeValidno = false;
        } else {
            document.getElementById('formatFeedback').textContent = 'Dobar Unos';
            document.getElementById('formatFeedback').style.color = 'green';
        }

        // Validacija interesa
        if (izabraniInteresi.length === 0) {
            greska += "Molim vas izaberite makar jednu opciju. ";
            jeValidno = false;
        }

        // Validacija ocene znanja Jave
        if (!ocenaJave) {
            greska += "Molim vas izaberite nivo znaja JavaScript. ";
            jeValidno = false;
        }

        // Prikazivanje poruke ili greške
        if (jeValidno) {
            poruka = `${punoIme} sa kodom ${sifra}, interesantne su mu oblasti: ${izabraniInteresi.join(", ")} i misli da je njegovo znanje Jave za ocenu: ${ocenaJave.value}.`;
            finalnaPoruka.style.color = odabranaBoja;
            finalnaPoruka.style.fontFamily = odabraniFont;
            porukaGreske.textContent = '';
        } else {
            porukaGreske.textContent = greska;
            porukaGreske.style.color = 'red';
        }

        finalnaPoruka.textContent = poruka;
    }

    // Funkcija za promenu boje teksta forme
    function promeniBojuTekstaForme() {
        const odabranaBoja = document.getElementById('colorSelect').value;
        const elementiZaBoju = document.querySelectorAll('label, legend');
        elementiZaBoju.forEach(element => {
            element.style.color = odabranaBoja;
        });
    }

    // Funkcija za promenu fonta stranice
    function promeniFontStranice() {
        const odabraniFont = document.getElementById('fontSelect').value;
        document.body.style.fontFamily = odabraniFont;
    }

    // Funkcija za prikaz trenutnog vremena i datuma na hover
    function prikaziTrenutnoVremeIDatum() {
        const porukaNaHoveru = document.getElementById('hoverMessage');
        const trenutnoVreme = new Date().toLocaleTimeString();
        const trenutniDatum = new Date().toLocaleDateString();
        porukaNaHoveru.textContent = `${trenutniDatum} ${trenutnoVreme}`;
    }

    // Funkcija za brisanje poruke sa trenutnim vremenom i datumom
    function obrisiTrenutnoVremeIDatum() {
        const porukaNaHoveru = document.getElementById('hoverMessage');
        porukaNaHoveru.textContent = '';
    }

    // Dodavanje event listener-a za promenu boje
    document.getElementById('colorSelect').addEventListener('change', promeniBojuTekstaForme);
    // Dodavanje event listener-a za promenu fonta
    document.getElementById('fontSelect').addEventListener('change', promeniFontStranice);
    // Dodavanje event listener-a za validaciju i prikazivanje poruke
    document.getElementById('submitButton').addEventListener('click', function(event) {
        event.preventDefault();
        validirajIPrikaziPoruku();
    });
    // Dodavanje event listener-a za prikaz trenutnog vremena i datuma na hover
    document.getElementById('finalMessage').addEventListener('mouseover', prikaziTrenutnoVremeIDatum);
    // Dodavanje event listener-a za brisanje poruke sa trenutnim vremenom i datumom
    document.getElementById('finalMessage').addEventListener('mouseout', obrisiTrenutnoVremeIDatum);
});
