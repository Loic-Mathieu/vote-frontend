<template>
  <div id="app">

    <page-connexion
            v-if="user == null"
            @valid:user="validerConnexion"
    />
    <page-vote
            v-else-if="user.info.a_vote === false"
            v-bind:user="user"
            @send:choix="sendChoix"
            class="container"
    />

    <div
          v-else
          class="container"
    >
          <p>
            Vous avez déjà voté
          </p>
    </div>

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
      }
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
                  Authorization: 'Bearer '.concat(this.user.token)
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

              /**
               *
               */
              async updateCurrentUser()
              {
                const uri = 'http://localhost:8000/api/utilisateurs/'.concat(this.user.info.id, '/');
                const header = {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer '.concat(this.user.token)
                };

                // patch sur le server
                this.$http
                        .patch(uri,
                            {
                                    'a_vote': true
                                  },
                            {
                                    headers: header,
                                    crossorigin: true,
                                    crossdomain: true,
                                  })
                        // eslint-disable-next-line no-console
                        .catch(e => { console.log(e); });

                // update en local
                this.user.info.a_vote = true;
              },

              /**
               *
               * @param choix
               */
              async sendChoix(choix) {

                // On attend les votes actuels
                let oldVotes = await this.getListVote();

                // Pour chaque vote à passer
                choix.forEach(element => {

                  // chercher le vote à modifier
                  let vote = oldVotes.find(el => {return el.candidat === parseInt(element);} );

                  // On va voter pour le candidat
                  this.postOneChoix(vote);

                  // On indique que l'utilisateur à voté
                  this.updateCurrentUser();
                });
              },

              /**
               * @param oldVote
               */
              postOneChoix(oldVote)
              {
                const uri = "http://127.0.0.1:8000/api/votes/".concat(oldVote.id, '/');
                const header = {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer '.concat(this.user.token)
                };

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
               * @param user
               */
              validerConnexion(user)
              {
                this.user = user;
              },
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
