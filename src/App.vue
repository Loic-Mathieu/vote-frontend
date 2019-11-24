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
        candidats:
                [
                  {id:1, nom:"LENNON", prenom:"Bob", citation:"Dans le doute, tout faire cramer",
                    section:"Bricolage", image:"https://i.ytimg.com/vi/h7h_r1aa5cM/maxresdefault.jpg"},
                  {id:2, nom:"MOLAS", prenom:"Frederic", citation:"Mais ils ont pris de la drogue ?",
                    section:"Montage vidéo", image:"https://officieldugeek.files.wordpress.com/2015/01/130702_joueurdugrenier.jpg?w=600&h=290&crop=1"},
                  {id:3, nom:"RASSIAT", prenom:"Sebastien", citation:"C'est déjà pas si mal...",
                    section:"Sound design", image:"https://i.ytimg.com/vi/OqOoqzDnyRY/maxresdefault.jpg"},
                  {id:4, nom:"DEBBACHE", prenom:"Karim", citation:"Référence rigolote",
                    section:"Images qui bougent", image:"https://p1.cineserie.com/www.cineserie.com/wp-content/uploads/2016/02/undefined_ab92fc5d0097e55043dfcd2c27899693.jpg?resize=609%2C330&ssl=1&ver=1"},
                  {id:5, nom:"SPANISH", prenom:"Inquisition", citation:"Nobody expects the spanish inquisition !",
                    section:"Cirque volant", image:"https://img2.grunge.com/img/gallery/the-most-disturbing-thing-about-the-spanish-inquisition-isnt-what-you-think/everyone-expected-the-spanish-inquisition-1544042193.jpg"},
                ]
      }
    },

    methods:
            {
              /**
               *
               * @param choix
               */
              sendChoix(choix)
              {
                // eslint-disable-next-line no-console
                console.log(choix);
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
