<template>
    <div id="validerVote">

    </div>
</template>

<script>
    export default {
        name: "validerVote",
        props: {
            user: Object,
            choix: Array
        },
        data() {
        },
        mounted() {
            this.sendChoix()
        },
        methods: {
            getListVote()
            {
                const uri = 'http://localhost:8000/api/votes';
                const header = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                };

                // init a null
                let data = null;

                this.$http
                    .get(uri, {
                        headers: header,
                        crossorigin:true,
                        crossdomain:true,
                    })
                    .then(response => {data = response.data.results})
                    // eslint-disable-next-line no-console
                    .catch(e => console.log(e))
                    .finally(() => {return data})
            },

            sendChoix()
            {
                const votesActuel = this.getListVote();

                // Pour chaque vote à passer
                this.choix.forEach(function (element) {

                    // chercher le vote à modifier
                    let vote = votesActuel.find(function(el){
                        return el.id === element;
                    })

                    // On va voter pour le candidat
                    this.postOneChoix(vote)
                });
            },

            postOneChoix(oldVote)
            {
                const uri = 'http://127.0.0.1:8000/api/votes/${oldVote.id}';
                const header = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                };

                this.$http
                    .patch(uri,
                        {
                            // ajoute 1 aux nombres de votes
                            nb_votes: (oldVote.nb_votes + 1)
                        },
                        {
                            headers: header,
                            crossorigin:true,
                            crossdomain:true,
                        }
                    )
                    // eslint-disable-next-line no-console
                    .catch(e => console.log(e))
            },

            updateUser()
            {

            }
        }
    }
</script>

<style scoped>

</style>