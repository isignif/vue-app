# isignif

Ce répertoire contiens l'application _Front-end_ qui est en charge de communiquer avec l'[API iSignif](https://isignif.fr).

Cette application permet aux demandeurs d'actes de:

- se créer un compte
- demander la signification d'acte
- suivre l'avancement de ses demandes
- communiquer avec les huissiers de justice

Elle permet aussi aux huissiers de justice de signifier et suivre les demandes qu'ils reçoit

## Librairies utilisées

- [Vuetify](https://vuetifyjs.com/) basé sur [Vue.js](https://vuetifyjs.com/) avec des composants [Material design](https://material.io/design/)
- [Vuex](https://github.com/vuejs/vuex) pour la gestion des états entre les composants
- [Vue resource](https://github.com/pagekit/vue-resource) pour la gestions des requêts à l'API
- [Yarn](https://yarnpkg.com/lang/en/) pour la gestion des dépendances
- [Typescript](https://www.typescriptlang.org/)

## Installation

1. install dependencies using `npm install`
2. build the project using `npm run build` (or start a development server using `npm run serve`)

## Produit en [marque blanche](https://fr.wikipedia.org/wiki/Marque_blanche)

Le projet est en open-source sous [licence GPL 3](https://github.com/isignif/vue-app/blob/master/LICENSE.txt). Cela signifie que vous avez le droit de copier le code et le modifier à votre guise.

Vous n'avez ensuite qu'a modifier peu de choses pour personnaliser l'application:

- le fichier `src/assets/stylesheets/variables.scss` qui définie les couleurs de l'application
- les images situées dans le dossier `src/assets/branding` quie définissent les logo de la marque qui seront affiché dans l'application

Ainsi vous pouvez cloner le projet et personnaliser l'application afin qu'elle respecte votre charte graphique et inclure votre logo. voir la section [installation](#installation).


## Ideas

- https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
