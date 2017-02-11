# atelier2 : FindYourWay

### Un jeu amusant où tu dois suivre ton chemin sur la carte pour collecter des indices et trouver ta destination finale

* Webapp en angularjs intéragissant avec l'API.
* API Restful en PHP
* Backend en angularjs intéragissant avec l'API

### Getting started

* {racine} = Chemin du dossier qui contient la racine de l'application
* Virtuel hosts :
   
   * API
   
    ` ServerName backend.findyourway.local    
      DocumentRoot {racine}/atelier2/api 
      <Directory {racine}/atelier2/api>
      Options FollowSymLinks
      AllowOverride All
      Require all granted
      </Directory>`
     
    * Game Client
    
      `ServerName play.findyourway.local`
      `DocumentRoot {racine}/atelier2/client
       DirectoryIndex index.html`
      `<Directory {racine}/atelier2/client>`
         `Options FollowSymLinks`
         ` AllowOverride None`
         `Require all granted`
       ` </Directory>`
      
     * Backoffice
     
      `ServerName admin.findyourway.local`
      `DocumentRoot {racine}/atelier2/client-admin
       DirectoryIndex index.html`
      `<Directory {racine}/atelier2/client-admin>`
         `Options FollowSymLinks`
         `AllowOverride None`
         `Require all granted`
       `</Directory>`
       

```
