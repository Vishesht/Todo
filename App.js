import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import axios from 'axios'

export default function App() {
  const [model, setModel] = useState(false)
  const [model1, setModel1] = useState(false)
  const [Title, setTitle] = useState()
  const [Desc, setDesc] = useState()
  const [dataa, setDataa] = useState([])
  const [UserData, setUserData] = useState()
  // console.log(dataa)
  useEffect(() => {
    getSubList(1)
  }, [])
  const getSubList = async (pageNo) => {
    await axios.get(`https://reqres.in/api/users?page=${pageNo}`)
      .then((response) => {
        console.log("Getting the data sub --------", response.data.data);
        setUserData(response.data.data)
      })
      .catch((error) => {
        console.log("Getting the error in get api", error);
      });
  }
  const ItemView = ({ item }) => {
    return (
      <View style={{ backgroundColor: 'lightgrey', margin: 10 }}>
        <View style={{ flexDirection: 'row', margin: 5 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Title</Text>
          <Text style={{ fontSize: 12, fontWeight: '300', marginLeft: 10 }}>{item.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', margin: 5 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Description</Text>
          <Text style={{ fontSize: 12, fontWeight: '300', marginLeft: 10 }}>{item.desc}</Text>
        </View>
      </View>
    )
  }
  const ItemView1 = ({ item }) => {
    console.log(item)
    return (
      <View style={{ backgroundColor: 'lightgrey', margin: 10 }}>
        <View style={{ flexDirection: 'row', margin: 5 }}>
          <Image style={{ height: 100, width: 100 }} source={{ uri: item.avatar }} />
          <View style={{ margin: 4 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 5, marginBottom: 5 }}>{item.first_name + " " + item.last_name}</Text>
            <Text style={{ marginLeft: 5 }}>{item.email}</Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'lightblue', }}>
        <Text style={{ height: 50, fontSize: 20, fontWeight: 'bold' }}>Todo List</Text>
        <TouchableOpacity onPress={() => { setModel1(!model1) }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Second Part</Text>
          <Text>Click here</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataa}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={{ position: 'absolute', bottom: 14, right: 14 }} onPress={() => setModel(!model)}>
        <View style={{ backgroundColor: 'blue', width: 60, height: 60, borderRadius: 100, justifyContent: 'center', }}>
          <Text style={{ fontSize: 40, color: 'white', textAlign: 'center' }}>+</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={model}
        onRequestClose={() => {
          setModel(!model);
        }}
      >
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Text style={{ backgroundColor: 'lightblue', height: 50, fontSize: 20, fontWeight: 'bold', }}>Add Todo</Text>
          <TextInput onChangeText={txt => setTitle(txt)} placeholder={'Enter Title'} />
          <TextInput onChangeText={txt => setDesc(txt)} placeholder={'Enter Description'} />
          <TouchableOpacity onPress={() => {
            dataa.push({ 'title': Title, 'desc': Desc });
            setDataa([...dataa])
            alert('Todo added')
          }}>
            <View style={{ backgroundColor: 'lightgrey', height: 50, justifyContent: 'center' }}><Text style={{ textAlign: 'center' }}>Save</Text></View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={model1}
        onRequestClose={() => {
          setModel1(!model1);
        }}
      >
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Text style={{ backgroundColor: 'lightblue', height: 50, fontSize: 20, fontWeight: 'bold', }}>User List</Text>
          <FlatList
            data={UserData}
            renderItem={ItemView1}
            // onEndReachedThreshold={0.9}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ position: 'absolute', bottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
            <TouchableOpacity onPress={()=>getSubList(1)}>
              <View style={{ margin: 4, height: 18, width: 38, backgroundColor: 'skyblue', justifyContent: 'center', marginRight: 8 }}><Text>Back Page</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>getSubList(2)}>
              <View style={{ margin: 4, height: 18, width: 38, backgroundColor: 'skyblue', marginLeft: 8 }}><Text>Next Page</Text></View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
