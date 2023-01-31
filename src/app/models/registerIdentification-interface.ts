export interface registerIdInterface {
    ids: {
        medicID: string,
        pacientID: string,
    },
    basicInfo: {
        fullName: string;
        gender: string;
        birthDate: Date;
        cpf: string,
        rg: string, 
        civilState : string, 
        telephone: string,
        email: string;
        naturality: string
    }, 
    convenioInfo: {
        nameConvenio: string, 
        nCarteira: string, 
        expirationDate: Date
    }, 
    addressInfo: {
        cep: string, 
        cidade: string, 
        estado: string, 
        logradouro: string,
        numberAdress: string,
        complementoAdress: string, 
        bairroAdress: string,
        pointOfReference: string,
    }, 
    extraInfo: {
        emergencyContact: string, 
        listOfAlergies: string
    }

}
