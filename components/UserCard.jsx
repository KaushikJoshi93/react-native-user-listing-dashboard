import { Avatar, Button, Card, IconButton, Surface, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const UserCard = (props) => (
  <Surface elevation={10} style={{marginTop:22,borderRadius:42}}>
    <Card>
      <Card.Title
        title= {props.data.name || "John Doe"}
        subtitle={ props.data.email || "john@gmail.com"}
        left={LeftContent}
        right={(props)=><Avatar.Icon {...props} icon={"delete"} style={{backgroundColor:"red",marginRight:12}} size={35}/>}
      />
      <Card.Cover source={{ uri: props.data.image || "https://picsum.photos/700" }} />
      <Card.Actions style={{display:"flex",flexDirection:"row",justifyContent:"center" , gap:24}}>
        <IconButton icon={"pencil"} style={{backgroundColor:"lightgreen"}} size={24} onPress={()=>props.navigation.navigate("AddUser",({...props.data , index:props.index}))}/>
        <IconButton icon={"eye"} style={{backgroundColor:"lightblue"}} size={24} onPress={()=>{props.showModal(true); props.setModalData(props.data)}}/>
      </Card.Actions>
    </Card>
  </Surface>
);

export default UserCard;
