import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ScrollView, StyleSheet, View} from 'react-native'
import { Provider, Chip, FAB, Searchbar, Surface, Portal,Text, Modal, ActivityIndicator } from 'react-native-paper'
import UserCard from '../components/UserCard'
import UserModal from '../components/UserModal'
import AsyncStorage from "@react-native-async-storage/async-storage"

const Home = ({navigation}) => {
    const [showModal , setShowModal] = useState(false);
    const [users , setUsers] = useState([]);
    const [loading , setLoading]  = useState(false);
    const [modalData , setModalData] = useState(null);
    const data = [
        {
        id:1
    },
        {
        id:2
    },
        {
        id:3
    },
        {
        id:4
    },
        {
        id:5
    },
    ]
    const fetchAllUsers = async()=>{
        try {
            setLoading(true)
            let all_users = await AsyncStorage.getItem(process.env.EXPO_PUBLIC_USER_KEY);
            if(all_users){
                setUsers(JSON.parse(all_users));
            }
        } catch (err) {
            Alert.alert("Error","Error While Fetching Users. Try Again Later",[
                {
                    text:"OK"
                }
            ])
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        fetchAllUsers();
    },[])
  return (
    <Provider>
        <ScrollView style={styles.homeScreenContainer}>
            {/* search bar container */}
            <View style={styles.searchBarContainer}>
                <Searchbar
                    placeholder='Search User'
                    style={{width:"95%",borderRadius:20}}
                />
            </View>
            {/* Chip container */}
            <View style={styles.chipContainer}>
                <Chip style={styles.chipStyle} textStyle={{color:"white"}} >A-Z</Chip>
                <Chip style={styles.chipStyle} textStyle={{color:"white"}}>Z-A</Chip>
            </View>

            {/* all users container */}
            <View style={styles.alluserContainer}>
                  {users.length ?  <FlatList
                        data={users}
                        renderItem={(item)=><UserCard showModal={setShowModal} index={item.index} data={item.item} setModalData={setModalData} navigation={navigation}/>}
                        keyExtractor={item=>item.phone}
                        scrollEnabled={false}
                    />:
                    loading ?
                    <ActivityIndicator size={"large"}/>:
                    <Text>No Users</Text>
                }

            </View>

        </ScrollView>
        {/* add new user button */}
        <FAB
            icon={"plus"}
            style={{position:"absolute",bottom:45,right:15,backgroundColor:"purple"}}
            onPress={()=>navigation.navigate("AddUser")}
        />

        {/* modal */}
        <Portal>
            <UserModal showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>
        </Portal>
    </Provider>
  )
}


const styles = StyleSheet.create({
    homeScreenContainer:{
        position:"relative",
        display:"flex",
        gap:22,
        // backgroundColor:"#F0D2D1"
    },
    searchBarContainer:{
        marginTop:22,
        display:"flex",
        alignItems:"center"
    },
    chipContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        gap:22,
        marginTop:12
    },
    chipStyle:{
        backgroundColor:"#d578d5",
        color:"white"
    },
    alluserContainer:{
        display:"flex",
        gap:12,
        padding:22
    },
    modalContainer:{
        backgroundColor:"white",
        padding:20,
        margin:9,
        borderRadius:4
    }
})

export default Home