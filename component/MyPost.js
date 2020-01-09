import React, { Component } from 'react';
import { ScrollView, Text, TextInput, Alert, View, Image } from 'react-native';
import { Card, Divider, Button, Icon, Avatar } from 'react-native-elements';
import Comment from './Comment';

export default class MyPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.state = { data: new Array() };
        this.setPost = this.setPost.bind(this);
    }
    setPost() {
        if (this.state.text != undefined )
        fetch('http://192.168.1.5:3000/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: this.state.text
            }),
        }).then((res) => { this.componentDidMount(); this.setState({ text: undefined }) }).catch((error) => { console.log(error); Alert.alert(error); throw error; });
    }
    componentDidMount() {
        fetch('http://192.168.1.5:3000/').then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson })
            })
            .catch((error) => {
                console.error(error);
            });
       

    }
    render() {
        let ele = this.state.data.map((data, key) => {
            return (<Card title={data.post} key={key}>
                <Text>Date:{data.date}</Text>
                <View  >
                    <Avatar
                        size="small"
                        rounded
                        icon={{ name: 'user', type: 'font-awesome' }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                    <Comment id={data.id} ></Comment>
                </View>


            </Card>)
        })
        return (
            <ScrollView>
                {ele}
                <Card>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Post here!"
                    onChangeText={(text) => this.setState({ text })}
                    style={{
                        backgroundColor: 'skyblue', height: 200,  
                        
                        height: 70 }}
                    />
                    <Button onPress={this.setPost} title="post" style={{ width:150, top:15 }} />

                </Card>
                
            </ScrollView>
            
        )
    }
}