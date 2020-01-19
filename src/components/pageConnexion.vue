<template>
    <div id="connexion-popup">
        <div class="container" id="popup-content">
            <div class="card">
                <div class="card-header text-center">
                    Veuillez vous identifier
                </div>
                <div class="card-body">
                    <form @submit.prevent="chekCredentials" class="connexion-form">
                        <div class="form-group row">
                            <label for="matricule" class="col-3">Identifiant</label>
                            <input
                                name="iLogin"
                                v-model="login"
                                id="login"
                                class="form-control col"
                                required
                            >
                        </div>
                        <div class="form-group row">
                            <label for="password" class="col-3">Mot de passe</label>
                            <input
                                type="password"
                                name="iPassword"
                                v-model="password"
                                id="password"
                                class="form-control col"
                                required
                            >
                        </div>
                        <button class="btn btn-success float-right">Valider</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pageConnexion",

        data ()
        {
            return {
                login : null,
                password : null,

                user: {info: null, token: null}
            }
        },

        methods:
        {
            async getCredentials()
            {
                const uri = 'http://localhost:8000/api/token/';
                const header = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                };

                await this.$http
                    .post(uri,
                        {
                            'username': this.login,
                            'password': this.password
                        },
                        {
                            headers: header,
                            crossorigin:true,
                            crossdomain:true,
                        }
                    )
                    // eslint-disable-next-line no-console
                    .then(response => {this.user.token = response.data.access; console.log("REQUEST DATA", response.data)})
                    // eslint-disable-next-line no-console
                    .catch(e => console.log(e))
            },

            async getUser(username)
            {
                if(this.user.token == null)
                    return;

                const uri = 'http://localhost:8000/api/utilisateurs/';
                const header = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '.concat(this.user.token)
                };

                await this.$http
                    .get(uri,
                        {
                            headers: header,
                            params: {username: username},
                            crossorigin:true,
                            crossdomain:true,
                        }
                    )
                    .then(response => {this.user.info = response.data.results[0];})
                    // eslint-disable-next-line no-console
                    .catch(e => console.log(e))
            },

            /**
             *
             */
            async chekCredentials()
            {
                // Récupère un token si le mdp est bon
                await this.getCredentials();

                if(this.user.token != null)
                {
                    // récupérer les infos de l'utilisateur
                    await this.getUser(this.login);

                    // vérifier si il peut voter
                    if(this.user != null && !this.user.info.a_vote)
                    {
                        // eslint-disable-next-line no-console
                        console.log("RESULTAT", this.user.info.username, this.user.info.a_vote, this.user.info.id);

                        // this.$emit('valid:username', this.user);
                    }
                }
                else
                {
                    // TODO error message
                }
            },
        }
    }
</script>

<style scoped>
    label { text-align: right; }

    form > div
    {
        padding-left: 30px;
        padding-right: 50px;
    }

    #connexion-popup
    {
        position: fixed;
        overflow: auto;

        left: 0;
        right: 0;
        top: 0;
        padding-top: 100px;

        height: 100%;

        background-color: rgba(0,0,0,0.4);
    }
</style>