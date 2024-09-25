import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import {
    CircularProgress,
    Divider,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Rating,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faPhone, faRestroom, faUser } from '@fortawesome/free-solid-svg-icons';
import Names from './dormateroy';
import toast from 'react-hot-toast';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Userstatus = ({ dorname }) => {
    const [open, setOpen] = React.useState(false);
    const [dormateroyname, setdormateroyname] = React.useState('');
    const [rating, setrating] = useState({
        facilities: '',
        rooms: '',
        overall: '',
        money: '',
        management: '',
        community: '',
        safety: '',
        review: '',
    });
    const handlerating = (e) => {
        const { name, value } = e.target;
        setrating({ ...rating, [name]: value });
        console.log(name, value);
    };

    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [newdata, setnewdata] = useState();
    const [ratinglength, setratinglength] = useState();
    const [length, setlength] = useState();
    useEffect(() => {
        const onlineuser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser('');
            }
        });
        return () => onlineuser();
    }, []);

    useEffect(() => {
        if (user) {
            fetch('https://dormatery-project-default-rtdb.firebaseio.com/regidata.json')
                .then((res) => res.json())
                .then((data) => {
                    let newobj = Object.values(data);
                    const foundUser = newobj.find((obj) => user.email === obj.email);
                    if (foundUser) {
                        setUsername(foundUser.firstname + foundUser.lastname);
                    } else {
                        setUsername('');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user]);

    useEffect(() => {
        if (username) {
            fetch('https://dormatery-project-default-rtdb.firebaseio.com/conformdetails.json')
                .then((res) => res.json())
                .then((data) => {
                    const founddata = Object.values(data).filter((values) => username === values.username);
                    setnewdata(founddata);
                    setlength(founddata.length);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    }, [username]);

    useEffect(() => {
        if (username) {
            fetch('https://dormatery-project-default-rtdb.firebaseio.com/ratingreview.json')
                .then((res) => res.json())
                .then((newdata) => {
                    const objnewdata = Object.values(newdata).filter((item) => username === item.username);
                    setratinglength(objnewdata.length);
                });
        }
    }, [username]);

    const Change = (event) => {
        setdormateroyname(event.target.value);
    };
    console.log('dorname', dormateroyname);

    const handlesubmit = async () => {
        const { facilities, rooms, overall, money, management, community, safety, review } = rating;

        try {
            if (dormateroyname && facilities && rooms && overall && money && management && community && safety && review) {
                const response = await fetch('https://dormatery-project-default-rtdb.firebaseio.com/ratingreview.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dormateroyname,
                        facilities,
                        rooms,
                        overall,
                        money,
                        management,
                        community,
                        safety,
                        username,
                        review,
                    }),
                });

                console.log('Rating submitted successfully!');
                toast.success('Your Rating & Review is Save', {
                    duration: 3000,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        fontSize: '17px',
                        fontWeight: 'bold',
                    },
                });
                setrating({
                    facilities: '',
                    rooms: '',
                    overall: '',
                    money: '',
                    management: '',
                    community: '',
                    safety: '',
                    review: '',
                });
            } else {
                toast.error('Please Fill details', {
                    duration: 3000,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        fontSize: '17px',
                        fontWeight: 'bold',
                    },
                });
            }
        } catch (error) {
            console.error('Error submitting rating:', error.message);
        }
    };

    return (
        <>
            <Stack direction="column" justifyContent="space-evenly" alignItems="baseline" spacing={1}>
                <Tabs
                    size="lg"
                    aria-label="Vertical tabs"
                    orientation="vertical"
                    sx={{
                        overflow: 'auto',
                        minWidth: '100%',
                        height: 800,
                        marginRight: '50px',
                        '--Tab-indicatorThickness': '1px',
                        '--Tabs-spacing': '50px',
                    }}
                >
                    <TabList>
                        <Card
                            sx={{
                                width: 245,
                                maxWidth: '100%',
                                boxShadow: 'lg',
                            }}
                        >
                            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                <Avatar
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-JmDfLz7ErRiTZ9vIme55A9JGQqdx8qJ_xQ_lB2UIqGAFELpsKQQ8xuTSrlqrly-tSQ&usqp=CAU"
                                    sx={{ '--Avatar-size': '4rem' }}
                                />
                                <Chip color="success">Active</Chip>
                                <Typography level="title-lg" sx={{ fontFamily: 'Josefin Sans' }}>
                                    {username}
                                </Typography>
                            </CardContent>
                            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                                <Link to="/">
                                    <CardActions buttonFlex="1">
                                        <Button variant="outlined" sx={{ mb: '10px' }}>
                                            Home
                                        </Button>
                                    </CardActions>
                                </Link>
                            </CardOverflow>
                        </Card>

                        <Tab
                            sx={{
                                mt: '15px',
                                fontFamily: 'Josefin Sans',
                                fontWeight: 'bold',
                            }}
                        >
                            Dashboard
                        </Tab>
                        <Tab sx={{ mt: '5px', fontFamily: 'Josefin Sans', fontWeight: 'bold' }}>Rating & Review</Tab>
                    </TabList>
                    <TabPanel value={0} sx={{ overflow: 'auto' }}>
                        <Box
                            sx={{
                                width: '50%',
                                maxWidth: 1000,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 2fr))',
                                gap: 2,
                                marginLeft: '10%',
                            }}
                        >
                            <Card variant="solid" color="success" invertedColors>
                                <CardContent orientation="horizontal">
                                    <CircularProgress size="lg" determinate value={20}></CircularProgress>
                                    <CardContent>
                                        <Typography
                                            level="body-md"
                                            sx={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    boxShadow: 'md',
                                                    borderColor: 'neutral.outlinedHoverBorder',
                                                },
                                            }}
                                        >
                                            Total Booking
                                        </Typography>
                                        <Typography level="h2">{length} Times</Typography>
                                    </CardContent>
                                </CardContent>
                            </Card>

                            <Card variant="solid" color="danger" invertedColors>
                                <CardContent orientation="horizontal">
                                    <CircularProgress size="lg" determinate value={20}></CircularProgress>
                                    <CardContent>
                                        <Typography
                                            level="body-md"
                                            sx={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    boxShadow: 'md',
                                                    borderColor: 'neutral.outlinedHoverBorder',
                                                    whiteSpace: 'nowrap',
                                                },
                                            }}
                                        >
                                            Total Cancellation
                                        </Typography>
                                        <Typography level="h2">0 Times</Typography>
                                    </CardContent>
                                </CardContent>
                            </Card>
                            <Card
                                variant="solid"
                                color="primary"
                                invertedColors
                                sx={{
                                    '&:hover': {
                                        boxShadow: 'md',
                                        borderColor: 'neutral.outlinedHoverBorder',
                                    },
                                }}
                            >
                                <CardContent orientation="horizontal">
                                    <CircularProgress size="lg" determinate value={20}></CircularProgress>
                                    <CardContent>
                                        <Typography level="body-md" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                            Rating & Review
                                        </Typography>
                                        <Typography level="h2">{ratinglength} Times</Typography>
                                    </CardContent>
                                </CardContent>
                            </Card>
                        </Box>
                        <Divider sx={{ mt: 2 }}></Divider>

                        {user &&
                            newdata &&
                            newdata.map((item) => (
                                <Stack direction="row">
                                    <Card
                                        color="primary"
                                        variant="soft"
                                        orientation="horizontal"
                                        sx={{
                                            overflow: 'auto',
                                            mt: '1rem',
                                            ml: '3rem',
                                            width: '65%',
                                            '&:hover': {
                                                boxShadow: 'md',
                                                borderColor: 'neutral.outlinedHoverBorder',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                level="title-lg"
                                                id="card-description"
                                                sx={{
                                                    fontFamily: 'Josefin Sans',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                {item.dormateroyname}
                                            </Typography>
                                            <Stack direction="row">
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        fontFamily: 'Josefin Sans',
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> {item.fullname}
                                                </p>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        fontFamily: 'Josefin Sans',
                                                        fontSize: '20px',
                                                        marginLeft: '15px',
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPhone} style={{ paddingRight: '5px' }}></FontAwesomeIcon>
                                                    {item.mobilenum}
                                                </p>
                                            </Stack>
                                            {item.fromtime && (
                                                <Stack direction="row">
                                                    <p
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Josefin Sans',
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faClock} style={{ paddingRight: '5px' }}></FontAwesomeIcon>
                                                        {item.fromtime}
                                                    </p>

                                                    <p
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Josefin Sans',
                                                            fontSize: '20px',
                                                            marginLeft: '15px',
                                                        }}
                                                    >
                                                        To
                                                    </p>

                                                    <p
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Josefin Sans',
                                                            fontSize: '20px',
                                                            marginLeft: '15px',
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faClock} style={{ paddingRight: '5px' }}></FontAwesomeIcon>
                                                        {item.totime}
                                                    </p>
                                                </Stack>
                                            )}

                                            {item.checkindate && (
                                                <Stack direction="row">
                                                    <p
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Josefin Sans',
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCalendar}
                                                            style={{ paddingRight: '5px' }}
                                                        ></FontAwesomeIcon>
                                                        {item.checkindate}
                                                    </p>

                                                    <p
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Josefin Sans',
                                                            fontSize: '20px',
                                                            marginLeft: '15px',
                                                        }}
                                                    >
                                                        To
                                                    </p>

                                                    <p
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Josefin Sans',
                                                            fontSize: '20px',
                                                            marginLeft: '15px',
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCalendar}
                                                            style={{ paddingRight: '5px' }}
                                                        ></FontAwesomeIcon>
                                                        {item.checkoutdate}
                                                    </p>

                                                    <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: '10px' }} />
                                                    {item.totalDays && (
                                                        <>
                                                            <p
                                                                style={{
                                                                    color: 'black',
                                                                    fontFamily: 'Josefin Sans',
                                                                    fontSize: '20px',
                                                                    paddingLeft: '15px',
                                                                }}
                                                            >
                                                                {item.totalDays} Day
                                                            </p>
                                                            <p
                                                                style={{
                                                                    color: 'black',
                                                                    fontFamily: 'Josefin Sans',
                                                                    fontSize: '20px',
                                                                    marginLeft: '15px',
                                                                }}
                                                            >
                                                                And
                                                            </p>
                                                        </>
                                                    )}

                                                    <p
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Josefin Sans',
                                                            fontSize: '20px',
                                                            paddingLeft: '15px',
                                                        }}
                                                    >
                                                        {item.rooms} Room
                                                    </p>

                                                    {item.guests && (
                                                        <>
                                                            <p
                                                                style={{
                                                                    color: 'black',
                                                                    fontFamily: 'Josefin Sans',
                                                                    fontSize: '20px',
                                                                    marginLeft: '15px',
                                                                }}
                                                            >
                                                                And
                                                            </p>
                                                            <p
                                                                style={{
                                                                    color: 'black',
                                                                    fontFamily: 'Josefin Sans',
                                                                    fontSize: '20px',
                                                                    marginLeft: '15px',
                                                                }}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faRestroom}
                                                                    style={{ paddingRight: '5px' }}
                                                                ></FontAwesomeIcon>
                                                                {item.guests} Guests
                                                            </p>
                                                        </>
                                                    )}
                                                </Stack>
                                            )}
                                        </CardContent>
                                    </Card>

                                    <Card
                                        color="success"
                                        variant="soft"
                                        orientation="horizontal"
                                        sx={{
                                            mt: '1rem',
                                            ml: '3rem',
                                            width: '20%',
                                            '&:hover': {
                                                boxShadow: 'lg',
                                                borderColor: 'neutral.outlinedHoverBorder',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                level="title-lg"
                                                id="card-description"
                                                sx={{
                                                    fontFamily: 'Josefin Sans',
                                                    fontWeight: 'bold',
                                                    fontSize: '30px',
                                                }}
                                            >
                                                ₹ {item.finalallprice}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Josefin Sans',
                                                    fontWeight: 'bold',
                                                    fontSize: '15px',
                                                }}
                                                level="body-sm"
                                                aria-describedby="card-description"
                                                mb={1}
                                            >
                                                Include all taxes +
                                            </Typography>
                                            <Chip variant="outlined" color="success" size="lg" sx={{ pointerEvents: 'none' }}>
                                                Payment Sucessfully
                                            </Chip>

                                            {/* <Invoice /> */}
                                        </CardContent>
                                    </Card>
                                </Stack>
                            ))}
                    </TabPanel>
                    <TabPanel value={1}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 200, marginBottom: '20px' }}>
                            <InputLabel id="demo-simple-select-standard-label">Select Dormateroy</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={dormateroyname}
                                onChange={Change}
                                label="dormateroyname"
                                required
                            >
                                {Names.map((name) => (
                                    <MenuItem value={name}>
                                        <ListItemText primary={name} sx={{ fontFamily: 'Josefin Sans', fontWeight: 'bold' }} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div sx={{ marginLeft: '10px' }}>
                            <Typography
                                component="legend"
                                sx={{
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Facilities Rating
                            </Typography>
                            <Rating
                                defaultValue={2.5}
                                precision={0.5}
                                name="facilities"
                                size="large"
                                value={rating.facilities}
                                onChange={handlerating}
                                required
                            />
                            <Typography
                                component="legend"
                                sx={{
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Safety and Security Rating
                            </Typography>
                            <Rating
                                defaultValue={2.5}
                                precision={0.5}
                                size="large"
                                name="safety"
                                value={rating.safety}
                                onChange={handlerating}
                                required
                            />
                            <Typography
                                component="legend"
                                sx={{
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Community Atmosphere Rating
                            </Typography>
                            <Rating
                                defaultValue={2.5}
                                precision={0.5}
                                size="large"
                                name="community"
                                value={rating.community}
                                onChange={handlerating}
                                required
                            />
                            <Typography
                                component="legend"
                                sx={{
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Management Responsiveness Rating
                            </Typography>
                            <Rating
                                defaultValue={2.5}
                                precision={0.5}
                                size="large"
                                name="management"
                                value={rating.management}
                                onChange={handlerating}
                                required
                            />
                            <Typography
                                component="legend"
                                sx={{
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Value for Money Rating
                            </Typography>
                            <Rating
                                defaultValue={2.5}
                                precision={0.5}
                                size="large"
                                name="money"
                                value={rating.money}
                                onChange={handlerating}
                                required
                            />
                            <Typography
                                component="legend"
                                sx={{
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Rooms Rating
                            </Typography>
                            <Rating
                                defaultValue={2.5}
                                precision={0.5}
                                size="large"
                                name="rooms"
                                value={rating.rooms}
                                onChange={handlerating}
                                required
                            />

                            <Typography
                                component="legend"
                                sx={{
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Overall Rating
                            </Typography>
                            <Rating
                                defaultValue={2.5}
                                precision={0.5}
                                size="large"
                                name="overall"
                                value={rating.overall}
                                onChange={handlerating}
                                required
                            />
                        </div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Review"
                            multiline
                            rows={3}
                            name="review"
                            value={rating.review}
                            onChange={handlerating}
                            sx={{
                                marginBottom: '10px',
                                marginTop: '10px',
                                width: '300px',
                                fontFamily: 'Josefin Sans',
                            }}
                            required
                        />{' '}
                        <br></br>
                        <button class="button-24" role="button" onClick={handlesubmit}>
                            Submit
                        </button>
                    </TabPanel>
                </Tabs>
            </Stack>
        </>
    );
};

export default Userstatus;
