import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

export const DataContext = createContext();

export const Axios = axios.create({
    // baseURL: 'https://souriana.ml/api/',
    baseURL: 'https://tech-inj.tech/api/',
    // withCredentials: true
});

// axios.defaults.withCredentials = true;


const DataContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [money, setMoney] = useState(null);
    const [pagesData, setPagesData] = useState({});
    const [chart, setChart] = useState({})
    const [latest, setlatest] = useState([])
    const [wait, setWait] = useState(false);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false)
    const [msg, setMsg] = useState('')

    const message =  'حدث خطأ ما';

    const addAndUpdateMoney = async ({ id, name, money, company, date, status, user }, type) => {
        setWait(true);
        try {
            const { data } = await Axios.post(type + '.php', {
                id, name, money, company, date, status, user
            });
            setWait(false);
            return data;
        }
        catch (err) {
            setWait(false);
            return { success: 0, message: message };
        }
    }

    const delMoney = async ({ id }) => {
        setWait(true);
        try {
            const { data } = await Axios.post('del.php', { id });
            setWait(false);
            return data;
        }
        catch (err) {
            setWait(false);
            return { success: 0, message: message };
        }
    }

    const delAllMoney = async ({ user }) => {
        setWait(true);
        try {
            const { data } = await Axios.post('delAll.php', { user });
            setWait(false);
            return data;
        }
        catch (err) {
            setWait(false);
            return { success: 0, message: message };
        }
    }

    const loginUser = async ({ name, password }) => {
        setWait(true);
        try {
            const { data } = await Axios.post('login.php', {
                name,
                password
            });
            if (data.success && data.token) {
                localStorage.setItem('loginToken', data.token);
                setWait(false);
                return { success: 1, message: data.message };
            }
            setWait(false);
            return { success: 0, message: data.message };
        }
        catch (err) {
            setWait(false);
            return { success: 0, message: message };
        }

    }


    const loggedInCheck = async () => {

        const loginToken = localStorage.getItem('loginToken');
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginToken;

        if(true){
            const { data } = await Axios.get('getUser.php');
            if (data.user) {
                setUser(data.user);
                const sortData = data.money.sort(function(a,b){
                    return new Date( b['التاريخ']) - new Date(a['التاريخ']) ;
                });
                setMoney(sortData);
                return;
            }
        setUser(null);
        setMoney(null);  
    }
          
    }

    const resetPass = async ({ user, newPass }) => {
        setWait(true);
        try {
            const { data } = await Axios.post('resetPass.php', {
                user, newPass
            });
            setWait(false);
            return data;
        }
        catch (err) {
            setWait(false);
            return { success: 0, message: message };
        }
    }

    const logout = () => {
        localStorage.removeItem("loginToken");
        setUser(null);
        setMoney(null);
        return { success: 1, message: 'تم تسجيل الخروج بنجاح' }
    }

    // Fetch all data from API
    const fetchData = async ()=>{
    const res = await fetch('https://syr-scraper.onrender.com/now')
    const dataNow = await res.json()
    setlatest(dataNow)

    const res2 = await fetch('https://syr-scraper.onrender.com/syrEdu')
    const syrEduFetched = await res2.json()

    const res3 = await fetch('https://syr-scraper.onrender.com/bac')
    const bacFetched = await res3.json()

    const res4 = await fetch('https://syr-scraper.onrender.com/syr')
    const syrFetched = await res4.json()
    
    setPagesData({
      syrEdu: syrEduFetched,
      bac : bacFetched,
      syr  : syrFetched
    })

    const lastIndex = syrEduFetched.length - 1;
    const beforeLastIndex = lastIndex - 1;
    
    const likesDiffrence = [syrEduFetched[lastIndex].likes - syrEduFetched[beforeLastIndex].likes , bacFetched[lastIndex].likes - bacFetched[beforeLastIndex].likes ,syrFetched[lastIndex].likes - syrFetched[beforeLastIndex].likes   ]
    const chartData = {
      labels: dataNow.map(page => page.name),
      datasets: [{
          label: 'الفرق اليومي',
          data: likesDiffrence,
          borderWidth: 1,
          backgroundColor : ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)','rgba(153, 102, 255, 0.2)'],
          borderColor : ['rgb(54, 162, 235)','rgb(255, 99, 132)','rgb(153, 102, 255)'],
          categoryPercentage:0.5,
          barPercentage: 0.5
        }]
      }
      setChart(chartData);
  }


    useEffect(() => {
        async function asyncCall() {
            await loggedInCheck();
            setLoading(false)
        }
        asyncCall();
    }, []);

    return (
        <DataContext.Provider value={{pagesData,chart,latest,fetchData,loading, resetPass, loginUser, addAndUpdateMoney, delAllMoney, delMoney, status, msg, setStatus, setMsg, wait, money, user, loggedInCheck, logout }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
