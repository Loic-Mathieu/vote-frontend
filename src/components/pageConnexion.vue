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
                                name="iMatricule"
                                v-model="matricule"
                                id="matricule"
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
                matricule : null,
                password : null,
            }
        },

        methods:
        {
            returnTrue()
            {
                return true;
            },

            /**
             *
             */
            chekCredentials()
            {
                if(this.returnTrue)
                {
                    if(!this.returnTrue())
                    {
                        //TODO a déjà voté
                    }

                    this.$emit('valid:username', this.matricule);
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