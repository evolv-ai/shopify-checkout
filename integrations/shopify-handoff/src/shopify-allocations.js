
function sendAllocations(allocations){
    fetch('/cart/update.js', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            attributes: {evolv_allocations: allocations}
        })
    })
    .then(()=>{
        console.info('Evolv handoff: successfully sent allocations to shopify');
    })
    .catch(()=>{
        console.warn('Evolv handoff: failed to send allocations to shopify');
    })
}

export function processShopifyAllocations(userId, environment){
    const allocationsUrl = `https://participants.evolv.ai/v1/${environment}/${userId}/allocations`
    fetch(allocationsUrl).then(response => response.json())
    .then(data => {
        let allocations = data.map(e=>{ 
                                const {web, ...other} = e.genome; 
                                return {...e, environment, genome:other}
                              })
                              .filter(e=> Object.keys(e.genome).length > 0);
        sendAllocations(allocations);
    })
    .catch(error => {
        console.warn('Evolv handoff: Error with evolv genome retrieval:', error);
    });
}
 
    