import { Injectable } from '@angular/core';

@Injectable()
export class CreateUniqueShortNameService {

    constructor() { }
    createUniqueName(source: string) {
        // takes in string with recepie name and shortname
        let shortName = source.toLowerCase();
        const uniqueStr = Date.now().toString().slice(8, 13);
        shortName = shortName.replace(/[^A-Za-z0-9]/g, '_').concat('_', uniqueStr);
        return shortName;
    }
}
