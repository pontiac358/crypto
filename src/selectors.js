import * as R from 'ramda'


export const objToArray = snapshot => {

    var returnArr = Object.keys(snapshot).map(key =>  snapshot[key]);

    return returnArr;
};
