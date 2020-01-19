<template>
    <div id="page-vote">
        <div class="card choix-candidat">
            <div class="card-header">
                <h2><b>Liste des candidats</b></h2>
            </div>
            <div class="card-body">
                <section class="card-deck">
                    <div class="row">
                        <div
                            v-for="candidat in candidats"
                            v-bind:key="candidat.id"
                            class="col-sm-4 card-wrapper"
                        >
                            <div
                                @click="select"
                                :id="candidat.id"
                                class="card candidat-card"
                                v-bind:class="{ selected:(choix.includes((candidat.id).toString())) }"
                            >
                                <div class="card-header">
                                    {{candidat.nom}}
                                    {{candidat.prenom}}
                                </div>
                                <img
                                        :src="candidat.img"
                                        class="card-img"
                                >
                                <div class="card-body">
                                    <blockquote class="blockquote mb-0">
                                        {{candidat.description}}
                                    </blockquote>
                                </div>
                                <div class="card-footer text-muted">
                                    {{candidat.section}}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <button
                    class="btn btn-success float-right"
                    :disabled="choix.length<=0"
                    @click="handleSubmit"
                >
                    Valider
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pageVote",
        props: {
            user : Object
        },

        data ()
        {
            return {
                choix : [],
                candidats : Array
            }
        },

        mounted() {
            this.getCandidats()
        },

        methods:
        {
            async getCandidats()
            {
                const uri = 'http://127.0.0.1:8000/api/candidats';
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
                    .then(response => {this.candidats = response.data.results})
                    // eslint-disable-next-line no-console
                    .catch(e => console.log(e))
            },

            /**
             *
             * @param event
             */
            select(event)
            {
                // id du candidat et du div
                let targetId = event.currentTarget.id;

                // ajouter ou retirer
                if(this.choix.includes(targetId))
                    this.removeOneVote(targetId);
                else
                    this.addOneVote(targetId);
            },

            /**
             *
             * @param target
             * @returns {boolean}
             */
            addOneVote(target)
            {
                // si il y a déjà deux choix
                if(this.choix.length >= 2)
                    return false;

                // ajouter le choix
                this.choix.push(target);
                return true;
            },

            /**
             *
             * @param target
             * @returns {boolean}
             */
            removeOneVote(target)
            {
                // si il n'y a pas de choix
                if(this.choix.length <= 0)
                    return false;

                // retirer le choix
                let index = this.choix.indexOf(target);
                this.choix.splice(index, 1);
                return true;
            },

            /**
             *
             */
            handleSubmit()
            {
                this.$emit('send:choix', this.choix);
                this.choix = [];
            }
        }
    }
</script>

<style scoped>

    .candidat-card { transition-duration: 0.5s; }

    .candidat-card:hover:not(.selected)
    {
        background-color: rgba(0, 86, 255, 0.08);
    }

    .selected
    {
        border-color: green;
        background-color: rgba(73, 185, 86, 0.51);
    }

    .card-img
    {
        max-width: 100%;
        height: 200px;
    }

    .card-footer { text-align: end; }

    .card-body { min-height: 100px; }

    .card-header { text-align: center; }

    .card-wrapper {padding: 5px;}

    .choix-candidat > .card-header
    {
        background-color: #00520c;
        color: aliceblue;
    }

    .card
    {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    }
</style>