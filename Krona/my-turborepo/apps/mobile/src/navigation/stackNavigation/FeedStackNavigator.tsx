import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Publicaciones from "src/components/Feed/Publicacion";
//import FeedDetail from "../";

//_________ ESTE BLOQUE DEBE IRSE A TYPES__________

export type FeedStackParamList = {
    FeedList: undefined;
    FeedDetail: { id : string };
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

const FeedStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FeedList" component={Publicaciones} options={{ title: "Feed" }}/>
            {/* <Stack.Screen name="FeedDetail" component={FeedDetail} options={{ title: "Details" }}/> */}
        </Stack.Navigator>
    );
};

export default FeedStackNavigator;