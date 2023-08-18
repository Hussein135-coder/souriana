import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const DataContext = createContext();

export const Axios = axios.create({
    // baseURL: 'https://souriana.ml/api/',
    baseURL: 'https://abessive-slaps.000webhostapp.com/api/',
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
    const [loadingOnce,setLoadingOnce] = useState(true)
    const [loaded,setLoaded] = useState(false)

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
                if(Object.keys(data.money).length > 0){

                    const sortData = data.money.sort(function(a,b){
                        return new Date( b['التاريخ']) - new Date(a['التاريخ']) ;
                    });
                    setMoney(sortData);
                }
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

    const addAnalytics = async ({ page, likes,members, date }) => {
        setWait(true);
        try {
            const { data } = await Axios.post( 'add-analytics.php', {
                page, likes,members, date
            });
            setWait(false);
            setlatest([]);
            setPagesData({});
            return data;
        }
        catch (err) {
            setWait(false);
            return { success: 0, message: message };
        }
    }

    // Fetch all data from API
    const fetchData = async ()=>{
    const lastData = [];

    const res2 = await fetch('https://tech-inj.tech/api/syredu.php')
    const syrEduFetched = await res2.json()
    lastData.push(syrEduFetched[syrEduFetched.length - 1])

    const res3 = await fetch('https://tech-inj.tech/api/bac.php')
    const bacFetched = await res3.json()
    lastData.push(bacFetched[bacFetched.length - 1])
    
    const res4 = await fetch('https://tech-inj.tech/api/syr.php')
    const syrFetched = await res4.json()
    lastData.push(syrFetched[syrFetched.length - 1])
    setPagesData({
      syrEdu: syrEduFetched,
      bac : bacFetched,
      syr  : syrFetched
    })
    setlatest(lastData)
    

    const fetchedIndex = (page) =>{
        const lastIndex = page.length - 1;
        const beforeLastIndex = lastIndex - 1;

        return [lastIndex, beforeLastIndex]
    }
   
    
    const likesDiffrence = [syrEduFetched[fetchedIndex(syrEduFetched)[0]].likes - syrEduFetched[fetchedIndex(syrEduFetched)[1]].likes , bacFetched[fetchedIndex(bacFetched)[0]].likes - bacFetched[fetchedIndex(bacFetched)[1]].likes ,syrFetched[fetchedIndex(syrFetched)[0]].likes - syrFetched[fetchedIndex(syrFetched)[1]].likes   ]
    const chartData = {
      labels: lastData.map(page => page.name),
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
        <DataContext.Provider value={{addAnalytics,loaded,setLoaded,loadingOnce,setLoadingOnce,pagesData,chart,latest,fetchData,loading, resetPass, loginUser, addAndUpdateMoney, delAllMoney, delMoney, status, msg, setStatus, setMsg, wait, money, user, loggedInCheck, logout }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
