import React from 'react'
import {useSelector} from 'react-redux'
import styleLoading from './LoadingComponent.module.css'

export default function LoadingComponent() {

    let {isLoading} = useSelector(state => state.LoadingReducer)

    if(isLoading){
        return (
            <div className = {styleLoading.bgLoading} >
                <img src = "./img/CurveLoading.gif" alt="123" ></img>
            </div>
        )
    }else{
        return ''
    }
    
}
