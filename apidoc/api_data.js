define({ "api": [
  {
    "group": "Games",
    "name": "AddGame",
    "version": "0.1.0",
    "type": "post",
    "url": "place/play",
    "title": "Crée une ressource de type game",
    "description": "<p>Crée une ressource de type game.<br/> Retourne cette ressource incluant son id, pseudo, token, score, state, duration, id_level, id_destination.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "Object",
            "optional": false,
            "field": "game",
            "description": "<p>Ressource de type game</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n {\n     game : {\n         \"id\"  : 1 ,\n         \"pseudo\"    : \"Player 1\",\n         \"token\"     : \"y3vt39hpa8n69ocu5wpmspqm4lpu6gmk\",\n         \"score\"     : NULL,\n         \"state\"     : 0,\n         \"duration\"  : NULL,\n         \"id_level\"  : 1,\n         \"id_destination\" : 2\n     }     \n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Games"
  },
  {
    "group": "Games",
    "name": "GetGamesRankings",
    "version": "0.1.0",
    "type": "get",
    "url": "Table",
    "title": "Accès à une collection de ressources de type game",
    "description": "<p>Accès à une collection de ressources de type game.<br/> Retourne cette collection, incluant un ensemble de ressources de type game avec leurs pseudo, duration, score, state, id_level, id_destination.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "Object[]",
            "optional": false,
            "field": "table",
            "description": "<p>Table de ressources de type level</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n{\n     \"0\" => {\n         game : {\n             \"id\"  : 1 ,\n             \"pseudo\"    : \"Player 1\",\n             \"token\"     : \"y3vt39hpa8n69ocu5wpmspqm4lpu6gmk\",\n             \"score\"     : \"8\",\n             \"state\"     : 0,\n             \"duration\"  : \"60\",\n             \"id_level\"  : 1,\n             \"id_destination\" : 2\n         }   \n     },\n     \"1\" => {\n         game : {\n             \"id\"  : 2 ,\n             \"pseudo\"    : \"Player 1\",\n             \"token\"     : \"y3vt39hpa8n69ocu5wpmspqm4lpu6gmk\",\n             \"score\"     : \"6\",\n             \"state\"     : 0,\n             \"duration\"  : \"103\",\n             \"id_level\"  : 1,\n             \"id_destination\" : 2\n         }   \n     },\n   \n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Games"
  },
  {
    "group": "Games",
    "name": "UpdateGame",
    "version": "0.1.0",
    "type": "put",
    "url": "games/:id/save",
    "title": "Modifie une ressources de type game",
    "description": "<p>Modifie une ressource de type game.<br/> Retourne cette ressource, incluant son son id, pseudo, token, score, state, duration, id_level, id_destination.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "Object",
            "optional": false,
            "field": "place",
            "description": "<p>Ressource de type game</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n {\n     game : {\n         \"id\"  : 1 ,\n         \"pseudo\"    : \"Player 1\",\n         \"token\"     : \"y3vt39hpa8n69ocu5wpmspqm4lpu6gmk\",\n         \"score\"     : \"9\",\n         \"state\"     : 0,\n         \"duration\"  : \"120\",\n         \"id_level\"  : 1,\n         \"id_destination\" : 2\n     }   \n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Games"
  },
  {
    "group": "Levels",
    "name": "GetLevels",
    "version": "0.1.0",
    "type": "get",
    "url": "Table",
    "title": "Accès à une collection de ressources de type level",
    "description": "<p>Accès à une collection de ressources de type level.<br/> Retourne cette collection, incluant un ensemble de ressources de type level avec leurs id, max_attempts, time et name.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "Object[]",
            "optional": false,
            "field": "table",
            "description": "<p>Table de ressources de type level</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n{\n     \"0\" => {\n         level : {\n             \"id\"  : 1 ,\n             \"max_attempts\"  : \"100\",\n             \"time\"   : \"1000\",\n             \"name\"   : \"Easy\"\n             \"type_indication\" : \"text\"\n         }\n     },\n     \"1\" => {\n         level : {\n             \"id\"  : 2 ,\n             \"max_attempts\"  : \"80\",\n             \"time\"   : 800,\n             \"name\"   : 49.Intermediate,\n             \"type_indication\" : \"Intermediate\"\n         }\n     },\n   \n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Levels"
  },
  {
    "group": "Levels",
    "name": "UpdateLevel",
    "version": "0.1.0",
    "type": "put",
    "url": "places/:id",
    "title": "Modifie une ressources de type level",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Modifie une ressources de type place.<br/> Retourne cette ressources, incluant son id, name, lng, lat, type_indication et indication.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "Object",
            "optional": false,
            "field": "place",
            "description": "<p>Ressource de type level</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n {\n     level : {\n         \"id\"  : 1 ,\n         \"max_attempts\"  : \"100\",\n         \"time\"   : \"1000\",\n         \"name\"   : \"Easy\"\n         \"type_indication\" : \"text\"\n     }     \n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Levels"
  },
  {
    "group": "Places",
    "name": "AddPlaces",
    "version": "0.1.0",
    "type": "post",
    "url": "places",
    "title": "Crée une ressource de type place",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Crée une ressource de type place.<br/> Retourne cette ressource incluant son id, name, lng, lat, type_indication et indication.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "Object",
            "optional": false,
            "field": "place",
            "description": "<p>Ressource de type place</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n {\n     place : {\n         \"id\"  : 1 ,\n         \"name\"  : \"Paris\",\n         \"lng\"   : 2.287592000000018,\n         \"lat\"   : 48.862725\n         \"type_indication\" : \"text\",\n         \"indication\" : \"La ville lumière\"\n     }     \n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Places"
  },
  {
    "group": "Places",
    "name": "GetPlaces",
    "version": "0.1.0",
    "type": "get",
    "url": "Table",
    "title": "Accès à une table de ressources de type place",
    "description": "<p>Accès à une table de ressources de type place.<br/> Retourne cette table, incluant un ensemble de ressources de type place avec leurs id, last_name, first_name, username et password.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "Object[]",
            "optional": false,
            "field": "table",
            "description": "<p>Table de ressources de type place</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n{\n     \"0\" => {\n         place : {\n             \"id\"  : 1 ,\n             \"name\"  : \"Paris\",\n             \"lng\"   : 2.287592000000018,\n             \"lat\"   : 48.862725\n             \"type_indication\" : \"text\",\n             \"indication\" : \"La ville lumière\"\n         }\n     },\n     \"1\" => {\n         place : {\n             \"id\"  : 2 ,\n             \"name\"  : \"Metz\",\n             \"lng\"   : 6.1757155999999895,\n             \"lat\"   : 49.1193089,\n             \"type_indication\" : \"text\",\n             \"indication\" : \"Ancienne capitale de la Lorraine\"\n         }\n     },\n   \n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Places"
  },
  {
    "group": "Places",
    "name": "UpdatePlace",
    "version": "0.1.0",
    "type": "patch",
    "url": "places/:id",
    "title": "Modifie une ressource de type place",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Modifie une ressource de type place.<br/> Retourne cette ressource, incluant son id, name, lng, lat, type_indication et indication.</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "Object",
            "optional": false,
            "field": "place",
            "description": "<p>Ressource de type place</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n {\n     place : {\n         \"id\"  : 1 ,\n         \"name\"  : \"Paris\",\n         \"lng\"   : 2.287592000000018,\n         \"lat\"   : 48.862725\n         \"type_indication\" : \"text\",\n         \"indication\" : \"La ville lumière\"\n     }     \n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Places"
  },
  {
    "group": "Users",
    "name": "Register",
    "version": "0.1.0",
    "type": "post",
    "url": "users/register",
    "title": "Crée une ressource de type utilisateur",
    "description": "<p>Crée d'une ressource de type user.<br/> Retourne cette ressource, incluant son id, last_name, first_name, username et password</p>",
    "success": {
      "fields": {
        "Succès : 200": [
          {
            "group": "Succès : 200",
            "type": "id",
            "optional": false,
            "field": "Identifiant",
            "description": "<p>de l'utilisateur</p>"
          },
          {
            "group": "Succès : 200",
            "type": "first_name",
            "optional": false,
            "field": "Pr",
            "description": "<p>énom de l'utilisateur</p>"
          },
          {
            "group": "Succès : 200",
            "type": "last_name",
            "optional": false,
            "field": "Nom",
            "description": "<p>de l'utilisateur</p>"
          },
          {
            "group": "Succès : 200",
            "type": "username",
            "optional": false,
            "field": "Username",
            "description": "<p>de l'utilisateur</p>"
          },
          {
            "group": "Succès : 200",
            "type": "password",
            "optional": false,
            "field": "Mot",
            "description": "<p>de passe de l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n{\n   categorie : {\n       \"last_name\"  : \"Nom\" ,\n       \"first_name\" : \"PRénom\",\n       \"username\" : \"user1\",\n       \"password\" : \"$2y$10$30Z9Pdft7rzJqHWlYhcA2Oaf92YCPqjQuRgsxukULVK5D5aNzYNlq\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 400",
          "type": "json"
        }
      ]
    },
    "filename": "api/src/routes/route.php",
    "groupTitle": "Users"
  }
] });
