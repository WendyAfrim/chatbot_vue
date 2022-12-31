let stateIntent = ""; // val : "", "Servicing motorcycle", "Info motorcycle", "Info contact", "Stop"
let stateResponse = "";

// Servicing motorcycle
let servicingMotorcycleYear = "";

// appointment
let appointmentDateId = "";
let appointmentTimeId = "";
let appointmentValidId = "";
let appointmentMessageId = "";
let appointmentType = "";
// info motorcycle
let infoMotorcycleType = "";

const chatbot = () => {
    let self = {};

    // default vars
    self.dontUnderstand = "Je ne comprends pas votre demande, pouvez-vous reformuler ?";

    // run chatbot
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

    // add list of responses
    self.getResponse = (intent, msg) => {
        let response = null;
       
        switch (stateIntent) {
            case "":
                response = self.getBasicResponse(intent);
                break;
            case "Servicing motorcycle":
                response = self.getServicingResponse(intent, msg);
                break;
            case "Info motorcycle":
                response = self.getInfoMotorcycleResponse(intent, msg);
                break;
            case "Info contact":
                response = self.getInfoContactResponse(intent, msg);
                break;
            default:
                response = self.getBasicResponse(intent);
                break;
        }

        return response;

    }

    // add list of intents
    self.runChatBot = (msg) => {
        
        let intentList = [];

         switch (stateIntent) {
            case "":
                intentList = self.getBasicIntent();
                break;
            case "Servicing motorcycle":
                intentList = self.getServicingIntent();
                break;
            case "Info motorcycle":
                intentList = self.getInfoMotorcycleIntent();
                break;
            case "Info contact":
                intentList = self.getInfoContactIntent();
                break;
            default:
                intentList = self.getBasicIntent();
                break;
        }

        let intent = self.getIntent(msg, intentList);
        let response = self.getResponse(intent, msg);

        return response;
    }

    self.firstResponse = () => {
        stateIntent = "";
        stateResponse = "";

        appointmentDateId = "";
        appointmentTimeId = "";
        appointmentValidId = "";
        appointmentMessageId = "";
        appointmentType = "";

        infoMotorcycleType = "";

        return "Bonjour, je suis un chatbot, que puis-je faire pour vous ?";
    }

    //  Differents intents

    self.getDefaultIntent = () => {
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

        return [stopIntent];
    }

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

        return [helloIntent, servicingIntent, infoMotorcycleIntent, infoContactIntent, ...self.getDefaultIntent()];
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
                servicingMotorcycleIntent.Regex.push(/(.*)[0-9]{4}(.*)/g);
                break;
            case "Servicing motorcycle : appointment":
                servicingMotorcycleIntent.name = "Entretien moto : appointment";
                break;
            case "Servicing motorcycle : km":
                servicingMotorcycleIntent.name = "Servicing motorcycle : km";
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
        return [servicingMotorcycleIntent, ...self.getDefaultIntent()];
    }

    self.getInfoMotorcycleIntent = () => {
        let infoMotorcycleIntent = {
            "name": "Info motorcycle",
            "Regex": []
        }

        switch (stateResponse) {
            case "":
                infoMotorcycleIntent.name = "Info motorcycle : motorcycle type";
                // regex pour le type de moto
                infoMotorcycleIntent.Regex.push(/(.*)routier(.*)/);
                infoMotorcycleIntent.Regex.push(/(.*)tout terrain(.*)/);
                infoMotorcycleIntent.Regex.push(/(.*)tout-terrain(.*)/);
                infoMotorcycleIntent.Regex.push(/(.*)sportif(.*)/);
                break;
            case "Info motorcycle : test request":
                infoMotorcycleIntent.name = "Info motorcycle : test request";
                // regex pour la demande de test
                infoMotorcycleIntent.Regex.push(/(.*)oui(.*)/);
                infoMotorcycleIntent.Regex.push(/(.*)non(.*)/);
                break;
        }

        return [infoMotorcycleIntent, ...self.getDefaultIntent()];
    }

    self.getInfoContactIntent = () => {
        let infoContactIntent = {
            "name": "Info contact",
            "Regex": []
        }

        switch (stateResponse) {
            case "":
                infoContactIntent.name = "Info contact : contact type";
                // regex pour le type de contact
                infoContactIntent.Regex.push(/(.*)téléphone(.*)/);
                infoContactIntent.Regex.push(/(.*)tel(.*)/);
                infoContactIntent.Regex.push(/(.*)tél(.*)/);
                infoContactIntent.Regex.push(/(.*)email(.*)/);
                infoContactIntent.Regex.push(/(.*)adresse(.*)/);
                break;
        }

        return [infoContactIntent, ...self.getDefaultIntent()];
    }

    //  Differents responses

    self.getDefaultResponse = (intent) => {
        let response = null;

        switch (intent.name) {
            case "Stop":
                response = "Au revoir";
                stateIntent = "Stop";
                break;
            default:
                response = self.dontUnderstand;
                break;
        }

        return response;
    }

    self.getBasicResponse = (intent) => {
        let response = null;

        switch (intent.name) {
            case "Servicing motorcycle":
                response = "D'accord, votre moto date de quelle année ?";
                stateIntent = "Servicing motorcycle";
                break;
            case "Info motorcycle":
                response = "D'accord, quel type d'usage faites-vous de votre moto ? (routier, tout terrain ou sportif)";
                stateIntent = "Info motorcycle";
                break;
            case "Info contact":
                response = "Vous voulez nous contacter par téléphone ou par email ?";
                stateIntent = "Info contact";
                break;
            case "Hello":
                response = "Bonjour, je suis le chatbot de Groupemoto,\n je peux vous aider à prendre un rendez-vous pour un entretien de votre véhicule ou à trouver des informations sur nos véhicules";
                break;
            default:
                response = self.getDefaultResponse(intent);
                break;
        }

        return response;
    }

    self.getServicingResponse = (intent, msg) => {
        let response = null;
        let yearNow = new Date().getFullYear();

        switch (intent.name) {
            case "Servicing motorcycle : motorcycle year":
                msg = msg.replace(/[^0-9]/g, '');
                
                if (parseInt(msg) > yearNow || parseInt(msg) < 1970) {
                    response = "Veuillez entrer une année valide";
                } else {
                    servicingMotorcycleYear = msg;
                    response = "En quelle année avez-vous fait votre dernier entretien ?"; 
                    stateResponse = "Servicing motorcycle : last servicing year"; 
                }
                break;   
            case "Servicing motorcycle : last servicing year":
                yearNow = new Date().getFullYear();

                msg = msg.replace(/[^0-9]/g, '');
                
                if (parseInt(msg) > yearNow || parseInt(msg) < 1970) {
                    response = "Veuillez entrer une année valide";
                } else if (parseInt(msg) < servicingMotorcycleYear) { 
                    response = "Vous ne pouvez pas avoir fait votre dernier entretien avant l'année de votre moto, veuillez entrer une année valide";
                } else if (parseInt(msg) < yearNow - 1) {
                    response = self.appointment(intent.name, 'appointment servicing');
                } else {
                    response = "Quelle est le nombre de kilomètres parcourus depuis le dernier entretien ?";
                    stateResponse = "Servicing motorcycle : km";
                }
                break;
            case "Servicing motorcycle : km":
                if (parseInt(msg) > 10000) {
                    response = self.appointment(intent.name, 'appointment servicing');
                } else {
                    response = "Votre moto n'a pas besoin d'entretien pour le moment, voulez-vous prendre un rendez-vous pour une révision ?";
                    stateResponse = "Servicing motorcycle : review request";
                }
                break;
            case "Servicing motorcycle : review request":
                if (msg.match(/oui/gi)) {
                    response = self.appointment(intent.name, 'appointment review');
                } else {
                    response = "D'accord, au revoir";
                    stateIntent = "Stop";
                }
                break;
            default:
                response = self.getDefaultResponse(intent);
                break;
        }

        return response;
    }

    self.getInfoMotorcycleResponse = (intent, msg) => {
        let response = null;

        switch (intent.name) {
            case "Info motorcycle : motorcycle type":
                if (msg.match(/(.*)routier(.*)/)) {
                    infoMotorcycleType = "routier";
                } else if (msg.match(/(.*)tout terrain(.*)/) || msg.match(/(.*)tout-terrain(.*)/)) {
                    infoMotorcycleType = "tout terrain";
                } else if (msg.match(/(.*)sportif(.*)/)) {
                    infoMotorcycleType = "sportif";
                }

                response = `Voulez-vous prendre un rendez-vous pour un essai ${infoMotorcycleType} ?`;
                stateResponse = "Info motorcycle : test request";
                break;
            case "Info motorcycle : test request":
                if (msg.match(/oui/gi)) {
                    response = self.appointment(intent.name, `appointment test ${infoMotorcycleType}`);
                } else {
                    response = "D'accord, au revoir";
                    stateIntent = "Stop";
                }
                break;
            default:
                response = self.getDefaultResponse(intent);
                break;
        }

        return response;
    }

    self.getInfoContactResponse = (intent, msg) => {
        let response = null;

        switch (intent.name) {
            case "Info contact : contact type":
                if (msg.match(/(.*)tel(.*)/) || msg.match(/(.*)tél(.*)/)) {
                    response = "Voici notre numéro de téléphone : 01 23 45 67 89";
                }
                else {
                    response = "Voici notre adresse email : contact@groupemoto.fr";
                }
                stateIntent = "Stop";
                break;
            default:
                response = self.getDefaultResponse(intent);
                break;
        }

        return response;
    }

    // create appointment response
    self.appointment = (intent, response) => {
        stateResponse = `${intent} : ${response}`;

        appointmentType = response;

        const dateNow = new Date();

        let formatResponse = response.replace(/ /g, '-');

        appointmentDateId = `appointment-date-${formatResponse}`;

        appointmentTimeId = `appointment-time-${formatResponse}`;

        appointmentMessageId = `appointment-message-${formatResponse}`;

        appointmentValidId = `validate-${formatResponse}`;

        return `Choisissez une date pour votre rendez-vous : 
                <input id="${appointmentDateId}" style="background-color:white" type='date' min='${dateNow.getFullYear}-${dateNow.getMonth}-${dateNow.getDay}'> 
                <input id="${appointmentTimeId}" style="background-color:white" type='time' min='09:00' max='18:00'>
                <button id="${appointmentValidId}" style="background-color:white">Valider</button>
                <span id="${appointmentMessageId}" style="background-color:darkorange; color:white; padding:5px; border-radius:7px; display:none;" ></span>`;
    }

    // getters 
    self.getStateIntent = () => {
        return stateIntent;
    }

    self.getStateResponse = () => {
        return stateResponse;
    }

    self.getAppointmentType = () => {
        return appointmentType;
    }

    self.getAppointmentDateId = () => {
        return appointmentDateId;
    }

    self.getAppointmentTimeId = () => {
        return appointmentTimeId;
    }

    self.getAppointmentValidId = () => {
        return appointmentValidId;
    }

    self.getAppointmentMessageId = () => {
        return appointmentMessageId;
    }

    return self;
}

export default chatbot;