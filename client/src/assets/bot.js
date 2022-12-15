const chatbot = () => {
    let self = {};

    let helloIntent = {
        "name": "Bonjour",
        "Sentences": [
            'salut',
            'bonjour',
            'coucou',
            'bonsoir',
            'yo',
            'hey',
            'salutations',
            "hello",
        ],
        "Regex": [ /(.*)bonjour(.*)/,
                /(.*)salut(.*)/,
                /(.*)coucou(.*)/,
                /(.*)hello(.*)/,
                /(.*)bonsoir(.*)/,
                /(.*)yo(.*)/,
                /(.*)hey(.*)/,
                /(.*)salutations(.*)/,
                ]
    }

    let entretienIntent = {
        "name": "Entretien vehicule",
        "Sentences": [
            "je voudrais prendre un rendez-vous pour un entretien de mon véhicule",
            "je voudrais prendre un rendez-vous pour un entretien de ma moto",
            "je voudrais faire une révision de mon véhicule",
            "je voudrais faire une révision de ma moto",
        ],
        "Regex": [ /(.*)rendez vous(.*)/,
                   /(.*)rendez-vous(.*)/,
                   /(.*)revision(.*)/,
                   /(.*)révision(.*)/,
                   /(.*)entretien(.*)/,
                ]
    }

    let infoVehiculeIntent = {
        "name": "Info vehicule",
        "Sentences": [
            "je voudrais avoir des informations sur les véhicule",
            "je voudrais avoir des informations sur les moto",
        ],
        "Regex": [ /(.*)informations(.*)moto(.*)/,
                     /(.*)informations(.*)véhicule(.*)/,
                    /(.*)info(.*)moto/,
                    /(.*)info(.*)véhicule/,
                ]
    }

    let infoContactIntent = {
        "name": "Info contact",
        "Sentences": [
            "je veut pouvoir vous contacter",
            "je voudrais les coordonnées de votre entreprise",
            "je voudrais les coordonnées de votre magasin",
            "je souhaite avoir les coordonnées de votre entreprise",
            "je souhaite avoir le numéro de téléphone de votre entreprise",
            "je souhaite avoir l'adresse email de votre entreprise",
        ],
        "Regex": [ /(.*)coordonnées(.*)/,
                    /(.*)contact(.*)/,
                    /(.*)contacter(.*)/,
                    /(.*)numéro(.*)/,
                    /(.*)adresse(.*)/,
                    /(.*)email(.*)/,
                ]
    }

    let stopIntent = {
        "name": "Stop",
        "Sentences": [
            "je voudrais arrêter la conversation",
            "je voudrais quitter la conversation",
            "je voudrais arrêter la discussion",
            "je voudrais quitter la discussion",
        ],
        "Regex": [ /(.*)arreter(.*)/,
                    /(.*)arrêter(.*)/,
                    /(.*)quitter(.*)/,
                    /(.*)stop(.*)/,
                    /(.*)fin(.*)/,
                    
                ]
    }

    self.init = (msg) => {
        return self.runChatBot(msg);
    }

    self.getIntent = (msg) => {

        let msgLower = msg.toLowerCase();
        let intent = null;
        let intentList = [entretienIntent, infoVehiculeIntent, infoContactIntent, stopIntent, helloIntent];
       
        for (let i = 0; i < intentList.length; i++) {

            for (let j = 0; j < intentList[i].Regex.length; j++) {
                if (intentList[i].Regex[j].test(msgLower)) {
                    intent = intentList[i];
                    return intent;
                }
            }

            if (intent == null) {
                for (let j = 0; j < intentList[i].Sentences.length; j++) {
                    if (msgLower == intentList[i].Sentences[j]) {
                        intent = intentList[i];
                        return intent;
                    }
                }
            }
        }


        if (intent == null) {
            intent = {
                "name": "Unknown",
                "Sentences": [],
                "Regex": [],
            }
        } 
        
        return intent;
    }

    self.getResponse = (intent) => {
        let response = null;
        switch (intent.name) {
            case "Entretien vehicule":
                response = "Pour prendre un rendez-vous, veuillez nous contacter au 01 23 45 67 89";
                break;
            case "Info vehicule":
                response = "Vous pouvez trouver toutes les informations sur nos véhicules sur notre site internet";
                break;
            case "Info contact":
                response = "Vous pouvez nous contacter au 01 23 45 67 89 ou par email à contact@groupemoto.fr";
                break;
            case "Stop":
                response = "Au revoir";
                break;
            case "Bonjour":
                response = "Bonjour, je suis le chatbot de Groupemoto,\n je peux vous aider à prendre un rendez-vous pour un entretien de votre véhicule ou à trouver des informations sur nos véhicules";
                break;
            default:
                response = "Je n'ai pas compris votre demande";
                break;
        }

        return response;

    }

    self.runChatBot = (msg) => {

        let intent = self.getIntent(msg);
        let response = self.getResponse(intent);
        return response;
    }

    return self;
}

export default chatbot;