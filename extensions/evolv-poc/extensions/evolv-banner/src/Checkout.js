import {
  extension,
  Banner,
  BlockStack
} from "@shopify/ui-extensions/checkout";


import { getEvolvAllocatedAttributes } from '@evolv-delivery/shopify-checkout'

// 1. Choose an extension target
export default extension("purchase.checkout.block.render", (root, api) => {
  // 2. Check instructions for feature availability, see https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions for details

  const { banner_path } = api.settings.current;

  let evolvAttributes = getEvolvAllocatedAttributes(api, [
    `${banner_path}.visible`, 
    `${banner_path}.title`,
    `${banner_path}.body`
  ]);
  
  //provide default content that appears in editor when evolv attributes are not available
  let showBanner = evolvAttributes[0];
  let bannerTitle = evolvAttributes[1] || 'Lowest Price, Guaranteed';
  let bannerBody = evolvAttributes[2] || 'Shop with confidence — you’re getting our lowest online price.';

  api.instructions.subscribe((instructions) => {
    if (!instructions.attributes.canUpdateAttributes) {
      // For checkouts such as draft order invoices, cart attributes may not be allowed
      // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
      root.replaceChildren(
        root.createComponent(
          Banner,
          { title: "evolv-banner", status: "warning" },
          api.i18n.translate("attributeChangesAreNotSupported")
        )
      );
    } else if(showBanner || api.extension?.editor){
        // 3. Render a UI
        root.replaceChildren(
          root.createComponent(
            BlockStack,
            // { padding: "tight" },
            {},
            [
              root.createComponent(
                Banner,
                { title: bannerTitle, status: 'success' },
                bannerBody
                // api.i18n.translate("welcome", {
                //   target: root.createComponent(
                //     Text,
                //     { emphasis: "italic" },
                //     api.extension.target
                //   ),
                // })
              )
            ]
          )
        
        );
      }
  });
});