<template>
    <div id="pageResultats">
        <div class="card resultats-list">
            <div class="card-header">
                <h2><b>Résultats finaux</b></h2>
            </div>
            <div class="card-body">
                <div class="container">
                    <div
                            v-for="resultats in resultats"
                            v-bind:key="resultats.id"
                            class="card-wrapper"
                    >
                        <div
                                :id="resultats.id"
                                class="card candidat-card"
                        >
                            <div class="card-header">
                                {{resultats.candidat.nom}}
                                {{resultats.candidat.prenom}}
                            </div>
                            <img
                                    :src="resultats.candidat.img"
                                    class="card-img"
                            >
                            <div class="card-body">
                                <h3 class="font-weight-bold text-center">
                                    Nombre de voies {{resultats.nb_votes}}
                                </h3>
                            </div>
                            <div class="card-footer text-muted">
                                {{resultats.candidat.section}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pageResultats",

        props: {
            user: {info: Object, token: null}
        },

        data() {
            return {
                resultats: [{id: null, nb_votes: null, candidat: Object}]
            }
        },

        mounted() {
            this.getResultats();
        },

        methods: {

            /**
             *
             * @returns {Promise<void>}
             */
            async getResultats()
            {
                const uri = 'http://127.0.0.1:8000/api/resultats/';
                const header = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '.concat(this.user.token)
                };

                await this.$http
                    .get(uri, {
                        headers: header,
                        crossorigin:true,
                        crossdomain:true,
                    })
                    .then(response => {this.resultats = response.data.results})
                    // eslint-disable-next-line no-console
                    .catch(e => console.log(e))
            }
        }
    }
</script>

<style scoped>

    .card-img
    {
        max-width: 100%;
    }

    .card-footer { text-align: end; }

    .card-body { min-height: 100px; }

    .card-header { text-align: center; }

    .card-wrapper {padding: 5px;}

    .card
    {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    }
</style>