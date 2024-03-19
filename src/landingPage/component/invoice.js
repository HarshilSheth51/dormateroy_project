import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import easyinvoice from "easyinvoice";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const Invoice = () => {
    const navigate = useNavigate();
    const [dormateroyname, setDormateroyname] = useState("");
    const [price, setprice] = useState("");
    const [name, setname] = useState("");
    const [mobnum, setmobnum] = useState("");
    const [payment, setpayment] = useState("Sucess");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://dormatery-project-default-rtdb.firebaseio.com/conformdetails.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                const confdata = Object.values(data);
                confdata.forEach((items) => {
                    setDormateroyname(items.dormateroyname);
                    setprice(items.finalallprice);
                    setname(items.username);
                    setmobnum(items.mobilenum);
                });
                // Do the POST request here after setting the state values
               
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handledownload = () => {
        var data = {
            apiKey: "free",
            mode: "development",
            images: {
                logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
                background: "https://public.budgetinvoice.com/img/watermark-draft.jpg"
            },
            sender: {
                company: "Dormateroy Discovery",
                address: "Ahmedabad",
                zip: "252312",
                city: "Ahmedabad",
                country: "India"
            },
            client: {
                company: name,
                address: "Ahmedabad",
                zip: "4567 CD",
                city: "Ahmedabad",
                country: "India"
            },
            information: {
                number: mobnum,
                date: "12-12-2021",
                dueDate: "31-12-2021"
            },
            products: [
                {
                    quantity: 0,
                    description: dormateroyname,
                    taxRate: 0,
                    price: price
                },
            ],
        };
        easyinvoice.createInvoice(data, function (result) {
            console.log('PDF base64 string: ', result.pdf);
            easyinvoice.download("invoice.pdf");
        });
        
    }

    return (
        <>
            <div style={{ justifyContent: 'center', textAlign: 'center', marginTop: '20%' }}>
             
                <Button 
                color="success" variant="contained" onClick={handledownload}  role="button"><span className="text">Download Invoice</span></Button>
            </div>
        </>
    );
}

export default Invoice;
