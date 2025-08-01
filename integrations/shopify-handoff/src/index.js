
import { processShopifyAllocations } from './shopify-allocations.js'
import { instrumentSpaEvent } from './spa.js'; 
import { getDefaultEnv, getDefaultUid } from './util.js'; 

const sessionKey = 'evolv:shopify-handoff';
let cartPage = '/cart';
let env = getDefaultEnv();

function processConfig(config){
    initializeOverrides(config)
    checkPageActivation();
    withPageChange(checkPageActivation);
    // checkSessionStart();
}

function initializeOverrides(config){
    if (config?.environment){
        env = config?.environment;
    }
    if (config?.cart){
        cartPage = config?.cart;
    }
}

// function checkSessionStart(){
//     if (!sessionStorage.getItem(sessionKey)){
//         sendAllocations();
//     }
// }

function checkPageActivation(){
    setTimeout(()=>{
        if (new RegExp(cartPage, 'i').test(location.pathname)){
            sendAllocations();
        }
    }, 50);
}

function sendAllocations(){
    const userId = getDefaultUid() || localStorage.getItem('evolv:uid');
    if (userId && env) {
        processShopifyAllocations(userId, env);
        sessionStorage.setItem(sessionKey, true);
    } else {
        console.log('No evolv allocations sent to shopify - no userId or env found');
    }
}

function withPageChange(fnc){
    const SpaTag = 'evolv_shopifty_spaChange';
    instrumentSpaEvent(SpaTag);
    window.addEventListener(SpaTag, fnc);
}

module.exports = processConfig;
