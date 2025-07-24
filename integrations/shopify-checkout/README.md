# Evolv - Shopfify Checkout

    This integration retrieves attributes from through the cart page form.",


## Usage
An example usage is as follows:

```
    import { getEvolvAllocatedAttributes } from '@evolv-delivery@shopify-checkout.js'

    export default extension("purchase.checkout.block.render", (root, api) => {

    let evolvAttributes = getEvolvAllocatedAttributes(api, ['show_banner', 'banner_copy']);
    let showBanner = evolvAttributes[0]|| true;
    let bannerCopy = evolvAttributes[1] || 'dev banner';

    ;...
    })
```


An example of the evolv payload that gets sent to shopify from the cart is as follows:
```
{
  "attributes": {
    "evolv_allocations": [
      {
        "uid": "72697758_1720475534433",
        "eid": "a62ea2641b",
        "cid": "258f24170ac2:a62ea2641b",
        "genome": { "shopify": { "banner-position": "top" } },
        "audience_query": {},
        "ordinal": 1,
        "group_id": "02797d45-f5f4-42ea-a0b7-da27c5531a26",
        "excluded": false,
        "environment": "000704fda3"
      }
    ]
  }
}
```
