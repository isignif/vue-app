<template>
    <div>
        <p>{{ signification.name }}</p>
        <p v-if="bailiff">{{ bailiff.completeName }}</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Signification } from '../isignifClient/src/Signification';
import { User } from '../isignifClient/src/User';

export default Vue.extend({
    name: 'SignificationInformations',
    props: {
        signification: Signification
    },
    data() {
        return {
            bailiff: null as User
        }
    },
    mounted() {
        this.signification.getBailiff()
            .then(b => this.bailiff = b);
    }
})
</script>