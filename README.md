projet nodejs + react + postegresql : 

1- Importez la base de données db.sql dans votre base de données PostgreSQL.

2- Si vous souhaitez exécuter le serveur(backend  Node.js)  en arrière-plan, allez dans le chemin project/server/ et exécutez npm install. Si vous rencontrez de nombreuses erreurs et vulnérabilités, exécutez npm audit fix --force après avoir exécuté npm update, puis exécutez npm start.

3- La même chose du côté du client (front react). Naviguez jusqu'au chemin project/client/ et exécutez npm install. Si vous trouvez des erreurs, exécutez npm audit fix --force après avoir exécuté npm update, puis exécutez npm start.

4- Nous avons 4 routes (liens). Le premier est /register, où vous pouvez créer un nouvel utilisateur dans la table de connexion avec un formulaire vérifié à l'aide de validateurs. Après cela, vous serez redirigé vers /login pour vous authentifier. Après vous être connecté, 
vous serez dirigé vers la route /app. Après vous être déconnecté, vous pouvez changer votre mot de passe si vous l'avez oublié en répondant à une question personnelle. Après avoir rempli le formulaire de la route /forget, le mot de passe sera changé pour un nouveau.

5- J'ai confirmé l'utilisateur en changeant manuellement une colonne "confirm" dans la base de données, qui est par défaut définie sur 0. Vous devez changer cette colonne manuellement dans PostgreSQL pour pouvoir vous connecter.# nodejs-react-pg
