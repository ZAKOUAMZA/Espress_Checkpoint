// app.js

const express = require('express');
const app = express();
const path = require('path');

// Middleware pour analyser les données de formulaire
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour vérifier les heures ouvrables
app.use((req, res, next) => {
  const date = new Date();
  const hours = date.getHours();
  const day = date.getDay();
  if (day >= 1 && day <= 5 && hours >= 9 && hours < 18) {
    next();
  } else {
    res.send('L\'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { message: 'Bienvenue sur notre site web!' });
});

app.get('/services', (req, res) => {
  res.render('services', { message: 'Nos services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { message: 'Contactez-nous' });
});

app.post('/submit-contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  // Logique pour gérer les données du formulaire de contact
  console.log(`Nom: ${name}, Email: ${email}, Sujet: ${subject}, Message: ${message}`);
  res.send('Merci pour votre message ! Nous vous répondrons bientôt.');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
