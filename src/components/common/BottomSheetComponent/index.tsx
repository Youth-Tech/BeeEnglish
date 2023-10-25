import React, {useCallback, useEffect, useRef, useState} from 'react'
import { BackHandler } from 'react-native'
import BottomSheet, {BottomSheetBackdrop, BottomSheetProps} from '@gorhom/bottom-sheet'
import {
  BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

interface CustomBottomSheetProps extends BottomSheetProps {
  visible: boolean
  onClose: () => any
  height?: number
}

let backHandler: any

const BottomSheetApp = (props: CustomBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentVisible, setCurrentVisible] = useState(false)
  useEffect(() => {
    if (!currentVisible && bottomSheetRef) {
      return bottomSheetRef.current?.close()
    }
  }, [currentVisible, bottomSheetRef])

  useEffect(() => {
    setCurrentVisible(props.visible)
  }, [props.visible])

  // @ts-ignore
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => {
      return <BottomSheetBackdrop {...props} />
    },
    [],
  )

  useEffect(() => {
    if (props.visible) {
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        props.onClose && props.onClose()
        return true
      })
    }
    if (!props.visible) {
      backHandler?.remove()
    }
  }, [props.visible])

  return (
    <>
      {props.visible ? (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={props.snapPoints}
          enablePanDownToClose={true}
          handleStyle={{ display: 'none' }}
          enableHandlePanningGesture={true}
          // backgroundStyle={{borderRadius: 0}}
          // handleStyle={{display: 'none', borderRadius: 0}}
          // backdropComponent={renderBackdrop}
          {...props}
          children={props.children}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default React.memo(BottomSheetApp)
