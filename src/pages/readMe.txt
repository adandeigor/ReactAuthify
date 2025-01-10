Pour le back-end tout se fera dans le dossier pages/api
C'est dans ce dossier qu'est classé tous les fichiers pour la gestion de l'authentification
Dans le dossier auth, il y a tous les fichiers pour gérer l'authentification sauf signIn et signOut, ces deux comme tu le sais seront gérer par NextAuth, donc tu peux les ignorer
Dans un api qui ne retourne pas de valeur comme SignIn par exemple il faut retourner un objet contenant un message et une variable success qui est true quand le but est atteint et false sinon,
la variable message retourne le message adapter à chaque situation, ça simplifiera beaucoup de choses dans le front-end
Pour les api de verification d'email et de réinitilisation de mot de passe, les emails qui seront envoyés seront formatés par MJML dont voici le lien de documentation et un éditeur en ligne qui te permet 
de voir en même temps le rendu que tu aura, tu peux demander à chatGpt de te générer les formats de messages avec les styles et tout, puis tu essai de voir ce qui serai le mieux, l'email est envoyé
avec NodeMailer à partir des données dans le fichier config.ts situé à la racine du dossier src, voici les lien en question : documentation -> https://documentation.mjml.io/
                                                                                                                              éditeur en ligne -> https://mjml.io/try-it-live/
Je vais implémenter la logique de création de compte dans le fichier signUp.ts, ça pourrait être utile.
Aussi j'oubliais, j'utilise la bibliothèque zod pour la validation des données, son lien : https://zod.dev/