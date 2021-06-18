import React, { useCallback, useReducer, useEffect, Suspense } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { getList } from './api/picsum'
import { actionCreators, initialState, reducer } from './reducers/photos'
import PhotoGrid from './components/PhotoGrid'
import { RootStackParamList } from './navigator/snack-config'
import Loading from './components/Loading'


type HomeProps = StackScreenProps<RootStackParamList, 'Home'>

export default function Home({ navigation, route }: HomeProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const { photos, nextPage, loading, error } = state
  
  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading())

    try {
      const nextPhotos = await getList(nextPage)
      dispatch(actionCreators.success({photos: nextPhotos, page: nextPage}))
    } catch (e) {
      dispatch(actionCreators.failure());
    }
  }, [])

  const handleGoToScreenDetailsImage = (id: string) => {
    navigation.push('DetaisImage', {imageId: id});
  }
  const fetchFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }
  useEffect(() => {
    fetchFonts()
    fetchPhotos()
  }, [])

  if (photos.length === 0) {
    if (loading) {
      return (
        <Loading />
      )
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      )
    }
  }

  return <PhotoGrid 
      numColumns={3} 
      photos={photos} 
      onEndREached={fetchPhotos} 
      onGoToScreenDetaisImage={handleGoToScreenDetailsImage}
    />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
