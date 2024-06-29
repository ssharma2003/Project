import React, { useState } from "react";
import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, View,} from 'react-native'
import Snackbar from "react-native-snackbar"; 
import Icons from "./components/icons";

function App():JSX.Element{
    const[iscross,setiscross]=useState<boolean>(false)
    const[winner,setwinner]=useState<string>('')
    const[gamestate,setgamestate]=useState(new Array(9).fill('empty',0,9))

    const reload=()=>{
        setiscross(false)
        setwinner('')
        setgamestate(new Array(9).fill('empty',0,9))

    }

    const checkwinner=()=>{
        if(
            gamestate[0]!='empty'&&
            gamestate[0]===gamestate[1]
        ){
            setwinner(`${gamestate[0]} won the game! 🥳`);
        }
        else if(
            gamestate[3]!='empty'
            
        ){
            setwinner(`${gamestate[0]} won the game! 🥳`);
        }
        else if(
            gamestate[6]!='empty'&&
            gamestate[6]===gamestate[7]
        ){
            setwinner(`${gamestate[0]} won the game! 🥳`);
        }
        else if (
            gamestate[0] !== 'empty' &&
            gamestate[0] === gamestate[3] 
          ) {
            setwinner(`${gamestate[0]} won the game! 🥳`);
          } else if (
            gamestate[1] !== 'empty' 
          ) {
            setwinner(`${gamestate[1]} won the game! 🥳`);
          } else if (
            gamestate[2] !== 'empty' &&
            gamestate[2] === gamestate[5] &&
            gamestate[5] === gamestate[8]
          ) {
            setwinner(`${gamestate[2]} won the game! 🥳`);
          } else if (
            gamestate[0] !== 'empty' &&
            gamestate[0] === gamestate[4] &&
            gamestate[4] === gamestate[8]
          ) {
            setwinner(`${gamestate[0]} won the game! 🥳`);
          } else if (
            gamestate[2] !== 'empty' &&
            gamestate[2] === gamestate[4] &&
            gamestate[4] === gamestate[6]
          ) {
            setwinner(`${gamestate[2]} won the game! 🥳`);
          } else if (!gamestate.includes('empty', 0)) {
            setwinner('Draw game... ⌛️');
          }
    }

    const onchangeitem=(itemNum:number)=>{
      if(winner){
        return Snackbar.show({
          text:winner,
          backgroundColor:'black',
          textColor:'white'
        })
      }
      if(gamestate[itemNum]==='empty'){
        gamestate[itemNum]=iscross?'cross':'circle'
        setiscross(!iscross)
      }
      else{
        return Snackbar.show({
          text:"position is already filled",
          backgroundColor:'red',
          textColor:'white'
        })
      }
      checkwinner()
    }
    return(
        <SafeAreaView>
         { winner? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{winner}</Text>
          </View>
         ):(
          <View style={
            [styles.playerInfo,
              iscross? styles.playerX: styles.playerO
          ]}>
            <Text style={styles.gameTurnTxt}>
              Player {iscross? 'X':'O'}'s turn 
            </Text>
          </View>
         )}

         <FlatList
          numColumns={3}
          data={gamestate}
          renderItem={({item,index})=>(
            <Pressable
            key={index}
            style={styles.card}
            onPress={()=>onchangeitem(index)}
            >
               <Icons name={item} />
            </Pressable>
          )}
          style={styles.grid}
         />

            <Pressable 
            style={styles.gameBtn}
            onPress={reload}
            >
              <Text>
                {winner? 'new game':'reload game'}
              </Text>
            </Pressable>
        </SafeAreaView>
    )
    }

const styles = StyleSheet.create({
    playerInfo: {
      height: 56,
  
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  
  
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: '#333',
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
    },
    gameTurnTxt: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    playerX: {
      backgroundColor: '#38CC77',
    },
    playerO: {
      backgroundColor: '#F7CD2E',
    },
    grid: {
      margin: 12,
    },
    card: {
      height: 100,
      width: '33.33%',
  
      alignItems: 'center',
      justifyContent: 'center',
  
      borderWidth: 1,
      borderColor: '#333',
    },
    winnerInfo: {
      borderRadius: 8,
      backgroundColor: '#38CC77',
  
      shadowOpacity: 0.1,
    },
    winnerTxt: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    gameBtn: {
      alignItems: 'center',
  
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 36,
      backgroundColor: '#8D3DAF',
    },
    gameBtnText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: '500',
    },
  });
export default App()