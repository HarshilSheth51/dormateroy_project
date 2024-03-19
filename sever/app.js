const express = require("express");
const app = express();
const cors = require("cors");
var easyinvoice = require('easyinvoice');
const fs = require('fs')
const stripe = require("stripe")(
  "sk_test_51OrCiESEJA20B9hoIV3Ehc4BoEuYSv03BcAFJXxWosdorSkpzd2e9aMpdEHJwmG57MdfrhQ3uXdeUo4V8NkQaRGo00r2taDO6i"
);

app.use(express.json());
app.use(express.static("public"));
app.use(cors({origin:"http://localhost:3000"}));

app.post("/paymentsession", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        invoice_creation: {
            enabled: true,
          },
        line_items: req.body.dormaterydata.map((item) => {
          console.log(item)
          const unitPrice = item.finalallprice / item.qty; 
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.dormateroyname,
              },
              unit_amount: Math.floor(unitPrice * 100),
            },
            quantity: item.qty,
          };
        }),
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
  
  

      
      res.json({ url: session.url });


    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred");
    }
});

app.listen(4000, () => {
  console.log("Server is started");
});
