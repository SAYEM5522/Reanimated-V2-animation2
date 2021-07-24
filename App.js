import React from 'react';
import { StyleSheet, Text, View,StatusBar,FlatList,Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Animated,{ Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
const  data=[
{
  id:"1",
  
  image:"https://image.flaticon.com/icons/png/512/27/27130.png",
  name:"Entertainment",
  price:"$900"
},
{
  id:"2",
  image:"https://cdn.pixabay.com/photo/2017/02/17/11/51/icon-2073971_960_720.png",
  name:"Food & Drinks",
  price:"$1000"
},
{
  id:"3",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpIIuYXyydfbL8jGle-R7O_Ze55Ig3pkxuQA&usqp=CAU",
  name:"Gyme",
  price:"$1000"
},

{
  id:"4",
  image:"https://t4.ftcdn.net/jpg/03/47/13/43/360_F_347134350_dhjJjzA1fuGvXOyNgCJYfOEby04ljhEC.jpg",
  name:" Comunicate",
  price:"$1200"
},
{
  id:"5",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEIU2Yf0bNjrWH69gIRFmi9dRU_Q56hgBrsg&usqp=CAU",
 
  name:"Shoping",
  price:"$1000"
},



{
  id:"6",
  image:"https://cdn2.iconfinder.com/data/icons/grocery-store-solid/64/Grocery_food-36-512.png",
  name:"Grocery",
  price:"$1000"
}
]
const App=()=> {
  const AnimatedFlatlist=Animated.createAnimatedComponent(FlatList)
  function clamp(value, lowerBound, upperBound) {
    'worklet';
    return Math.max(lowerBound, Math.min(value, upperBound));
  }

  const y = useSharedValue(-185);
  const y1 = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = y.value;
    },
    onActive: (event, ctx) => {
      y.value = ctx.startX + event.translationY;
      
    },
    onEnd: (_) => {
      if(y.value>-185){
        y.value = withSpring(0,{overshootClamping:false,mass:0.1});
      }
       if(y.value<0&&y.value>-60){
        y.value = withSpring(-185,{overshootClamping:false,mass:0.1});
      }
    },
  });
  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = y1.value;
    },
    onActive: (event, ctx) => {
      y1.value = ctx.startX + event.translationY;

    },
    onEnd: (_) => {
      
        if(y1.value<-30){
          y1.value = withSpring(-650,{overshootClamping:false,mass:0.1});
        }
        if(y1.value>-600&&y1.value<-500){
          y1.value = withSpring(0,{overshootClamping:false,mass:0.1});
        }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:withSpring(clamp(y.value,-185,0))
        },
      ],
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:clamp(y1.value,-650,0)
        },
      ],
    };
  });
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
   
  });
  const stylez = useAnimatedStyle(() => {
    return {
      top:withSpring(interpolate(translationY.value,[0,150],[0,-60],Extrapolate.CLAMP),{mass:1}),
     transform:[{
       scaleY:withSpring(interpolate(translationY.value,[0,150],[1,0.6],Extrapolate.CLAMP),{mass:1})
     }]
    };
  });
  const FlatListT = useAnimatedStyle(() => {
    return {
     transform:[{
       translateY:withSpring(interpolate(translationY.value,[0,150],[0,-110],Extrapolate.CLAMP),{mass:1})
     }]
    };
  });
  const TextStyle=useAnimatedStyle(() => {
    return {
    marginBottom:(interpolate(translationY.value,[0,150],[0,23],Extrapolate.CLAMP))
    };
  });
  const InfoHeader=useAnimatedStyle(() => {
    return {
      opacity:interpolate(y.value,[-185,0],[0,1],Extrapolate.CLAMP),
      transform:[{
        translateY:withSpring(interpolate(y.value,[-185,0],[-100,0],Extrapolate.CLAMP))
      }]
    };
  });

  // const DescriptionLeft= useAnimatedStyle(() => {
  //   return {
  //     opacity:interpolate(y.value,[-185,0],[0,1],Extrapolate.CLAMP),
  //       top:withSpring(interpolate(y.value,[-185,0],[-200,20],Extrapolate.CLAMP))
  //   };
  // });
  const DescriptionLeft1= useAnimatedStyle(() => {
    return {
      opacity:interpolate(y.value,[-185,0],[0,1],Extrapolate.CLAMP),
      transform:[{
        translateX:withSpring(interpolate(y.value,[-185,0],[230,400],Extrapolate.CLAMP))
      }]
    };
  });
  const DescriptionLeft2= useAnimatedStyle(() => {
    return {
      opacity:interpolate(y.value,[-185,0],[0,1],Extrapolate.CLAMP),
      transform:[{
        translateX:withSpring(interpolate(y.value,[-185,0],[500,400],Extrapolate.CLAMP))
      }]
    };
  });
  const color = useAnimatedStyle(() => {
    return {
      opacity:(interpolate(y.value,[-185,0],[1,0])),//[0,100]
    };
  });
  const HeaderStyle= useAnimatedStyle(() => {
    return {
     transform:[{
       translateY:withSpring(interpolate(y.value,[-185,0],[0,-85],Extrapolate.CLAMP)),
     }]
    };
  });
  const renderItem=({item,index})=>{
    return(
      <View style={[styles.BottomContainer]}>
        <Image
        source={{uri:item.image}}
        style={styles.IMG}
        />
        <View>
          <Text style={{fontSize:16,fontWeight:'bold',}}>{item.name}</Text>
          <Text >Transparent</Text>
        </View>
        <Text style={{fontSize:16,fontWeight:'bold',}}>{item.price}</Text>
      </View>
    )
  }
  return (
    <View style={[styles.container]}>
      <StatusBar/>
      <Animated.View style={[styles.Header2,InfoHeader]}>
        <Text style={styles.TextLeft}>Done</Text>
        <Text style={styles.TextMiddle}>Bank Card</Text>
        <Text style={styles.TextRight}>+</Text>
      </Animated.View>
      <Animated.View style={[styles.TopHeader,HeaderStyle]}>
      <AntDesign name="appstore1" style={{left:10}} size={26} color="black" />
        <Text style={{fontSize:18,fontWeight:'bold'}}> My Account</Text>
        <Image 
        source={{uri:"data:image/jpeg;base64,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"}}
        style={{width:60,height:55,resizeMode:'cover',borderRadius:15}}
        />
      </Animated.View>
      <View>
        <Animated.View style={[{height:180,left:-400,paddingHorizontal:45}]}>
          <Animated.View style={[styles.DescriptionOne,DescriptionLeft1]}>
            <View>
            <Text style={styles.DescriptionText}>12345 USD</Text>
            <Text style={{marginLeft:20}}>Balance</Text>
            </View>
            <View>
            <Text  style={styles.DescriptionText}>10/22</Text>
            <Text style={{marginLeft:10}}>Expire</Text>
            </View>
           
          </Animated.View>
          <Animated.View  style={[styles.DescriptionTwo,DescriptionLeft2]}>
            <View>
            <Text  style={styles.DescriptionText}>Khonok Lee</Text>
            <Text style={{marginLeft:16}}>Card Holder</Text>
            </View>
            <View>
            <Text  style={styles.DescriptionText}>345</Text>
            <Text style={{marginLeft:5}}>CVC</Text>
            </View>
          </Animated.View>
        </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
       <Animated.View style={[animatedStyle]}>
      
       <Animated.Image
       source={{uri:"http://pngimg.com/uploads/credit_card/credit_card_PNG207.png"}}
       style={[styles.Image,stylez]}
       />
       </Animated.View>
      </PanGestureHandler>
      </View>
      <Animated.View style={[styles.Bottom,color,FlatListT]}>
        <Animated.View style={TextStyle}>
        <Text style={[styles.Context]}>Transactions</Text>
        </Animated.View>
        <AnimatedFlatlist
        data={data}
        keyExtractor={(item)=>item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        />
      </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler2}>
      <Animated.View style={[styles.BottomSheet,animatedStyle2]}>
      <View style ={styles.line}/>
      <View style={styles.BottomHeader}>
        <Text style={styles.BottomHText}>Statistics</Text>
        <View style={styles.Dot}/>
      </View>
      </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
   
  },
  Box:{
    width:"100%",
    height:300,
    backgroundColor:'red',
    borderRadius:20,
    zIndex:1

  },
  Item:{
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-between',
   padding:20
  },
  IMG:{
    width:100,
    height:50,
    resizeMode:'contain',
    left:-25
  },
  BottomContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    paddingVertical:10,
  
    
  },
  Bottom:{
   height:345,
   top:-180
  },
  Image:{
    width:"100%",
    height:280,
    resizeMode:'cover',
    alignSelf:'center',
  },
  Context:{
    marginLeft:15,
    fontSize:18,
    fontWeight:'bold',
  },
  BottomSheet:{
    height:"100%",
    width:'100%',
    backgroundColor:'rgba(0,0,0,0.9)',
    top:-245,
    borderTopLeftRadius:35,
    borderTopRightRadius:35
  },
  line:{
    width:100,
    height:6,
    borderRadius:10,
    backgroundColor:"lightgray",
    justifyContent:"center",
    alignSelf:'center',
    top:5
  },
  Dot:{
    width:10,
    height:10,
    backgroundColor:'white',
    borderRadius:5
  },
  BottomHeader:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:18
  },
  BottomHText:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  },
  Header2:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    top:10
  },
  TextLeft:{
    fontSize:17,
    fontWeight:'bold',
  },
  TextMiddle:{
    fontSize:22,
    fontWeight:'bold',
  },
  TextRight:{
    fontSize:27,
    fontWeight:'bold',
  },
  DescriptionOne:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    top:-25
  },
  DescriptionTwo:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    top:20
  },
  DescriptionText:{
    fontSize:20,
    fontWeight:'bold'
  },
  TopHeader:{
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'space-between',
    top:-15,
    paddingHorizontal:20
  }
});
// export const clamp = (x: number, min: number, max: number): number => {
//   "worklet";
//   if (x < min) return min;
//   if (x > max) return max;
//   return x;
// };