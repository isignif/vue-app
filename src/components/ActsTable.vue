<template>
  <v-card>
    <v-card-title>
      Liste des actes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table :headers="headers" :items="acts" class="elevation-1" :search="search">
    <template v-slot:items="props">
      <td>{{ props.item.reference }}</td>
      <td>{{ props.item.act_type }}</td>
      <td>{{ props.item.significations }}</td>
      <td>{{ props.item.advocate }}</td>
      <td>{{ props.item.bailiffs }}</td>
      <td>{{ props.item.step }}</td>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
export default {
  name: 'ActsTable',
  props: {},
  data() {
    return {
      search: '',
      headers: [{
          text: "Référence de l'acte",
          value: 'reference'
        },
        {
          text: "Dénomination de l'acte",
          value: 'act_type'
        },
        {
          text: 'Destinataires',
          value: 'significations'
        },
        {
          text: 'Correspondant',
          value: 'advocate'
        },
        {
          text: 'Huissier de justice ',
          value: 'bailiffs'
        },
        {
          text: 'Etape',
          value: 'step'
        },
        {
          text: 'Date de création',
          value: 'creation_date'
        }
      ],
      acts: [
        {
          "reference": "123456789",
          "act_type": "Acte de saisie-attribution",
          "significations" : "COINCE STEPHANE, 28480, Thiron gardais",
          "advocate": "ROUGIER Lorenzo",
          "bailiffs": "LAVAL Fabienne",
          "step": "AR",
          "creation_date": " 22/03/2019",
        },
        {
          "reference": "azertyuiop",
          "act_type": "Commandement de payer précédant la saisie-vente",
          "significations" : "EYGRETEAU Patricia née LALET , 33500, Libourne ",
          "advocate": "Nicolas Romain",
          "bailiffs": "CHAPOULIE Jean-Luc",
          "step": "AR",
          "creation_date": " 20/03/2019",
        },
        {
          "reference": "qsdfghjklm",
          "act_type": "Dénonce à caution du commandement de payer les loyers et sommations de payer",
          "significations" : "Madame Corinne LENOIR , 91240, St michel sur orge ",
          "advocate": "Balducci Thomas",
          "bailiffs": "MARCIREAU Melik",
          "step": "AR",
          "creation_date": " 19/03/2019",
        },
      ]
    }
  }
}
</script>
