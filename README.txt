Come installare l'app

Procedura

1 - eseguire il comand composer install 
2 - Creare un database e un utente per gestirlo e aggiornare i dati nel file ./server/.env

	DB_CONNECTION=mysql
	DB_HOST=127.0.0.1
	DB_PORT=3306
	DB_DATABASE=databaseprova
	DB_USERNAME=root
	DB_PASSWORD=

3 - inviare il comando php artisan migrate 
3 - generare la secret key con il comando php artisan jwt:secret
4- aggiornare jwt_secret nel file client/index.js con la key appena creata presente nel file .server/.env
4- Eseguire il server con il comando php artisan serve.
5- In un altro terminale accedere al client con cd client.
6 -Installare le dipendenze per il client con il comando npm i.
7 -Eseguire il client con il comando npm run start 