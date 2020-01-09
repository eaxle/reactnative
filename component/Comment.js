import React, { Component } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { Card, Icon, Avatar  } from 'react-native-elements';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        console.log('props', this.props.id)
        this.state = { text: '' };
        this.state = { data: new Array() };
        this.setComment = this.setComment.bind(this);
    }
    setComment() {
        console.log(this.state.text !== null || this.state.text != undefined || this.state.text !== "")
        if (this.state.text != undefined )
            fetch('http://192.168.1.5:3000/comment', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: this.state.text,
                    post_id:this.props.id
                }),
            }).then((res) => { this.setState({ text: undefined });this.componentDidMount(); }).catch((error) => { console.log(error); Alert.alert(error); throw error; });
    }
    componentDidMount() {
        fetch('http://192.168.1.5:3000/comment/'+this.props.id).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ data: responseJson })

            })
            .catch((error) => {
                console.error(error);
            });

    }
    render() {
        let ele = this.state.data.map((data, key) => {
            return (<Text key={key}>{data.comment}</Text>)
        })

        return (
            <View>
                <Avatar
                    size="small"
                    rounded
                    title="C"
                    activeOpacity={0.7}
                />
                {ele}
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Type here to comment!"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    style={{ backgroundColor: '#ffffff' }}
                />

                <Icon onPress={this.setComment} style={{ alignSelf: 'right' }}
                    name='ios-paper-plane' type='ionicon' />
            </View>
        )
    }
}