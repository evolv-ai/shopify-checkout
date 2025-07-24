
function addAllocations(allocations){
    fetch('/cart/update.js', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            attributes: {evolv_allocations: allocations}
        })
    }).then(data=>
        console.info('successfully sent data to shopify', data)
    ); 
}

export function processGenomes(userId, environment){
    const allocationsUrl = `https://participants.evolv.ai/v1/${environment}/${userId}/allocations`
    fetch(allocationsUrl).then(response => response.json())
    .then(data => {
        let allocations = data.map(e=>{ 
                                const {web, ...other} = e.genome; 
                                return {...e, environment, genome:other}
                              })
                              .filter(e=> Object.keys(e.genome).length > 0);
        console.log('evolv genome:', allocations);
        addAllocations(allocations);
    })
    .catch(error => {
        console.error('Error with evolv genome retrieval:', error);
    });

}
 
    