'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Eye, EyeClosedIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export default function SelectImagesSettings({
  defaultValue,
  datasource,
}: {
  defaultValue: string
  datasource: string[]
}) {
  const storageKey = 'subscriber.settings.showimage'
  const [loadedImage, setLoadedImage] = useState<string>()
  const [showImage, setShowImage] = useState<boolean>(true)
  const onImageChange = useCallback((image: string) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = image
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      ctx!.drawImage(img, 0, 0) // Draw original image

      // You can then get the data URL or Blob from the canvas
      const dataURL = canvas.toDataURL('image/jpeg', 0.8)
      setLoadedImage(dataURL)
    }
  }, [])
  useEffect(() => {
    onImageChange(defaultValue)
    const showing = localStorage.getItem(storageKey)
    if (showing) setShowImage(showing === 'true')
  }, [defaultValue, onImageChange])
  function updateShowImage() {
    setShowImage((state) => !state)
    localStorage.setItem(storageKey, String(!showImage))
  }
  return (
    <div className="flex flex-col justify-between items-center ">
      <div className="flex flex-row justify-between items-center w-full max-w-full gap-2">
        <Select
          defaultValue={defaultValue}
          name="image"
          onValueChange={onImageChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a posição na tela" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Posição</SelectLabel>
              {datasource.map((value, key) => (
                <SelectItem value={value} key={key}>
                  {value.substring(0, 40)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {!showImage && (
          <EyeClosedIcon
            className="border border-amber-500 h-10 w-10 rounded-lg"
            onClick={updateShowImage}
            size={24}
          />
        )}
        {showImage && (
          <Eye
            className="border border-amber-500 h-10 w-10 rounded-lg"
            onClick={updateShowImage}
            size={24}
          />
        )}
      </div>
      {loadedImage && showImage && <img src={loadedImage} />}
    </div>
  )
}
