import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import AutocompleteInput from "react-native-autocomplete-input";
import {
  Avatar,
  Button,
  List,
  Modal,
  RadioButton,
  Text,
  TextInput,
} from "react-native-paper";

const UserModal = (props) => {
  const data = ["Gujarat", "Maharashtra", "Karnataka"];
  const [city, setCity] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const filterCity = (query) => {
    const filteredDt = data.filter((item) => item.includes(query));
    setFilteredData(filteredDt);
  };

  const handleCitySelection = (selectedCity) => {
    console.log(selectedCity);
    setCity(selectedCity);
    setFilteredData([]); // Clear the filtered data after selection
  };
  return (
    <Modal
      visible={props.showModal}
      onDismiss={() => props.setShowModal(false)}
      contentContainerStyle={styles.modalContainer}
    >
      {/* modal header */}
      {/* <View style={styles.modalHeaderContainer}>
        <Text style={{ fontSize: 35, fontWeight: "700" }}>Add User</Text>
      </View> */}
      {/* avatar container */}
      <View style={styles.modalHeaderContainer}>
       {props.modalData?.image ?
          <Avatar.Image source={{uri:props.modalData.image}} size={150}/>:
       <Avatar.Text label="KS" size={150} />}
      </View>
      {/* form body  */}
      
        <View style={styles.formBodyContainer}>
          <View label={"Name"} style={styles.formViewContainer}>
            <Text style={styles.formInput}>Name:</Text>
            <Text style={styles.formInputText}>{props.modalData?.name ?? "John Doe"}</Text>
          </View>
          <View label={"Email"} style={styles.formViewContainer}>
            <Text style={styles.formInput}>Email:</Text>
            <Text style={styles.formInputText}>{props.modalData?.email ?? "johndoe@xyz.com"}</Text>
          </View>
          <View label={"Phone"} style={styles.formViewContainer}>
            <Text style={styles.formInput}>Phone:</Text>
            <Text style={styles.formInputText}>{props.modalData?.phone ?? "45656546456"}</Text>
          </View>
          <View
            style={styles.formViewContainer}
          >
            <Text style={styles.formInput}>Gender:</Text>
            <Text style={styles.formInputText}>{props.modalData?.gender ?? "M"}</Text>
          </View>
          <View style={styles.formViewContainer}>
            <Text style={styles.formInput}>City:</Text>
            <Text style={styles.formInputText}>{props.modalData?.city ?? "XYZ"}</Text>
          </View>
          <View style={styles.formViewContainer}>
            <Text style={styles.formInput}>State:</Text>
            <Text style={styles.formInputText}>{props.modalData?.state ?? "ABC"}</Text>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 9,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  modalHeaderContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  formBodyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 22,
  },
  formInput: {
    fontSize:22,
    fontWeight:"800"
  },
  formViewContainer:{
    display:"flex",
    flexDirection:"row",
    width:"100%",
    gap:12,
    alignItems:"center"
  },
  formInputText:{
    fontSize:19,
  fontWeight:"500"  }
});

export default UserModal;
