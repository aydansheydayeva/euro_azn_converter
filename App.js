import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      euro_error: false,
      azn_error: false,
      sum_euro: '0',
      sum_azn: '0'
    }
  }

  onEnterText = (input, inputType) => {
    var regexTest = /^[0-9\.]*$/

    if (inputType == 'euro'){
      if (regexTest.test(input)){
        this.setState({sum_euro: input, sum_azn: 0, euro_error: false});
      }
      else{
        this.setState({sum_euro: 0, sum_azn: 0, euro_error: true});
      }
    }
    else if (inputType == 'azn'){
      if (regexTest.test(input)){
        this.setState({sum_azn: input, sum_euro: 0, azn_error: false});
      }
      else{
        this.setState({sum_euro: 0, sum_azn: 0, azn_error: true});
      }
    }
  }

  buttonClickListener = () => {
    console.log(this.state)
    var s_euro = Number(this.state.sum_euro)
    var s_azn = Number(this.state.sum_azn)
    console.log(s_euro, s_azn)
    
    if(s_euro == 0 && s_azn > 0){
      s_euro = s_azn*0.49
      this.setState({sum_euro: s_euro, euro_error: false, azn_error: false});
    }
    else if(s_euro > 0 && s_azn == 0){
      s_azn = s_euro / 0.49
      this.setState({sum_azn: s_azn, azn_error: false, euro_error: false});
    }
  }

  render(){
    return(
      <View style = {styles.container}>

        {
          this.state.euro_error == true ? (
            <Text style = {styles.errorMessage}>
              * Euro input error!
            </Text>
          ) : null
        }
        <Text>Euro</Text>

        <TextInput 
          placeholder = "sum..."
          value={this.state.sum_euro}
          onChangeText = { (input) => this.onEnterText(input, 'euro') }
        />


        {
          this.state.azn_error == true ? (
            <Text style = {styles.errorMessage}>
              * AZN input error!
            </Text>
          ) : null
        }
        <Text>AZN</Text>

        <TextInput 
          placeholder = "sum..."
          value={this.state.sum_azn}
          onChangeText = { (input) => this.onEnterText(input, 'azn') }    
        />


        <Button 
          onPress = {this.buttonClickListener}
          title = "SWITCH"
          color = "#051094"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 15,
    color: "yellow",
    alignItems: "center"
  },
  errorMessage: {
    fontSize: 14,
    color:"red",
    textAlign: 'left',
    paddingBottom: 10
  },
  TextInputStyle: {
    textAlign: 'left',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'silver',
  }
});