<template>
  <div class="home">
    <div class="pa-5 home1">
      <h1>Signifiez vos actes simplement</h1>
      <a></a>
      <p style="text-align: right">
        <img alt="E" width="500px" src="https://image.flaticon.com/icons/svg/201/201565.svg" />
      </p>
    </div>

    <h3 style="text-align: center">grâce à notre réseau d’huissiers de justice</h3>

    <v-layout row align-center>
      <v-flex lg class="pa-4" style="text-align: center">
        <img
          alt="Etape 1"
          src="https://isignif.fr/assets/icon_choice-f5646b28cf1727069f367ce979dd11885d7c415ea4a6b6cb244c7455360465e9.png"
        />
        <h3>1 - Choisissez</h3>
        <p>vos adresses et l’acte à signifier. Recevez une première estimation du coût de signification</p>
      </v-flex>
    </v-layout>

    <v-layout row align-center class="pa-5 home1" style="text-align: left">
      <v-flex lg class="pa-4" style="text-align: center">
        <img
          alt="Etape 2"
          src="https://isignif.fr/assets/icon_create-f65a3a6764d62dd79ca7f37721c41423a7043322cf2138b026b1552a051b8875.png"
        />
        <h3>2 - Créez rapidement</h3>
        <p>votre dépôt d’acte. Notre plateforme attribue les missions de significations aux huissiers de justice compétents</p>
      </v-flex>

      <v-flex lg class="pa-4" style="text-align: center">
        <img
          alt="Etape 3"
          src="https://isignif.fr/assets/icon_follow-e203364218404272edd5b638d2757eabfa2d551c2888eb267dd592da53064aff.png"
        />
        <h3>3 - Suivez l’avancée</h3>
        <p>de la signification de vos actes. Suivi, alertes mail, évaluations.. Nous gérons toutes les formalités !</p>
      </v-flex>
    </v-layout>
  </div>

  <!-- <h2 style="text-align: center">Signifiez vos actes simplement</h2>
    

    <div class="pa-5 home2">
      <h2 class="pt-4">Notre fonctionnement est simple</h2>
      <v-layout row align-center>
        <v-flex lg class="pa-4" style="text-align: center">
          <div style="padding: 0 60px">
            <img alt="Etape 1" src="../assets/monitors.png">
            <h3>1 - Choisissez</h3>
            <p>vos adresses et l’acte à signifier. Recevez une première estimation du coût de signification</p>
          </div>
        </v-flex>

        <v-flex lg class="pa-4" style="text-align: center">
          <div style="padding: 0 60px">
            <img alt="Etape 2" src="../assets/idea.png">
            <h3>2 - Créez rapidement</h3>
            <p>votre dépôt d’acte. Notre plateforme attribue les missions de significations aux huissiers de justice compétents</p>
          </div>
        </v-flex>

        <v-flex lg class="pa-4" style="text-align: center">
          <div style="padding: 0 60px">
            <img alt="Etape 3" src="../assets/paperplane.png">
            <h3>3 - Suivez l’avancée</h3>
            <p>de la signification de vos actes. Suivi, alertes mail, évaluations.. Nous gérons toutes les formalités !</p>
          </div>
        </v-flex>
      </v-layout>
    </div>


    <div class="pa-5 home3">
      <h2 class="pt-4" style="line-height: 45px">Essayez iSignif gratuitement <br><small>ou passez au Premium pour une utilisation illimitée</small></h2>
      <v-layout row align-center>

        <v-flex lg class="pa-4">
          <div style="float: right">
            <v-card style="padding: 20px; margin: 0 auto; text-align: left; box-shadow: none !important; -webkit-box-shadow: none !important">
              <v-card-title style="font-weight: 100; font-size: 25px; padding-bottom: 0">iSignif Basique</v-card-title>
              <v-card-text style="padding-top: 10px">
                <h4>Gratuit</h4>
                <hr>
                <br>
                <p class="card-text">✔ Jusqu'à 50 demandes de significations / mois</p>
                <p class="card-text" style="color: darkgrey ">✖ Destinataires illimités</p>
                <p class="card-text" style="color: darkgrey ">✖ Nouvelles fonctionnalités</p>
                <p class="card-text" style="color: darkgrey">✖ Suivi optimal orienté logiciel SaaS</p>
                <p class="card-text" style="color: darkgrey">✖ Construction libre du réseau d'huissiers de justice</p>
              </v-card-text>
              <v-card-actions>
                <v-btn style="margin: 0 auto" text class="primary freemium_btn">Inscrivez-vous</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>

        <v-flex lg class="pa-4">
          <div style="float: left">
            <v-card style="padding: 20px; margin: 0 auto; text-align: left">
              <v-card-title style="font-weight: 500; font-size: 27px; padding-bottom: 0; color: #2C94C8">iSignif PREMIUM</v-card-title>
              <v-card-text style="padding-top: 10px">
                <h4>7,99€ HT <small>/ mois</small></h4>
                <hr>
                <br>
                <p class="card-text">✔ Demandes de significations illimitées</p>
                <p class="card-text">✔ Destinataires illimités</p>
                <p class="card-text">✔ Nouvelles fonctionnalités</p>
                <p class="card-text">✔ Suivi optimal orienté logiciel SaaS</p>
                <p class="card-text">✔ Construction libre du réseau d'huissiers de justice</p>
                <p class="card-text">✔ Alertes SMS pour les actes urgents</p>
              </v-card-text>
              <v-card-actions>
                <v-btn style="margin: 0 auto" text class="primary font-weight-bold">Souscrire
                  <i aria-hidden="true" class="v-icon material-icons" style="margin-left: 5px; font-size: 15px">keyboard_arrow_right</i></v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>

      </v-layout>
    </div>


    <div class="pa-5 home4">
      <h2 class="pt-4">Ils nous font confiance</h2>
      <v-layout row align-center>

    <h2 class="pa-4" style="text-align: center">Les avantages de notre plateforme</h2>

        <v-flex lg class="pa-4" style="text-align: center">
          <div style="padding: 0 40px">
            <img src="https://i0.wp.com/proformal.fr/wp-content/uploads/2019/01/proformal-liberez-vous-des-formalites-legales.png?fit=423%2C285&ssl=1" alt="Partenaire">
          </div>
        </v-flex>

      </v-layout>
    </div>
    
    <div class="video-container">
      <iframe src="https://www.youtube-nocookie.com/embed/ORluH7jeZ8A" frameborder="0"></iframe> 
    </div>

  <p style="text-align: center"><img alt="Etape 3" src="https://www.dougs.fr/wp-content/themes/dougs-site/library/images/home/expert-comptable-disponible.svg"></p>-->
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
<style lang="scss">
.container {
  padding: 0 !important;
  margin: 0 !important;
  max-width: calc(100% + 50px);
}
.home1 {
  color: #ffffff;
  background-image: radial-gradient(
    circle at top left,
    rgba(44, 148, 200, 1),
    rgba(33, 139, 193, 1)
  );
  height: calc(100vh - 96px);
}
h2{
    font-size: 2.5em;
    text-transform: uppercase;
    font-weight: normal;
    &:nth-child(1){
      color: #3A718C;
    }
  }
  .home2{
    h2{
      text-align: center;
      font-size: 2.5em;
      text-transform: uppercase;
      color: #2C94C8;
      font-weight: normal;
      margin-bottom: 100px;
    }
    img{
      max-width: 120px;
      margin-bottom: 20px;
    }
    h3{
      font-size: 20px;
    }
    p{
      font-size: 15px;
    }
  }
  .home3{
    background: #f4f4f4;
    text-align: left;
    font-size: 16px;
    h2{
      text-align: center;
      font-size: 2.5em;
      text-transform: uppercase;
      font-weight: normal;
      margin-bottom: 50px;
      small {
        font-weight: 100;
        font-size: 20px;
      }
    }
    h4 {
      font-size: 30px;
      small{
        color: grey;
        font-size: 14px;
        font-weight: normal
      }
    }
    hr{
      margin-top: 1rem;
      margin-bottom: 1rem;
      border: 0;
      border-top: 1px solid rgba(0,0,0,0.1);
    }
    .freemium_btn{
      background: transparent !important;
      border: 1px solid #2C94C8 !important;
      color: #2C94C8 !important;
    }
  }
  .home4{
    h2{
      text-align: center;
      font-size: 2.5em;
      text-transform: uppercase;
      font-weight: normal;
      margin-bottom: 50px;
    }
    img{
      max-width: 200px;
    }
  }
  // .video-container {
  //   position: relative;
  //   padding-bottom: 56.25%;
  //   padding-top: 30px;
  //   height: 0;
  //   overflow: hidden;
  //   max-width: 1500px;
  //   margin: 50px auto;
  // }
  // .video-container iframe,  
  // .video-container object,  
  // .video-container embed {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  // }
</style>