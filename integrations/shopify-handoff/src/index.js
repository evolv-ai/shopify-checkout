
import { processGenomes } from './shopify-allocations.js'

const userId = getUid();
const env = getEnv();

function getUid(){
    return window.evolv.context.get('experiments')?.allocations?.[0]?.uid;
}
function getEnv(){
    return document.querySelector("[data-evolv-environment]")?.getAttribute("data-evolv-environment");
}

function processConfig(config){
    const cartTest = config?.cart || '/cart';

    if (!new RegExp(cartTest, 'i').test(location.pathname)) return;

    if (userId && env) {
        processGenomes(userId, env);
    } else {
        console.log('No data sent to shopify - no userId or env found');
    }

}

module.exports = processConfig;
