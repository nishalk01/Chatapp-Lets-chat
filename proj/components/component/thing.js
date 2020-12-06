import {Text} from 'react-native';
import React from 'react';
import { Card } from 'galio-framework';

const Thing=()=>{
    return(
      <Text>
         <Card
  flex
  borderless
  title="Christopher Moon"
  caption="139 minutes ago"
  location="Los Angeles, CA"
  avatar="http://i.pravatar.cc/100?id=skater"
/>
      </Text>
    )
}


export default Thing;