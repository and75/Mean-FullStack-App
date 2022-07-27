const Tag = require('../models/tag.model');
const Activity = require('../models/activity.model');

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
 const dateAdd  = (date, interval, units)=> {
    if(!(date instanceof Date))
      return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
    switch(String(interval).toLowerCase()) {
      case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
      case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
      case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
      case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
      case 'day'    :  ret.setDate(ret.getDate() + units);  break;
      case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
      case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
      case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
      default       :  ret = undefined;  break;
    }
    return ret;
}

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
 const dateMinus  = (date, interval, units)=> {
    if(!(date instanceof Date))
      return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
    switch(String(interval).toLowerCase()) {
      case 'year'   :  ret.setFullYear(ret.getFullYear() - units); checkRollover();  break;
      case 'quarter':  ret.setMonth(ret.getMonth() - 3*units); checkRollover();  break;
      case 'month'  :  ret.setMonth(ret.getMonth() - units); checkRollover();  break;
      case 'week'   :  ret.setDate(ret.getDate() - 7*units);  break;
      case 'day'    :  ret.setDate(ret.getDate() - units);  break;
      case 'hour'   :  ret.setTime(ret.getTime() - units*3600000);  break;
      case 'minute' :  ret.setTime(ret.getTime() - units*60000);  break;
      case 'second' :  ret.setTime(ret.getTime() - units*1000);  break;
      default       :  ret = undefined;  break;
    }
    return ret;
}

const tagStore = (data) => {

    return new Promise((resolve, reject) => {
        console.log('tagStore', data.tags)
        if (data.tags && data.tags.length > 0) {
            try {
                let stored = [];
                const dateNow = Date.now();
                
                data.tags.forEach(async (element, index, array) => {
                    let exist = await Tag.find({ label: element.toLowerCase() }).exec();
                    console.log('tagStore exist', exist)
                    if (exist.length > 0) {
                        stored[index] = exist[0];
                    } else {
                        /*const term = new Tag({
                            label: element.toLowerCase(),
                            accessId: 2,
                            created: dateNow,
                            updated: dateNow,
                            owner: data.owner._id,
                        })
                        let created = await term.save();
                        stored[index] = created[0];*/
                    }
                    if (index === array.length - 1) {
                        resolve(stored);
                    }
                });
            } catch (error) {
                reject(error);
            }
        } else {
            reject('No tags on object!');
        }
    })
}

const registerActivity = (data) => {

    return new Promise ((resolve, reject)=>{

        //find if similar actvity exist on the last 10 MIN
        let now = Date.now();
        let past10 = dateMinus(now, 'minute', 10 )
        console.log(past5);
        
    });

}

const coreLib = {
    tagStore: tagStore,
    registerActivity:registerActivity
};
module.exports = coreLib;