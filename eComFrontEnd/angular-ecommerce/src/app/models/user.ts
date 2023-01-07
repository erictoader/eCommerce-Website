export class User {
    constructor(
        public id: number,
        public name: String, 
        public username: String,
        public password: String,
        public userType: number,
        public profilePicture: String,
        public registrationDate: number,
        public email: String
    ){}
}
