
export function getDefaultUid(){
    return window.evolv.context.get('experiments')?.allocations?.[0]?.uid;
}
export function getDefaultEnv(){
    return document.querySelector("[data-evolv-environment]")?.getAttribute("data-evolv-environment");
}
