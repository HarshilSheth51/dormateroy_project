import React from 'react';
import { Stack, TextField, Button, Divider, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import toast from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';

const ConformBook = ({ price, dormateroyname, qty }) => {
    const [username, setusrname] = useState();
    const [user, setUser] = useState('');
    const [checkindate, setcheckindate] = useState();
    const [checkoutdate, setcheckoutdate] = useState();
    const [rooms, setroom] = useState();
    const [guests, setguest] = useState();
    const [fromtime, setfromtime] = useState();
    const [totime, settotime] = useState();
    const [finalallprice, setfinalallprice] = useState();
    const [formerror, seterror] = useState({});
    const [roomprice, setroomprice] = useState();
    const [totalprice, settotalrpice] = useState();
    const [confdata, setconfdata] = useState({
        fullname: '',
        mobilenum: '',
        document: '',
        adharnum: '',
    });

    console.log('price', finalallprice);
    const navigate = useNavigate();

    const confonchange = (e) => {
        const { name, value } = e.target;
        setconfdata({ ...confdata, [name]: value });
        console.log('value', value);
        seterror((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    useEffect(() => {
        const authstate = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log('hello', user);
            } else {
                console.log('logged out');
                setUser('');
            }
        });

        return () => authstate();
    }, []);

    useEffect(() => {
        fetch('https://dormatery-project-default-rtdb.firebaseio.com/regidata.json')
            .then((res) => res.json())
            .then((data) => {
                let newobj = Object.values(data);
                const foundUser = newobj.find((obj) => user.email === obj.email);
                if (foundUser) {
                    console.log(foundUser.firstname);
                    setusrname(foundUser.firstname + foundUser.lastname);
                } else {
                    console.log('user not found');
                }
            });
    }, [user]);

    useEffect(() => {
        fetch('https://dormatery-project-default-rtdb.firebaseio.com/searchingDetails.json')
            .then((res) => res.json())
            .then((data) => {
                let newobj = Object.values(data);
                const date = newobj.find((items) => {
                    setcheckindate(items.cheakin);
                    setcheckoutdate(items.cheakout);
                    setroom(items.room);
                    setguest(items.guest);
                    setfromtime(items.scheduleStartTime);
                    settotime(items.scheduleEndTime);
                });
            });
    }, []);

    const [timeprice, settimeprice] = useState(Math.floor(price / 2));
    const [timedisprice, settimedisprice] = useState(Math.floor(timeprice * 0.3));
    const [timetotalprice, settimetotalprice] = useState();
    const [totalDays, setTotalDays] = useState('');
    const timedispre = 0.3;
    const timediscountprice = timeprice * (1 - timedispre);
    const timetotalsaving = Math.floor(timeprice - timediscountprice);

    const [discountprice, setnewprice] = useState(Math.floor(roomprice * 0.3));

    const discountPercentage = 0.3;
    const discountedPrice = roomprice * (1 - discountPercentage);
    const totalSaving = Math.floor(roomprice - discountedPrice);

    const taxes = 115;
    const finalprice = taxes + totalprice;

    const timefinalprice = taxes + timetotalprice;

    let newCheckinDate = new Date(checkindate);
    let newCheckoutDate = new Date(checkoutdate);

    let difference = newCheckoutDate.getTime() - newCheckinDate.getTime();
    let diffDay = Math.round(difference / (1000 * 3600 * 24));

    useEffect(() => {
        settimetotalprice(Math.floor(timeprice - timedisprice));
        setroomprice(Math.floor(price * diffDay * rooms));
        settotalrpice(Math.floor(roomprice - totalSaving));
        setTotalDays(diffDay);
    });

    useEffect(() => {
        function createfinalprice() {
            if (fromtime === '' && totime === '') {
                return finalprice;
            } else {
                return timefinalprice;
            }
        }
        setfinalallprice(createfinalprice());
    }, [fromtime, totime, finalprice, timefinalprice]);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handlesubmit = async () => {
        const stripe = await loadStripe(
            'pk_test_51OrCiESEJA20B9hobWwtDjE298MmInmUvBJzIH2WDTkFukFcl5KEo6C2NGkC9ZvjgghkmQxInbcEre55wu5pXuXS00f2I6WQT8'
        );
        seterror(validate(confdata));
        const { fullname, mobilenum, document, adharnum } = confdata;
        if (fullname && document && mobilenum.length == 10 && adharnum.length == 12) {
            const response = await fetch('http://localhost:4000/paymentsession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dormaterydata: [
                        {
                            fullname,
                            mobilenum,
                            document,
                            adharnum,
                            dormateroyname,
                            finalallprice,
                            qty,
                        },
                    ],
                }),
            });

            let ndata = await fetch('https://dormatery-project-default-rtdb.firebaseio.com/conformdetails.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    fullname,
                    mobilenum,
                    document,
                    adharnum,
                    finalprice,
                    finalallprice,
                    dormateroyname,
                    checkindate,
                    checkoutdate,
                    fromtime,
                    totime,
                    rooms,
                    guests,
                    totalDays,
                }),
            });
            const data = await response.json();
            window.location = data.url;
            toast.success('Data is Verify  ', {
                duration: 6000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '17px',
                    fontWeight: 'bold',
                },
            });
            setconfdata({
                fullname: '',
                mobilenum: '',
                document: '',
                adharnum: '',
            });
        } else {
            toast.error('Invalid details', {
                duration: 4000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '17px',
                    fontWeight: 'bold',
                },
            });
        }
    };

    function validate(values) {
        const errors = {};

        if (!values.fullname) {
            errors.fullname = 'Full Name is Required';
        }
        if (!values.mobilenum) {
            errors.mobilenum = 'Mobile Number is Required';
        } else if (values.mobilenum.length !== 10) {
            errors.mobilenum = 'Mobile Number is not valid';
        }
        if (!values.adharnum) {
            errors.adharnum = 'Adharcard Number is Required';
        } else if (values.adharnum.length !== 12) {
            errors.adharnum = 'Adharcard Number is not valid';
        }
        if (!values.document) {
            errors.document = 'Document is Required';
        }
        return errors;
    }

    return (
        <>
            <div className="header">
                <h1></h1>
            </div>

            <div className="row">
                <Stack direction={{ xs: 'column', sm: 'row' }}>
                    <div className="col-12 col-sm-6">
                        <div className="fi-detail">
                            <div style={{}}>
                                <h2>Enter Your Details</h2>

                                <p>We will use these details to share your booking information.</p>
                            </div>
                            <form>
                                <TextField
                                    id="outlined-basic"
                                    label="Full Name"
                                    variant="outlined"
                                    style={{ marginBottom: '0rem', width: '100%' }}
                                    onChange={confonchange}
                                    name="fullname"
                                    value={confdata.fullname}
                                />
                                <p className="conferr-message">{formerror.fullname}</p>
                                <TextField
                                    id="outlined-basic"
                                    label="Mobile Number"
                                    variant="outlined"
                                    type="number"
                                    style={{ marginBottom: '0rem', width: '100%' }}
                                    onChange={confonchange}
                                    name="mobilenum"
                                    value={confdata.mobilenum}
                                />
                                <p className="conferr-message">{formerror.mobilenum}</p>
                                <TextField
                                    id="outlined-basic"
                                    label="Adhar Number"
                                    variant="outlined"
                                    type="number"
                                    style={{ marginBottom: '0rem', width: '100%' }}
                                    onChange={confonchange}
                                    name="adharnum"
                                    value={confdata.adharnum}
                                />
                                <p className="conferr-message">{formerror.adharnum}</p>
                                <Typography component="p">Please upload your Adharcard.</Typography>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    style={{ marginBottom: '10px', fontFamily: 'sans-serif' }}
                                >
                                    Upload file
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={confonchange}
                                        name="document"
                                        //  value={confdata.document}
                                    />
                                </Button>

                                <p>{confdata.document}</p>
                                <p className="conferr-message">{formerror.document}</p>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '80%',
                                        color: '#',
                                        backgroundColor: '#1AB64F',
                                        marginLeft: '10%',
                                        marginBottom: '5%',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onClick={handlesubmit}
                                >
                                    Verify and Continue
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div class="aside-new  ">
                            <div
                                class="new-user"
                                style={{
                                    padding: '1px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-JmDfLz7ErRiTZ9vIme55A9JGQqdx8qJ_xQ_lB2UIqGAFELpsKQQ8xuTSrlqrly-tSQ&usqp=CAU" alt=""  height={50} width={50} style={{borderRadius:'50%'}}/>              */}
                                <h1 style={{ fontSize: '10px' }}>
                                    <FontAwesomeIcon icon={faUser} size="sm"></FontAwesomeIcon> {username}
                                </h1>
                            </div>
                            <h2 class="conf-name">{dormateroyname}</h2>
                            <Stack direction="row">
                                <h2
                                    style={{
                                        fontSize: '25px',
                                        fontWeight: 'bold',
                                        marginLeft: '30px',
                                    }}
                                >
                                    {fromtime == '' && totime == '' ? totalprice : timetotalprice}
                                </h2>
                                <div style={{ position: 'relative', left: '25px' }}>
                                    <h2
                                        style={{
                                            textDecoration: 'line-through',
                                            fontSize: '16px',
                                            color: 'grey',
                                            paddingTop: '20px',
                                        }}
                                    >
                                        {fromtime == '' && totime == '' ? totalSaving : timedisprice}
                                    </h2>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <h2
                                        style={{
                                            textDecoration: 'line-through',
                                            fontSize: '16px',
                                            paddingLeft: '0px',
                                            paddingTop: '0px',
                                            color: 'grey',
                                        }}
                                    >
                                        {fromtime == '' && totime == '' ? roomprice : timeprice}
                                    </h2>
                                    <p style={{ marginLeft: '5px', fontWeight: 'bold' }}>x{diffDay} Day</p>
                                    <p style={{ marginLeft: '5px', fontWeight: 'bold' }}>x{rooms} Room</p>
                                    <p
                                        style={{
                                            paddingLeft: '5px',
                                            marginRight: '50px',
                                            paddingTop: '0px',
                                            color: '#F8AE23',
                                            fontWeight: 'bolder',
                                        }}
                                    >
                                        30% Off
                                    </p>
                                    <br />
                                </div>
                                <br />
                            </Stack>
                            {checkindate && (
                                <div
                                    className="date-day"
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '1px',
                                        marginRight: '30px',
                                        marginLeft: '30px',
                                    }}
                                >
                                    <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                        {/* Tue, 2024-02-27 - 2024-02-28 */}
                                        {checkindate} {checkoutdate}
                                    </p>
                                </div>
                            )}
                            {fromtime && (
                                <div
                                    className="date-day"
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '1px',
                                        marginRight: '30px',
                                        marginLeft: '30px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                        Time {fromtime} : To {totime}
                                    </p>
                                </div>
                            )}

                            <div
                                className="room-gue"
                                style={{
                                    backgroundColor: 'white',
                                    padding: '1px',
                                    marginRight: '50px',
                                    marginLeft: '50px',
                                    marginTop: '15px',
                                }}
                            >
                                {rooms ? (
                                    <p style={{ fontWeight: 'bold', textAlign: 'center' }}>{rooms} Room</p>
                                ) : (
                                    <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Please Select Rooms !</p>
                                )}
                                {guests && <p style={{ fontWeight: 'bold', textAlign: 'center' }}>{guests} Guest</p>}
                            </div>
                            <Divider style={{ marginTop: '10%' }} />
                            <div style={{}}>
                                <Stack direction="row">
                                    <p
                                        style={{
                                            fontSize: '15px',
                                            whiteSpace: 'nowrap',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Your Saving <br />
                                        30% Off
                                    </p>
                                    <p
                                        style={{
                                            paddingLeft: '45%',
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                            textDecoration: 'line-through',
                                        }}
                                    >
                                        {fromtime == '' && totime == '' ? totalSaving : timetotalsaving}
                                    </p>
                                    <br />
                                </Stack>

                                <Stack direction="row">
                                    <p
                                        style={{
                                            fontSize: '15px',
                                            whiteSpace: 'nowrap',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Total Price <br />x{rooms} Room
                                    </p>
                                    <p
                                        style={{
                                            paddingLeft: '47%',
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                        }}
                                    >
                                        {fromtime == '' && totime == '' ? totalprice : timetotalprice}
                                    </p>
                                    <br />
                                </Stack>

                                <Stack direction="row">
                                    <p
                                        style={{
                                            fontSize: '15px',
                                            whiteSpace: 'nowrap',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        taxes & fees
                                    </p>
                                    <p
                                        className="final-taxprice"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                            paddingLeft: '45%',
                                        }}
                                    >
                                        {taxes}
                                    </p>
                                </Stack>

                                <Stack direction="row">
                                    <p
                                        style={{
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        Total Price
                                    </p>
                                    <p
                                        className="final-price2"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                            paddingLeft: '48%',
                                        }}
                                    >
                                        {fromtime == '' && totime == '' ? finalprice : timefinalprice}
                                    </p>
                                </Stack>
                            </div>
                            <Stack direction="row">
                                {/* <div className="message">
              <span style={{whiteSpace:'nowrap'}}>Cancellation Policy</span>
              <div className="message-show">
                <ul>
                    <li>Free Cancellation.</li>
                </ul> 
              </div>
              </div> */}
                            </Stack>
                        </div>
                    </div>
                </Stack>
            </div>
        </>
    );
};

export default ConformBook;
