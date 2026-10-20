namespace my.users;

using {
    cuid,
    managed
} from '@sap/cds/common';

// Anagrafica utenti
entity Users : cuid, managed {
    firstName : String(100) @mandatory;
    lastName  : String(100) @mandatory;
    email     : String(255) @mandatory @assert.format: '^[^@\s]+@[^@\s]+\.[^@\s]+$';
    birthDate : Date;
    gender    : Association to Genders;
    role      : Association to Roles;
}

// Elenco dei generi (es. M, F, X)
entity Genders {
    key code : String(1);
        name : String(50) @mandatory;
}

// Elenco dei ruoli assegnabili agli utenti
entity Roles {
    key code        : String(20);
        name        : String(100) @mandatory;
        description : String(255);
        users       : Association to many Users
                          on users.role = $self;
}
