import { PixelRatio } from 'react-native'
import { BASE_URL } from '../constants/url_base'

export const getList = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/v2/list?page=${page}`)
  const photos = await response.json()
  return photos
}

interface FormatPhotoUriProps {
  id: string;
  width: number;
  height: number;
} 
export function formatPhotoUri({id, width, height}: FormatPhotoUriProps) {
  return `${BASE_URL}/id/${id}/${Math.floor(width)}/${Math.floor(
    height
  )}`
}

export const fetchImageDetails = async (imageId: string) => {
  const response = await fetch(`${BASE_URL}/id/${imageId}/info`);
  return await response.json();
}