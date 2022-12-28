let stateIntent = "";
let stateResponse = "";

const chatbot = () => {
    let self = {};

    let stopIntent = {
        "name": "Stop",
        "Regex": [ /(.*)arreter(.*)/,
                    /(.*)arrêter(.*)/,
                    /(.*)quitter(.*)/,
                    /(.*)stop(.*)/,
                    /(.*)fin(.*)/,
                    /(.*)annuler(.*)/,
                    
                ]
    }

    self.getAutomaticResponse = (msg) => {
        return self.runChatBot(msg);
    }

    self.getIntent = (msg, intentList) => {

        let msgLower = msg.toLowerCase();
        let intent = null;

        for (let i = 0; i < intentList.length; i++) {

            for (let j = 0; j < intentList[i].Regex.length; j++) {
                if (intentList[i].Regex[j].test(msgLower)) {
                    intent = intentList[i];
                    return intent;
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

    self.getResponse = (intent, msg) => {
        let response = null;
       
        switch (stateIntent) {
            case "":
                response = self.getBasicResponse(intent);
                break;
            case "Servicing motorcycle":
                response = self.getServicingResponse(intent, msg);
                break;
            default:
                response = self.getBasicResponse(intent);
                break;
        }

        return response;

    }

    self.runChatBot = (msg) => {
        
        let intentList = [];

         switch (stateIntent) {
            case "":
                intentList = self.getBasicIntent();
                break;
            case "Servicing motorcycle":
                intentList = self.getServicingIntent();
                break;
            default:
                intentList = self.getBasicIntent();
                break;
        }

        let intent = self.getIntent(msg, intentList);
        let response = self.getResponse(intent, msg);

        return response;
    }


    //  Differents intents
    self.getBasicIntent = () => {

        let helloIntent = {
            "name": "Hello",
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
    
        let servicingIntent = {
            "name": "Servicing motorcycle",
            "Regex": [ /(.*)rendez vous(.*)/,
                       /(.*)rendez-vous(.*)/,
                       /(.*)revision(.*)/,
                       /(.*)révision(.*)/,
                       /(.*)entretien(.*)/,
                    ]
        }
    
        let infoMotorcycleIntent = {
            "name": "Info motorcycle",
            "Regex": [ /(.*)informations(.*)moto(.*)/,
                         /(.*)informations(.*)véhicule(.*)/,
                        /(.*)info(.*)moto/,
                        /(.*)info(.*)véhicule/,
                    ]
        }
    
        let infoContactIntent = {
            "name": "Info contact",
            "Regex": [ /(.*)coordonnées(.*)/,
                        /(.*)contact(.*)/,
                        /(.*)contacter(.*)/,
                        /(.*)numéro(.*)/,
                        /(.*)adresse(.*)/,
                        /(.*)email(.*)/,
                        /(.*)téléphone(.*)/,
                        /(.*)tel(.*)/,
                        /(.*)tél(.*)/,
                        /(.*)entreprise(.*)/,
                        /(.*)société(.*)/,
                    ]
        }

        return [helloIntent, servicingIntent, infoMotorcycleIntent, infoContactIntent, stopIntent];
    }

    self.getServicingIntent = () => {
        let servicingMotorcycleIntent = {
            "name": "Servicing motorcycle",
            "Regex": []
        }
        switch (stateResponse) {
            case "":
                servicingMotorcycleIntent.name = "Servicing motorcycle : motorcycle year";
                // regex pour l'année de la moto
                servicingMotorcycleIntent.Regex.push(/(.*)[0-9]{4}(.*)/);
                break;
            case "Servicing motorcycle : last servicing year":
                servicingMotorcycleIntent.name = "Servicing motorcycle : last servicing year";
                // regex pour l'année de l'entretien
                servicingMotorcycleIntent.Regex.push(/(.*)[0-9]{4}(.*)/);
                break;
            case "Servicing motorcycle : appointment":
                servicingMotorcycleIntent.name = "Entretien moto : appointment";
                // regex pour le appointment
                servicingMotorcycleIntent.Regex.push(/(.*)[0-9]{2}\/[0-9]{2}\/[0-9]{4}(.*)/);
                break;
            case "Servicing motorcycle : km":
                servicingMotorcycleIntent.name = "Entretien moto : km";
                // regex pour le km
                servicingMotorcycleIntent.Regex.push(/(.*)[0-9](.*)/);
                break;
            case "Servicing motorcycle : review request":
                servicingMotorcycleIntent.name = "Servicing motorcycle : review request";
                // regex pour la demande de révision
                servicingMotorcycleIntent.Regex.push(/(.*)oui(.*)/);
                servicingMotorcycleIntent.Regex.push(/(.*)non(.*)/);
                break;
        }
        return [servicingMotorcycleIntent, stopIntent];
    }


    //  Differents responses
    self.getBasicResponse = (intent) => {
        let response = null;

        switch (intent.name) {
            case "Servicing motorcycle":
                response = "D'accord, quelle est l'année de votre moto ?";
                stateIntent = "Servicing motorcycle";
                break;
            case "Info motorcycle":
                response = "Vous pouvez trouver toutes les informations sur nos véhicules sur notre site internet";
                stateIntent = "Info motorcycle";
                break;
            case "Info contact":
                response = "Vous pouvez nous contacter au 01 23 45 67 89 ou par email à contact@groupemoto.fr";
                stateIntent = "Info contact";
                break;
            case "Stop":
                response = "Au revoir";
                stateIntent = "";
                break;
            case "Hello":
                response = "Bonjour, je suis le chatbot de Groupemoto,\n je peux vous aider à prendre un rendez-vous pour un entretien de votre véhicule ou à trouver des informations sur nos véhicules";
                break;
            default:
                response = "Je n'ai pas compris votre demande";
                break;
        }

        return response;
    }

    self.getServicingResponse = (intent, msg) => {
        let response = null;

        switch (intent.name) {
            case "Servicing motorcycle : motorcycle year":
                response = "Quelle est la date de votre dernier entretien ?"; 
                stateResponse = "Servicing motorcycle : last servicing year"; 
                break;
            case "Servicing motorcycle : last servicing year":
                let yearNow = new Date().getFullYear();
                console.log(yearNow, parseInt(msg), msg);
                if (parseInt(msg) < yearNow - 1) {
                    response = self.appointment(msg);
                } else {
                    response = "Quelle est le nombre de kilomètres parcourus depuis le dernier entretien ?";
                    stateResponse = "Servicing motorcycle : km";
                }
                break;
            case "Servicing motorcycle : km":
                if (parseInt(msg) > 10000) {
                    response = self.appointment(msg);
                } else {
                    response = "Votre moto n'a pas besoin d'entretien pour le moment, voulez-vous prendre un rendez-vous pour une révision ?";
                    stateResponse = "Servicing motorcycle : review request";
                }
                break;
            case "Servicing motorcycle : review request":
                if (msg.match(/oui/gi)) {
                    response = self.appointment(msg);
                } else {
                    response = "Au revoir";
                    stateResponse = "";
                    stateIntent = "";
                }
            default:
                response = "Je n'ai pas compris votre demande";
                break;
        }

        return response;
    }


    // create appointment response
    self.appointment = (msg) => {
        console.log("appointment");
        stateResponse = "Entretien moto : appointment";
        return "Pour prendre un rendez-vous, veuillez nous contacter au 01 23 45 67 89";
    }

    return self;
}

export default chatbot;