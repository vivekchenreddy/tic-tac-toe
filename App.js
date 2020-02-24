import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Alert, Button,} from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons'
import { render } from 'react-dom';
import DialogInput from 'react-native-dialog-input';
export default class App extends React.Component {
constructor(props){
  super(props);
  this.state={
    gameState:[
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ],
    currentPlayer:1,
    player1name:"",
    player2name:"",
    isDialogVisible: true,
    isDialog2Visible: false,

  }

}
componentDidMount(){
  this.initializeGame();
}
initializeGame=()=>{
  this.setState({gameState:
    [
      [0,0,0],
      [0,0,0],
      [0,0,0]
  ],
  currentPlayer:1,

});
}
onNewGamePress =()=>{
  this.initializeGame();

}
getWinner=()=>{
  var sum;
  var arr=this.state.gameState;

  for (var i=0;i<3;i++){
    sum=arr[i][0]+arr[i][1]+arr[i][2]
    if(sum==3){return 1;}
    else if (sum== -3) { return -1;}
  }
  for (var i=0;i<3;i++){
    sum=arr[0][i]+arr[1][i]+arr[2][i]
    if(sum==3){return 1;}
    else if (sum== -3) { return -1;}
  }
  for (var i=0;i<3;i++){
    sum=arr[2][0]+arr[1][1]+arr[2][0]
    if(sum==3){return 1;}
    else if (sum== -3) { return -1;}
  }
  for (var i=0;i<3;i++){
    sum=arr[0][0]+arr[1][1]+arr[2][2]
    if(sum==3){return 1;}
    else if (sum== -3) { return -1;}
  }
  return 0;
  
}
showDialog = () => {
  this.setState({ isDialogVisible: true });
};
handleCancel = () => {
  this.setState({ isDialogVisible: false });
};

onTilePress=(row,col)=>{
  //Dont allow tiles to change
  var value=this.state.gameState[row][col];
  if(value!=0)
  {
    return;
  }
  var currentPlayer=this.state.currentPlayer; 
  //set the correct tile....
  var array=this.state.gameState.slice();
  array[row][col]=currentPlayer;
  this.setState({gameState:array})
  //switch to other player
  var nextPlayer=(currentPlayer==1)?-1:1;
  this.setState({currentPlayer:nextPlayer})
  var winner =this.getWinner();

  if(winner==1){
    Alert.alert("player1"+  " is the winner");
    this.initializeGame();

  }else if (winner == -1){
    Alert.alert("player2"+" is the winner");
    this.initializeGame();
  }
}
renderIcon=(row,col)=>{
  var value=this.state.gameState[row][col];
  switch(value){
    case 1: return <Icon name="close" style={styles.tileX}/>;
    case -1:  return <Icon name="circle-outline" style={styles.tileO}/>;
    default : return <View />

  }
}

  render(){
  return (
    <View style={styles.container}>
     
      
      
    
        
      <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={()=>this.onTilePress(0,0)} style={[styles.tile,{borderLeftWidth:0,borderTopWidth:0}]}>
              {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onTilePress(0,1)} style={[styles.tile,{borderTopWidth:0}]}>
              {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onTilePress(0,2)} style={[styles.tile,{borderTopWidth:0,borderRightWidth:0}]}>
            {this.renderIcon(0,2)}
  
          </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity onPress={()=>this.onTilePress(1,0)}  style={[styles.tile,{borderLeftWidth:0}]}>
      {this.renderIcon(1,0)}

      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onTilePress(1,1)}style={[styles.tile,{}]}>
      {this.renderIcon(1,1)}

      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onTilePress(1,2)} style={[styles.tile,{borderRightWidth:0}]}>
      {this.renderIcon(1,2)}

      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity onPress={()=>this.onTilePress(2,0)}style={[styles.tile,{borderBottomWidth:0,borderLeftWidth:0}]}>
      {this.renderIcon(2,0)}

      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onTilePress(2,1)} style={[styles.tile,{borderBottomWidth:0}]}>
      {this.renderIcon(2,1)}

      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.onTilePress(2,2)} style={[styles.tile,{borderBottomWidth:0,borderRightWidth:0}]}>
      {this.renderIcon(2,2)}

      </TouchableOpacity>
      </View>
      <View style={{paddingTop:50}}/>
      <Button title="New Game" onPress={this.onNewGamePress}/>
      
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth:10,
    width:100,
    height:100,
  },
  tileX:{
    color:"red",
    fontSize:60,
    
  
  },
  tileO:{
    color:"black",
    fontSize:60,
    
  
  }
});
