
import { processGenomes } from './shopify-allocations.js'
import { instrumentSpaEvent } from './spa.js'; 
import { getDefaultEnv, getDefaultUid } from './util.js'; 

const sessionKey = 'evolv:shopify-handoff';
let cartPage = '/cart';
let userId = getDefaultUid();
let env = getDefaultEnv();

function processConfig(config){
    if (config?.environment){
        env = config?.environment;
    }

    if (config?.cart){
        cartPage = config?.cart;
    }

    checkPageActivation();
    withPageChange(checkPageActivation);
    checkSessionStart();
}

function checkSessionStart(){
    if (!sessionStorage.getItem(sessionKey)){
        sendAllocations();
    }
}

function checkPageActivation(){
    if (new RegExp(cartPage, 'i').test(location.pathname)){
        sendAllocations();
    }
}

function sendAllocations(){
    if (userId && env) {
        sessionStorage.setItem(sessionKey, true);
        processGenomes(userId, env);
    } else {
        console.log('No data sent to shopify - no userId or env found');
    }
}

function withPageChange(fnc){
    const SpaTag = 'evolv_shopifty_spaChange';
    instrumentSpaEvent(SpaTag);
    window.addEventListener(SpaTag, fnc);
}

module.exports = processConfig;
