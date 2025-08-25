
const DataKey = "experiments.confirmations";
const DataMessageType = "context.initialized";
const EventType = "confirmation";


export function getEvolvAllocatedAttributes(api, attributeNames, defaultValues){
    const { attributes } = api;
    const allocationAttribute = attributes.current.find(at => at.key === "evolv_allocations") || {value:`[]`}; 
    const allocations = JSON.parse(allocationAttribute.value.replaceAll('=>', ':'));
    const confirmingAllocations = attributeNames
          .map(attribute => findExperiment(allocations, attribute.split('.')))

    confirmingAllocations
        .reduce((set, a)=>(!set || set.includes(a) ?set :[...set, a]), [])
        .forEach(allocation=> confirmExperiment(allocation));

    return attributeNames.map((name,i)=>getAttributeValue(confirmingAllocations[i], name.split('.')))
}

function findExperiment(allocations, attributePath){
    return allocations.find(a=> getAttributeValue(a, attributePath) !== undefined);
}

function getAttributeValue(allocation, attributePath){
    if (!allocation) return undefined;

    return attributePath.reduce((result, node)=> result && result[node], allocation.genome.shopify);
}

function confirmExperiment(allocation){
    if (!allocation) return;

    // fetch(eventUrl(allocation)).then(()=>
    //     console.log('succesfully sent evolv event for confirmation')
    // )

    fetch(dataUrl(allocation)).then(()=>
        console.log('succesfully sent evolv data for confirmation')
    )
}

// function eventUrl(allocation){
//     const {cid, eid, uid, environment} = allocation;
//     const event = {
//         uid,
//         eid,
//         cid,
//         type: EventType
//     };

//     return `https://participants.evolv.ai/v1/${environment}/events?${encodeQueryParams(event)}`
// }

function dataUrl(allocation){
    const {cid, uid, environment} = allocation;
    const timestamp = new Date().getTime();
    const data = {
        uid,
        client: 'shopify',
        messages: [{
            type: DataMessageType,
            payload: {
                key: DataKey,
                value: [{ cid, timestamp}],
            },
            timestamp
        }]
    }

  return `https://participants.evolv.ai/v1/${environment}/data?${encodeQueryParams(data)}`
}

function encodeQueryParams(data){
    return Object.keys(data)
      .map(k=>
        `${k}=${isObject(data[k]) ?encodeURIComponent(JSON.stringify(data[k])) : data[k]}`
      )
      .join('&')
}

function isObject(v){
    return v !== null && typeof v === 'object';
}