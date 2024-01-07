import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View,Dimensions, Alert, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import AutocompleteInput from "react-native-autocomplete-input";
import {
  Avatar,
  Button,
  List,
  RadioButton,
  Text,
  TextInput,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from 'expo-image-picker'

const windowHeight = Dimensions.get('screen').height;

const AddUser = (props) => {
  const data = ["Gujarat", "Maharashtra", "Karnataka"];
  const cityData = ["Mumbai" , "Pune","Ahmedabad"]
  const [state, setStateValue] = useState("");
  const [city  , setCity] = useState("City");
  const [showCityDropdown , setShowCityDropdown] = useState(false);
  const [gender , setGender] = useState("male");
  const [formData,setFormData] = useState({name:"",email:"",phone:""})
  const [filteredData, setFilteredData] = useState([]);
  const [file , setFile] = useState(null);
  const filterstate = (query) => {
    const filteredDt = data.filter((item) => item.includes(query));
    setFilteredData(filteredDt);
  };

  const handlestateSelection = (selectedstate) => {
    console.log(selectedstate);
    setStateValue(selectedstate);
    setFilteredData([]); // Clear the filtered data after selection
  };

  const alert = (msg,type)=>(
    Alert.alert(type , msg , [
        {
            text:"OK"
        }
    ])
  );
 

  const pickImage = async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect: [4,3],
        quality:1
    })
    if(!result.canceled){
        setFile(result.assets[0].uri);
    }
  }

  const checkEmptyInputs = ()=>{
    let msg;
    if(formData.name.trim() == ""){
        msg = "Name Cannot Be Empty"
        alert(msg , "Error")
        return true;
    }
    if(formData.email.trim() == ""){
        msg = "Email Cannot Be Empty"
        alert(msg , "Error")
        return true;
    }
    if(formData.phone.trim() == ""){
        msg = "Phone Cannot Be Empty"
        alert(msg , "Error")
        return true;
    }
    if(city == "City"){
        msg = "City Cannot Be Empty"
        alert(msg , "Error")
        return true;
    }
    if(state.trim() == ""){
        msg = "State Cannot Be Empty"
        alert(msg , "Error")
        return true;
    }
    return false;
  }

  const saveUserToLocalDb = async()=>{
    try {
        let all_data = await AsyncStorage.getItem(process.env.EXPO_PUBLIC_USER_KEY);
        let isEmptyInputs = checkEmptyInputs();
        if(!isEmptyInputs){
            if(all_data){
                all_data = JSON.parse(all_data);
                let index = props.route.params.index;
                let new_data = all_data.map((val , i)=>{
                    if(i==index){
                        let data = {...formData ,"city":city , "gender":gender , "state":state , "image":file }
                        return data;
                    }
                    return val;
                });
                all_data = new_data;
            }else{
                all_data = [];
                let data = {...formData , "city":city , "gender":gender , "state":state , "image":file}
                all_data.push(data)
            }
            await AsyncStorage.setItem(process.env.EXPO_PUBLIC_USER_KEY,JSON.stringify(all_data));
            props.route.params ? alert("User Updated") :alert("User Added" , "Success")
            props.navigation.goBack();
        }
    } catch (err) {
        alert("Error While Saving User . Try Again Later","Error")
    }finally{
        setFormData({name:"",email:"",phone:""})
        setCity("City")
        setGender("male")
        setStateValue("")
        setFile(null)
    }
  }

  useEffect(()=>{
    console.log("daata...",props.route.params)
    if(props.route.params){
        props.navigation.setOptions({
            title:"Update User"
          });
        let data = props.route.params;
        setFormData({name:data.name , email:data.email , phone:data.phone})
        setCity(data.city)
        setStateValue(data.state)
        setGender(data.gender)
    }
  },[])
  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View style={styles.mainContainer}>
        {
            ((props.route.params && !props.route.params.name) || file) ? 
            <Avatar.Image source={{uri:file}} size={150}/>:
            <>
                <TouchableOpacity style={styles.modalHeaderContainer} onPress={()=>pickImage()}>
                    <>
                    {(props.route.params && props.route.params.image) ?
                    <Avatar.Image source={{uri:props.route.params.image}} size={150}/>:
                    <Avatar.Text label="KS" size={150} />}
                    <View style={styles.cameraContainer}>
                        <Avatar.Icon icon={"camera"}/>
                    </View>
                    </>
                </TouchableOpacity>
            </>
        }
        
      
        {/* form body  */}

        <View style={styles.formBodyContainer}>
          <TextInput label={"Name"} style={styles.formInput}  value={formData.name} onChangeText={(text)=>(setFormData(prev=>({...prev , name:text })))}/>
          <TextInput label={"Email"} style={styles.formInput}  value={formData.email} onChangeText={(text)=>(setFormData(prev=>({...prev , email:text})))}/>
          <TextInput label={"Phone"} style={styles.formInput} keyboardType="numeric" value={formData.phone} onChangeText={(text)=>(setFormData(prev=>({...prev , phone:text})))}/>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <RadioButton.Group onValueChange={(val)=>setGender(val)}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <RadioButton.Item label="Male" value="male" status={gender=="male"?"checked":"unchecked" }/>
                <RadioButton.Item label="Female" value="female" status={gender=="female"?"checked":"unchecked" }/>
              </View>
            </RadioButton.Group>
          </View>
          <View style={{ width: "100%" }}>
            <List.Section>
              <List.Accordion title={city} style={{ width: "100%" }} expanded={showCityDropdown} onPress={()=>setShowCityDropdown(!showCityDropdown)}>
                {
                    cityData.map((val,index)=>(
                        <List.Item title={val} onPress={()=>{setCity(val); setShowCityDropdown(false)}} key={index}  />
                    ))
                }
              </List.Accordion>
            </List.Section>
          </View>
          <View style={{ width: "100%",position: "absolute",
                width: "100%",
                zIndex: 2,
                bottom:65,
                left:15,
                right:0,
                borderRadius:22
                 }}>
            <AutocompleteInput
              data={filteredData}
              value={state}
              onChange={(val) => setStateValue(val.nativeEvent.text)}
              containerStyle={{
                
              }}
              inputContainerStyle={{
                padding: 12,
                borderRadius: 5,
                backgroundColor: "lightgray",
              }}
              style={{ backgroundColor: "lightgray" }}
              defaultValue={state}
              onChangeText={(text) => filterstate(text)}
              // onEndEditing={(e) => handlestateSelection(e.nativeEvent.text)}
              flatListProps={{
                keyExtractor: (_, id) => id,
                renderItem: (val) => (
                  <Text
                    onPress={() => handlestateSelection(val.item)}
                    style={{ padding: 12, width: "100%"}}
                  >
                    {val.item}
                  </Text>
                ),
                scrollEnabled: false,
              }}
              scrollEnabled={false}
              placeholder="State"
            />
          </View>
          <View style={{ width: "100%",backgroundColor:"yellow",marginTop:62 }}>
            <Button mode="contained" style={{zIndex:0}} onPress={()=>saveUserToLocalDb()}>Save</Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding:9,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    gap: 15,
    height:windowHeight
  },
  modalHeaderContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    position:"relative",
  },
  formBodyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 22,
    padding: 12,
  },
  formInput: {
    width: "100%",
  },
  cameraContainer:{
    position:"absolute",
    backgroundColor:"#0808087a",
    top:0,
    right:0,
    left:0,
    width:"39%",
    height:"100%",
    borderRadius:84,
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }
});

export default AddUser;
