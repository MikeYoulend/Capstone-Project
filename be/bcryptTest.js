const bcrypt = require("bcrypt");

// La password che l'utente inserisce durante la registrazione
const myPlaintextPassword = "verifica";

// Genera un sale e hash della password
bcrypt.genSalt(10, function (err, salt) {
	bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
		// Salva questa password hashata nel tuo DB.
		console.log("Password hashata:", hash);

		// Ora, confronta la password fornita con quella hashata
		bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
			if (result) {
				console.log("Il confronto è positivo! Le password corrispondono.");
			} else {
				console.log("Il confronto è negativo. Le password non corrispondono.");
			}
		});
	});
});
