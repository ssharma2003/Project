import React from "react";
import type { PropsWithChildren } from "react";
import Icon from "react-native-vector-icons/FontAwesome"

type IconProps =PropsWithChildren<{
    name:string;
}>
const Icons=({name}:IconProps)=>{
    switch(name){
        case 'circle':
            return <Icon name="circle-thin" size={30} color="black"/>
            break;
        case 'cross':
            return <Icon name="times" size={30} color="black"/>
        default:
            return <Icon name="pencil" size={38} color='pink' />
            break;

    }
}
export default Icons