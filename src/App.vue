<template>
  <div id="app">

    <page-connexion
            v-if="user == null"
            @valid:username="validerConnexion"
    />
    <page-vote
            v-else
            v-bind:candidats="candidats"
            @send:choix="sendChoix"
            class="container"
    />

  </div>
</template>

<script>
  import PageVote from "@/components/pageVote";
  import PageConnexion from "@/components/pageConnexion";

  export default {
    name: 'app',
    components: {
      PageConnexion,
      PageVote,
    },
    data ()
    {
      return{
        user:null,
        candidats:null,
      }
    },
    mounted() {
      this.getAllCandidats()
    },
    methods:
            {
              /**
               *
               */
              async getListVote() {
                const uri = 'http://localhost:8000/api/votes';
                const header = {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                };

                // init a null
                let data = null;

                await this.$http
                        .get(uri, {
                          headers: header,
                          crossorigin: true,
                          crossdomain: true,
                        })
                        .then(response => { data = response.data.results; })
                        // eslint-disable-next-line no-console
                        .catch(e => { console.log(e); });

                return data;
              },

              async getUser()
              {
                    // some comment
              },

              /**
               *
               * @param choix
               */
              async sendChoix(choix) {

                // On attend les votes actuels
                var oldVotes = await this.getListVote();

                // Pour chaque vote à passer
                choix.forEach(element => {

                  // chercher le vote à modifier
                  let vote = oldVotes.find(el => {return el.candidat === parseInt(element);} );

                  // On va voter pour le candidat
                  this.postOneChoix(vote)
                });
              },

              postOneChoix(oldVote)
              {
                const uri = "http://127.0.0.1:8000/api/votes/".concat(oldVote.id, '/');
                const header = {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                };

                // eslint-disable-next-line no-console
                console.log("Url utilisée", uri);

                this.$http
                        .patch(uri,
                                {
                                  // ajoute 1 aux nombres de votes
                                  'nb_votes': (oldVote.nb_votes + 1)
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

              /**
               *
               * @param username matricule
               */
              validerConnexion(username)
              {
                // eslint-disable-next-line no-console
                console.log(username);

                this.user = username;
              },

              getAllCandidats()
              {
                const uri = 'http://127.0.0.1:8000/api/candidats';
                const header = {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                };

                this.$http
                        .get(uri, {
                          headers: header,
                          crossorigin:true,
                          crossdomain:true,
                        })
                        .then(response => {this.candidats = response.data.results})
                        // eslint-disable-next-line no-console
                        .catch(e => console.log(e))
              }
            }
  }
</script>

<style>
  #app
  {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    height: 100%;

    background-color: rgba(0, 255, 0, 0.07);
  }
</style>
