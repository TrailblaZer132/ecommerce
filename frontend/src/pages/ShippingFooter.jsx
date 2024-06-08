import React from "react";

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 mt-[5rem]">
      <h1 className="mb-8 text-2xl font-bold text-dark-gray">Shipping</h1>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        What are the delivery charges?
      </h2>
      <p className="mb-8 text-dark-gray">
        Delivery charge varies with each Seller. Sellers incur relatively higher
        shipping costs on low value items. In such cases, charging a nominal
        delivery charge helps them offset logistics costs. Please check your
        order summary to understand the delivery charges for individual
        products.
      </p>
      <p className="mb-8 text-dark-gray">
        For products listed as Flipkart Plus, a ₹40 charge for delivery per item
        may be applied if the order value is less than ₹500. Orders of ₹500 or
        above are delivered free.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        Why does the delivery date not correspond to the delivery timeline of
        X-Y business days?
      </h2>
      <p className="mb-8 text-dark-gray">
        It is possible that the Seller or our courier partners have a holiday
        between the day you placed your order and the date of delivery, which is
        based on the timelines shown on the product page. In this case, we add a
        day to the estimated date. Some courier partners and Sellers do not work
        on Sundays and this is factored into the delivery dates.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        What is the estimated delivery time?
      </h2>
      <p className="mb-8 text-dark-gray">
        Sellers generally procure and ship the items within the time specified
        on the product page. Business days exclude public holidays and Sundays.
        Estimated delivery time depends on the following factors:
      </p>
      <ul className="mb-8 text-dark-gray list-disc list-inside">
        <li>The Seller offering the product</li>
        <li>Product's availability with the Seller</li>
        <li>
          The destination to which you want the order shipped to and location of
          the Seller
        </li>
      </ul>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        Are there any hidden costs (sales tax, octroi etc) on items sold by
        Sellers on Flipkart?
      </h2>
      <p className="mb-8 text-dark-gray">
        There are NO hidden charges when you make a purchase on Flipkart. List
        prices are final and all-inclusive. The price you see on the product
        page is exactly what you would pay. Delivery charges are not hidden
        charges and are charged (if at all) extra depending on the Seller's
        shipping policy.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        Why does the estimated delivery time vary for each seller?
      </h2>
      <p className="mb-8 text-dark-gray">
        You have probably noticed varying estimated delivery times for sellers
        of the product you are interested in. Delivery times are influenced by
        product availability, geographic location of the Seller, your shipping
        destination and the courier partner's time-to-deliver in your location.
      </p>
      <p className="mb-8 text-dark-gray">
        Please enter your default pin code on the product page (you don't have
        to enter it every single time) to know more accurate delivery times on
        the product page itself.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        Seller does not/cannot ship to my area. Why?
      </h2>
      <p className="mb-8 text-dark-gray">
        Please enter your pincode on the product page (you don't have to enter
        it every single time) to know whether the product can be delivered to
        your location.
      </p>
      <p className="mb-8 text-dark-gray">
        If you haven't provided your pincode until the checkout stage, the
        pincode in your shipping address will be used to check for
        serviceability.
      </p>
      <p className="mb-8 text-dark-gray">
        Whether your location can be serviced or not depends on:
      </p>
      <ul className="mb-8 text-dark-gray list-disc list-inside">
        <li>Whether the Seller ships to your location</li>
        <li>
          Legal restrictions, if any, in shipping particular products to your
          location
        </li>
        <li>The availability of reliable courier partners in your location</li>
      </ul>
      <p className="mb-8 text-dark-gray">
        At times Sellers prefer not to ship to certain locations. This is
        entirely at their discretion.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        Why is the CoD option not offered in my location?
      </h2>
      <p className="mb-8 text-dark-gray">
        Availability of CoD depends on the ability of our courier partner
        servicing your location to accept cash as payment at the time of
        delivery.
      </p>
      <p className="mb-8 text-dark-gray">
        Our courier partners have limits on the cash amount payable on delivery
        depending on the destination and your order value might have exceeded
        this limit. Please enter your pin code on the product page to check if
        CoD is available in your location.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        I need to return an item, how do I arrange for a pick-up?
      </h2>
      <p className="mb-8 text-dark-gray">
        Returns are easy. Contact Us to initiate a return. You will receive a
        call explaining the process, once you have initiated a return.
      </p>
      <p className="mb-8 text-dark-gray">
        Wherever possible Ekart Logistics will facilitate the pick-up of the
        item. In case, the pick-up cannot be arranged through Ekart, you can
        return the item through a third-party courier service. Return fees are
        borne by the Seller.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        I did not receive my order but got a delivery confirmation SMS/Email.
      </h2>
      <p className="mb-8 text-dark-gray">
        In case the product was not delivered and you received a delivery
        confirmation email/SMS, report the issue within 7 days from the date of
        delivery confirmation for the seller to investigate.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        What do the different tags like "In Stock", "Available" mean?
      </h2>
      <p className="mb-8 text-dark-gray">'In Stock'</p>
      <p className="mb-8 text-dark-gray">
        For items listed as "In Stock", Sellers will mention the delivery time
        based on your location pincode (usually 2-3 business days, 4-5 business
        days or 4-6 business days in areas where standard courier service is
        available). For other areas, orders will be sent by Registered Post
        through the Indian Postal Service which may take 1-2 weeks depending on
        the location.
      </p>
      <p className="mb-8 text-dark-gray">'Available'</p>
      <p className="mb-8 text-dark-gray">
        The Seller might not have the item in stock but can procure it when an
        order is placed for the item. The delivery time will depend on the
        estimated procurement time and the estimated shipping time to your
        location.
      </p>
      <p className="mb-8 text-dark-gray">'Preorder' or 'Forthcoming'</p>
      <p className="mb-8 text-dark-gray">
        Such items are expected to be released soon and can be pre-booked for
        you. The item will be shipped to you on the day of its official release
        launch and will reach you in 2 to 6 business days. The Preorder duration
        varies from item to item. Once known, release time and date is
        mentioned. (Eg. 5th May, August 3rd week)
      </p>
      <p className="mb-8 text-dark-gray">'Out of Stock'</p>
      <p className="mb-8 text-dark-gray">
        Currently, the item is not available for sale. Use the 'Notify Me'
        feature to know once it is available for purchase.
      </p>
      <p className="mb-8 text-dark-gray">'Imported'</p>
      <p className="mb-8 text-dark-gray">
        Sometimes, items have to be sourced by Sellers from outside India. These
        items are mentioned as 'Imported' on the product page and can take at
        least 10 days or more to be delivered to you.
      </p>
      <p className="mb-8 text-dark-gray">'Back In Stock Soon'</p>
      <p className="mb-8 text-dark-gray">
        The item is popular and is sold out. You can however 'book' an order for
        the product and it will be shipped according to the timelines mentioned
        by the Seller.
      </p>
      <p className="mb-8 text-dark-gray">'Temporarily Unavailable'</p>
      <p className="mb-8 text-dark-gray">
        The product is currently out of stock and is not available for purchase.
        The product could be in stock soon. Use the 'Notify Me' feature to know
        when it is available for purchase.
      </p>
      <p className="mb-8 text-dark-gray">'Permanently Discontinued'</p>
      <p className="mb-8 text-dark-gray">
        This product is no longer available because it is obsolete and/or its
        production has been discontinued.
      </p>
      <p className="mb-8 text-dark-gray">'Out of Print'</p>
      <p className="mb-8 text-dark-gray">
        This product is not available because it is no longer being published
        and has been permanently discontinued.
      </p>

      <h2 className="mb-5 text-xl font-semibold text-dark-gray">
        Does Flipkart deliver internationally?
      </h2>
      <p className="mb-8 text-dark-gray">
        As of now, Flipkart doesn't deliver items internationally. You will be
        able to make your purchases on our site from anywhere in the world with
        credit/debit cards issued in India and 21 other countries, but please
        ensure the delivery address is in India.
      </p>
    </div>
  );
};

export default Shipping;
