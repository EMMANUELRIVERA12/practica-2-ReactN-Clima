import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements'



const DetailScreen = ({route}) => {
    const {Lati,Longi} = route.params;
    const [datos, setDatos]=useState([]);
    const [wait, setWait]=useState(false);
    useEffect(()=>{
        const key ="0b6ff3b15c84fe9be9d7b6027898ecc5";
        const api_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${Lati}&lon=${Longi}&exclude=current,minutely,hourly&appid=${key}&units=metric`;
        fetch(api_url)
            .then(data => {
                return data.json()
            }).then(resultado=>
            {   
                console.log(resultado)
                setDatos(resultado);
                setWait(true);
            });

    },[])

    const createDate=(dt,ix)=> {
        if (ix===0)
        {
            return "HOY ESTAMOS A";
        }
        else
        {
            var day = new Date(dt * 1000);
            return day.toLocaleString("es-mx", { weekday: "long" }).toUpperCase(); 
        }

    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    wait
                    ?
                    datos.daily.map((a,b)=>
                        <Card key={b}>
                            <Card.Title style={styles.texto2} >{createDate(a.dt,b)}</Card.Title>
                            <Card.Divider></Card.Divider>
                            <View>
                                <Text style={styles.texto}>
                                    Temperatura: {a.temp.day}°C{"\n"}
                                    Temperatura maxima: {a.temp.max}°C{"\n"}
                                    Temperatura minima: {a.temp.min}°C{"\n"}
                                </Text>
                            </View>
                        </Card>
                    )
                    :
                    <Text style={styles.texto2}>ACTUALIZANDO PRONOSTICO</Text>                    

                }
            </ScrollView>
        </View>
    );
}
 
export default DetailScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFE877',
    },
    images:{
      width: 200, 
      height: 300,
      margin:5,
      alignSelf:'center'
    },
    texto:{
      color: 'blue', 
      textAlign: 'center', 
      fontSize: 18,
      margin: 10,
    },
    texto2:{
        color: 'black', 
        textAlign: 'center', 
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
    }
  });