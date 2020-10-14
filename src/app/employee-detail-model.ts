export interface EmployeeDetails {
    name: string;
    mail: string;
    address1: string;
    address2: string;
    locLattitude: number;
    locLongitude: number;
    phoneNumber: number;
    imageURL: any;
}

export class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';
    constructor(public src: string, public file: File) { }
}
