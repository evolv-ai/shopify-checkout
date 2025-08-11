


# Overview: Running an evolv.ai Test in the Shopify Checkout Process
This expanded guide explains how to implement an evolv.ai experiment in the Shopify checkout process using two integrations: @evolv-delivery/shopify-handoff and @evolv-delivery/shopify-checkout.

## What Are These Integrations?
@evolv-delivery/shopify-handoff
Bridges evolv.ai allocation (variant) data from your experimentation platform into the Shopify cart attributes, ensuring every user has their variant info available throughout checkout.

@evolv-delivery/shopify-checkout
Allows retrieval and usage of evolv attributes at the checkout step itself, so you can personalize the checkout UI and functionality using experiment allocations.

## Overview

```mermaid
graph TD;
    "Cart_Page"-->"Shopify Cart Attributes";
    "Shopify Cart attributes"-->"Shopify Checkout";
```


## Step-by-Step Instructions
### 1. Prerequisite Setup
Have an evolv.ai experiment ready for allocation.

Admin access to your Shopify store (for code/customization).

Ability to install npm packages and inject custom scripts.

### 2. Install Both Packages
Install both integrations in your project:

bash
npm install @evolv-delivery/shopify-handoff @evolv-delivery/shopify-checkout

### 3. Setting Up the Shopify Handoff Integration
By default, this package monitors Shopify's cart page (/cart). If your cart uses a custom path, update the config.

Add the package to your theme’s cart page or global scripts.

This integration writes evolv.ai allocation data into the cart attributes structure.

Example allocation attribute:

``` json
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
``` 

This payload travels downstream in Shopify’s order process.

### 4. Using evolv.ai Allocations at Checkout
@evolv-delivery/shopify-checkout is installed in the checkout extensions/app layer.

In your Shopify checkout extension code, retrieve allocation attributes using the package.

Example usage:

``` js
import { getEvolvAllocatedAttributes } from '@evolv-delivery/shopify-checkout';

export default extension("purchase.checkout.block.render", (root, api) => {
    let evolvAttributes = getEvolvAllocatedAttributes(api, ['show_banner', 'banner_copy']);
    let showBanner = evolvAttributes[0] || true;
    let bannerCopy = evolvAttributes[1] || 'dev banner';
    // Use showBanner and bannerCopy in your checkout UI
});
```

Values set in the cart by the handoff package are available here for targeting personalization and analytics.

### 5. Full Experiment and Checkout Flow
User visits site and adds products to cart.

@evolv-delivery/shopify-handoff puts evolv allocations in cart attributes.

User proceeds to checkout.

@evolv-delivery/shopify-checkout reads allocation data at checkout, powering your personalizations.

Order and analytics systems now have full visibility into user variant assignments.

## Summary Table
| Step	| Tool	| Description |
| Allocation at Cart	| shopify-handoff	| Exports evolv data into cart attributes   |
| Data Read at Checkout	| shopify-checkout	| Reads evolv data for real-time checkout personalization |
| Experiment Analytics	| Both	            | Ensures variant data in order and analytics pipelines |

By integrating both packages, the full evolv.ai experiment loop is maintained from cart to checkout, personalizing the experience and ensuring all data required for analytics and optimization is in place.

For implementation details and troubleshooting, see the official package documentation for @evolv-delivery/shopify-handoff and @evolv-delivery/shopify-checkout.

