// First of all setup hook for axios bessURL for hook

//  hukName useAxios

// page-1

import axios from "axios";
import { useContext, useEffect } from "react";
import { UserProvider } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

const useAxios = () => {
    // logout gate from contex api
    const { logOut } = useContext(UserProvider)
    const navigate = useNavigate()

    useEffect(() => {
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
                navigate('/login')
            }
        });
    }, [])

    return instance;
};

export default useAxios;




// how to use this useAxios hook with tunstck quity and get this related data from database

// Page-2

import { useQuery } from '@tanstack/react-query';
// import useAxios from './useAxios';


const Services = () => {
    const axiosGate = useAxios()
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axiosGate.get('/services')
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, data, refetch }
};

export default Services;

// and any components get this face data 

// Page -3

const { isLoading, error, data, refetch } = Services()

if (isLoading) return <Loader></Loader>

if (error) return 'An error has occurred: ' + error.message

return (
    <div className='dark:bg-black'>
        <div><BannerSlider data={data}></BannerSlider></div>
        <div><AboutSection></AboutSection></div>
        <div><ServicesSection data={data} ></ServicesSection></div>
    </div>
)




// Backend start code 

// stap -1

// install & require     npm i cookie-parser  &&    npm install jsonwebtoken

var cors = require('cors')
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(express.json())




// stap - 2

// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.vdfwpbk.mongodb.net/?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });


// <----- Set the middlewre code inside of this area --->


// async function run() {
//     try {




// fontend send a post requst for genatate a jwt token  (when user login or registration then send user email)
app.post('/jwt', (req, res) => {
    try {
        const token = jwt.sign(req.body, process.env.SECRET, { expiresIn: '1h' });
        res
            .cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: false,
            })
            .send(token)

    } catch (error) {
        console.log(error)
    }
})





// meddle wear set for verify
const verify = async (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        return res.status(401).send({ message: "unAuthorize access" })
    }
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: "unAuthorize access" })
        }
        req.user = decoded;
        next()
    });

}


// youe want to delet cookis when user logout (when user logout then sent this get requst for remove cookis)

app.get('/cookedelet', (req, res) => {
    res.clearCookie('token', { maxAge: 0 }).send({ sucess: true })
})



// stape - 3

// then you start your router

// async function run() {
//     try {
//         const database = client.db("carDocter");


// inside this area

app.get('/service', verify, async (req, res) => {
    const id = req.query.id
    // this email send from fontend page
    const email = req.query.email

    // this token your gate prom valiry token and you check your condition
    const token = req.user
    if (token.email !== email) {
        return res.status(403).send({ message: "Not access" })
    }
    const result = await services.findOne({ _id: new ObjectId(id) })
    res.send(result)
})
