import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    constructor() {}

    filterData(Array: any[], Text: string, Keys?: any[]) {
        if (Text === '' || Text === undefined) return Array;
        Array = Array.sort(function (a, b) {
            return a.id - b.id;
        });
        Text = Text.toLowerCase();
        if (Keys) {
            return Array.filter((item) => {
                for (let key of Keys) {
                    if (item[key] && item[key].toString().toLowerCase().includes(Text)) return item;
                }
            });
        } else {
            return this.findRecursive(Array, Text);
        }
    }

    findRecursive(Array: any, Text: string) {
        if (!Array) return;

        const jsonConstructor = {}.constructor;

        return Array.filter((item: any) => {
            for (let key of Object.keys(item)) {
                if (item[key]) {
                    if (Array.isArray(item[key])) {
                        const recursiveValue = this.findRecursive(item[key], Text);
                        if (recursiveValue.length > 0) {
                            return recursiveValue;
                        }
                    } else if (item[key].constructor === jsonConstructor) {
                        for (let newKey of Object.keys(item[key])) {
                            if (item[key][newKey]) {
                                if (item[key][newKey].toString().toLowerCase().includes(Text)) {
                                    return item;
                                }
                            }
                        }
                    } else {
                        if (item[key].toString().toLowerCase().includes(Text)) {
                            return item;
                        }
                    }
                }
            }
        });
    }
}
