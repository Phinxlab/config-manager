'use strict';
const LogManager=require('@phinxlab/log-manager-public');
const Log=new LogManager('Global');
const Fs = require('fs');

/**
 * Simple Global configuration manager
 */
class Global {

    initPath(path) {
        Log.info(`Initializing Gloabal config ${path}`)
        Global.basepath=path;
    }
    /**
     * Store the key on the global file
     * @param key
     * @param value
     */
    addConfig(key,value) {
        Log.info(`Setting ${key} value`);
        this[key.toUpperCase()]=value;
    }

    /**
     * Reads configuration from the specified path
     * @param key
     * @param path
     */
    readConfig(key,path) {
        Log.info(`Reading ${key} with path ${Global.basepath+path}`);
        this.addConfig(key,require(Global.basepath+path));
    }
    /**
     * Persist the configuration to disk
     * @param key
     * @param value
     * @param path
     */
    persist(key,value,path) {
        Log.info(`Persisting ${key} with path ${Global.basepath+path}`);
        Fs.writeFileSync(Global.basepath+path,
                         JSON.stringify(value));
        this.addConfig(key,value);
    }

}


const general=new Global();
global.Global=general;
module.exports=general;