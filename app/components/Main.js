import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView
}from 'react-native';

import Note from './Note';

export default class Main extends React.Component{

    constructor(props){
        super(props);
        this.state={
            noteArray:[],
            noteText:'',
        }
    }

    render(){

        let notes = this.state.noteArray.map((val,key)=>{
            return <Note key={key} keyVal={key} val={val} 
                deleteMethod={()=>this.deleteNote(key)}
            />
        })
        return(

            <View   style={styles.container}>
                
                <View style={styles.header}>
                    <Text style={styles.headerText}>Todo List</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>


                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                
                <KeyboardAvoidingView behavior="padding" style={styles.footer}>
                    <TextInput onChangeText={(noteText)=>this.setState({noteText})}
                        value={this.state.noteText}
                    style={styles.textInput}
                     placeholder=">todo" placeholderTextColor='white'
                      underlineColorAndroid="transparent">
                      </TextInput>
                </KeyboardAvoidingView>
            </View>

        )
    }

    addNote(){
        if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({
                'date':d.getFullYear()+'/'+(d.getMonth()+1)+"/"+d.getDate(),
                'note':this.state.noteText
            });
            this.setState({
                noteArray:this.state.noteArray
            });
            this.setState({noteText:''})
        }
    }
    deleteNote(key){
        this.state.noteArray.splice(key,1);
        this.setState({
            noteArray:this.state.noteArray
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        backgroundColor:'#E91E63',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:10,
        borderBottomColor:'#ddd'
    },
    headerText:{
        color:'white',
        fontSize:18,
        padding:26
    },
    scrollContainer:{
        flex:1
    },
    textInput:{
        alignSelf:'stretch',
        color:'#fff',
        padding:10,
        fontSize:18,
        backgroundColor:'#252525',
        borderTopWidth:2,
        borderTopColor:'#ededed'
    },
    addButton:{
        position:'relative',
        zIndex:19,
        left:270,
       
        backgroundColor:'#E91E63',
        width:70,
        height:70,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        elevation:8,
    },
    addButtonText:{
        color:'#fff',
        fontSize:24,
    }
})