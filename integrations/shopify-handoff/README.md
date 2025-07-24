# Evolv -> Shopfify handoff Integration

This integration sends shopify allcoations from Evolv through the shopify form attributes.

## Setup in the Evolv Manager

[Adding an integration to the Evolv Manager](https://github.com/evolv-ai/env-integrations/blob/main/README.md)


## Customization

By default this integration will match on the shopify standard path `/cart` to apply the allocations. If this does not match the cart page of your site, you can alter that by altering the '"cart"' attribute in the config json:

```
{
    "cart": "/my-cart-page"
}
```

An example of the payload that gets sent to shopify is as follows:
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
