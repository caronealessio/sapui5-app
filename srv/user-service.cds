using my.users as db from '../db/schema';

// Servizio OData V4 per la gestione degli utenti e delle relative tabelle di supporto
service UserService {
    entity Users   as projection on db.Users;
    entity Genders as projection on db.Genders;
    entity Roles   as projection on db.Roles;
}
