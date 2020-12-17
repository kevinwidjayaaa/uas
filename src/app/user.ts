export class User {
    userId: string;
    emails: string;
    names: string;
    usernames: string;
    emailVerified: boolean;
    photo_profile: string;
    password: string;
    location: string;


    constructor(
        userId: string,
        emails: string,
        names: string,
        usernames: string,
        emailVerified: boolean,
        photo_profile: string
    ) {
    }
}
