
    export class User {
        id?: number;
        prenom?: string | null;
        nom?: string | null;
        email?: string | null;
        emailConf?: string | null;
        password?: string | null;
        sexe?: string | null;
        jour?: number | null;
        mois?: number | null;
        annee?: number | null;
    
        constructor(data?: Partial<User>) {
            if (data) {
                this.id = data.id;
                this.prenom = data.prenom;
                this.nom = data.nom;
                this.email = data.email;
                this.emailConf = data.emailConf;
                this.password = data.password;
                this.sexe = data.sexe;
                this.jour = data.jour;
                this.mois = data.mois;
                this.annee = data.annee;
            }
        }
    }
    
