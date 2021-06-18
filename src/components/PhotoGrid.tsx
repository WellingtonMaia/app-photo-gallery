import React, { Suspense } from 'react'
import { 
  Dimensions, 
  FlatList, 
  Image as ComponentImage, 
  TouchableHighlight,
  PixelRatio
 } from 'react-native'

import { formatPhotoUri } from '../api/picsum';
import Loading from './Loading';

type Image = {
  id: string;
  width: number;
  height: number;
}

interface PhotoGridProps {
  photos: Image[];
  numColumns: number;
  onEndREached: () => void;
  onGoToScreenDetaisImage: (id: string) => void
}

export default function PhotoGrid({ 
  photos, numColumns, onEndREached, onGoToScreenDetaisImage
}: PhotoGridProps) {
  const { width } = Dimensions.get('window');

  const size = width / numColumns;

  return (
    <Suspense fallback={ <Loading /> }>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => String(index)}
        numColumns={numColumns}
        onEndReached={onEndREached}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => onGoToScreenDetaisImage(item.id)}
          >
            <ComponentImage
              key={index}
              source={{
                width: PixelRatio.getPixelSizeForLayoutSize(50),
                height: PixelRatio.getPixelSizeForLayoutSize(50),
                uri: formatPhotoUri({height: size, width: size, id: item.id})
              }}
            />
          </TouchableHighlight>
        )}
      />
    </Suspense>
  )
}