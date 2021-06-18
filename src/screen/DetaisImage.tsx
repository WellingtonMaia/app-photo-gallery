import React, { Suspense } from 'react';
import { StackScreenProps } from "@react-navigation/stack"
import { Image } from 'react-native';
import { useEffect, useState } from 'react';
import {
  Content,
  Card,
  CardItem,
  Body,
  Text,
} from 'native-base';

import { RootStackParamList } from "../navigator/snack-config"
import Loading from '../components/Loading';
import { fetchImageDetails } from '../api/picsum';

type DetailsImageProps = StackScreenProps<RootStackParamList, 'DetaisImage'>

type ImageData = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
}

export default function DetailsImage({ navigation, route }: DetailsImageProps) {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<ImageData>({
    id: '',
    author: '',
    width: 0,
    height: 0,
    url: ''
  });

  useEffect(() => {
    
    if(!route.params.imageId){
      navigation.pop()
      return;
    }
    
    // setIsLoading(true)
    fetchImageDetails(route.params.imageId).then(data => setImage({
      id: data.id,
      author: data.author,
      url: data.download_url,
      width: data.width,
      height: data.height,
    }))
    // .finally(() => setIsLoading(false));
    
  }, []);
  
  return (
    <Suspense fallback={<Loading />}>
      <Content>
        <Card>
          <CardItem cardBody>
            {
              image.url !== '' 
              ? <Image source={{uri: image.url, height: 400}} style={{flex: 1}}/>
              : <Loading />
            }
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Author: {image.author}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Suspense>
  )

  // return isLoading ? (
  //   <Loading />
  // ) : (
  //   <Content>
  //     <Card>
  //       <CardItem cardBody>
  //         {
  //           image.url !== '' 
  //           ? <Image source={{uri: image.url, height: 400}} style={{flex: 1}}/>
  //           : <Loading />
  //         }
  //       </CardItem>
  //       <CardItem>
  //         <Body>
  //           <Text>
  //             Author: {image.author}
  //           </Text>
  //         </Body>
  //       </CardItem>
  //     </Card>
  //   </Content>
  // );
}