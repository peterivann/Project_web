import React, {useContext, useEffect, useState} from 'react';
import Table from "../Structure/Table";
import '../../../../css/style.css'
import {useNavigate} from "react-router";
import {Del} from "../../../model/del_model";
import {IdFactory_for_user} from "../../Store/service";
import {AuthContext} from "../../Store/context";

const UserListAplications = () => {

    const [valueError, setValueError] = useState("")

    const[valueInp, setValueInp] = useState([]);
    const ValueInp = (valueInp) =>{setValueInp(valueInp)}

    const router = useNavigate();

    const [posts, setPosts] = useState([
        {id : 1, name: '№'},
        {id : 2, name: 'Topic'},
        {id : 3, name: 'Contact'},
        {id : 4, name: 'Comment'},
        {id : 5, name: 'Status'},
    ]);

    const [applic, setApplic] = useState([]);

    async function del() {
        if(valueInp.length === 0){
            setValueError("Nothing selected");
        }
        else {
            let id = "";
            for (let i = 0; i < valueInp.length; i++) {
                id = id + valueInp[i] + " ";
            }
            let delet = new Del();
            let dat = await delet.dele_app(id);
            if (dat.status === 404){
                setIsAuth('');
                router('/page_sign_in');
            }
            table();
            setValueError("");
            setValueInp((prevState) => {
                prevState.length = 0;
                return [prevState];
            })
        }
    }

    async function table() {
        let delet = new Del();
        let dat = await delet.tabl_app_user(delet.get());
        let res = dat.res;
        let n = 0;
        let masApplic = [];

        for (let i = 0; i < res.length; i++) {
            n = n + 1;
            masApplic.push({id: res[i].id, appl: [{name : n}, {name: res[i].topic}, {name: res[i].contact}, {name: res[i].comment}, {name: res[i].status}]})
        }
        setApplic(masApplic);
    }

    function response_admin() {

        if(valueInp.length === 1){
            router('/page_res_user');
            let id = IdFactory_for_user.createInstance();
            id.increase(valueInp[0]);
        }
        else{
            setValueError("Select one application");
        }
    }

    useEffect(() => {table();return}, []);

    return (
            <Table error = {valueError} applic={applic} posts = {posts} firstwordh1="Your" secondwordh1='applications' classname='table_dark' namebt1='Delete' namebt2='Check answer' func1={del} func2={response_admin} onChange = {ValueInp}></Table>
    );
};

export default UserListAplications;