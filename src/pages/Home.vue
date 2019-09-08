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
            <img alt="Etape 1" src="https://www.dougs.fr/wp-content/themes/dougs-site/library/images/home/expert-comptable-disponible.svg">
            <h3>1 - Choisissez</h3>
            <p>vos adresses et l’acte à signifier. Recevez une première estimation du coût de signification</p>
          </div>
        </v-flex>

        <v-flex lg class="pa-4" style="text-align: center">
          <div style="padding: 0 60px">
            <img alt="Etape 2" src="https://www.dougs.fr/wp-content/themes/dougs-site/library/images/home/comptabilite-en-ligne-automatique.svg">
            <h3>2 - Créez rapidement</h3>
            <p>votre dépôt d’acte. Notre plateforme attribue les missions de significations aux huissiers de justice compétents</p>
          </div>
        </v-flex>

        <v-flex lg class="pa-4" style="text-align: center">
          <div style="padding: 0 60px">
            <img alt="Etape 3" src="https://www.dougs.fr/wp-content/themes/dougs-site/library/images/home/comptabilite-en-ligne-securisee.svg">
            <h3>3 - Suivez l’avancée</h3>
            <p>de la signification de vos actes. Suivi, alertes mail, évaluations.. Nous gérons toutes les formalités !</p>
          </div>
        </v-flex>
      </v-layout>
    </div>

    
    <div class="video-container">
      <iframe src="https://www.youtube-nocookie.com/embed/ORluH7jeZ8A" frameborder="0"></iframe> 
    </div>


  </div>
    

    <h2 class="pa-4" style="text-align: center">Les avantages de notre plateforme</h2>

    <v-layout row align-center>
      <v-flex lg class="pa-4" style="text-align: center">
        <h3>Un guichet unique</h3>
        <p>Plusieurs adresses à signifier, un seul interlocuteur pour un gain de temps optimal : iSignif.</p>
      </v-flex>

      <v-flex lg class="pa-4" style="text-align: center">
        <h3>La qualité d'un réseau</h3>
        <p>Des huissiers partenaires compétents sur toute la France et conformes à l’exigence iSignif.</p>
      </v-flex>
    </v-layout>
    <v-layout row align-center>
      <v-flex lg class="pa-4" style="text-align: center">
        <h3>Délai moyen de signification : 5 jours ouvrés</h3>
        <p>iSignif s'efforce de vous proposer un service de signification rapide et diligent.</p>
      </v-flex>

      <v-flex lg class="pa-4" style="text-align: center">
        <h3>Utilisation gratuite</h3>
        <p>iSignif est complètement gratuit jusqu'à 50 demandes / mois, au délà un abonnement à 7,99 HT / mois.</p>
      </v-flex>
    </v-layout>

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
/*h2{
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
  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
    max-width: 1500px;
    margin: 50px auto;
  }
  .video-container iframe,  
  .video-container object,  
  .video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  /*h2{
    font-size: 2.5em;
    text-transform: uppercase;
    font-weight: normal;
    &:nth-child(1){
      color: #3A718C;
    }
  }
  h3{
      margin-bottom: 50px;
      font-weight: normal;
      color: #3A718C;
  }*/
</style>